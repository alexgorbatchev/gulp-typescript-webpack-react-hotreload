import * as path from 'path';

import {
  BUILD_DIR,
  BUILD_PUBLIC_DIR,
  BUILD_SRC_DIR,
  ENV,
  PRODUCTION,
  STAGING,
  DEVELOPMENT,
  TEST,
  ROOT_DIR,
  SRC_DIR,
  CDN_PATH,
} from './config';

const gulp = require('gulp');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const webpack = require('webpack');
const yargs = require('yargs').argv;
const { Promise } = require('es6-promise');
const { log, colors } = require('gulp-util');
const $ = {
  bg: require('gulp-bg'),
  sequence: require('run-sequence'),
  changedInPlace: require('gulp-changed-in-place'),
  print: require('gulp-print'),
  tsfmt: require('gulp-tsfmt'),
  typescript: require('gulp-typescript'),
  sourcemaps: require('gulp-sourcemaps'),
  changed: require('gulp-changed'),
  mocha: require('gulp-spawn-mocha'),
  exec: require('gulp-exec'),
  tslint: require('gulp-tslint'),
};

const TYPESCRIPT_FILES: Array<string> = ['src/**/*.{ts,tsx}'];
const STATIC_FILES: Array<string> = [`${SRC_DIR}/**/*`, '!**/*.{ts,tsx}'];
const BUILD_SRC_FILES: Array<string> = [`${BUILD_SRC_DIR}/**/*.js`];

const typescriptProject = $.typescript.createProject(require('./tsconfig.json').compilerOptions);

gulp.task('viz', require('gulp-task-graph-visualizer')(yargs.task));
gulp.task('build:clean', done => !DEVELOPMENT || yargs['force-clean'] ? rimraf(BUILD_PUBLIC_DIR, () => mkdirp(BUILD_PUBLIC_DIR, done)) : done());
gulp.task('build:vendor', ['build:typescript'], webpackTask('vendor', 'vendor.js'));
gulp.task('build:dev', ['build:vendor'], webpackTask('dev', 'dev.js'));
gulp.task('build:test', ['build:vendor'], webpackTask('test', 'test.js'));
gulp.task('build:index', PRODUCTION || STAGING ? ['build:app'] : ['build:static'], buildIndexHtmlFile); // In production and staging, index.html uses actual manifest
gulp.task('build:app', PRODUCTION ? ['build:vendor'] : ['build:vendor', 'build:dev'], webpackTask('app'));
gulp.task('build', ['build:app', 'build:index']);

gulp.task('dev:server', ['build:index', 'build:vendor', 'build:dev'], $.bg('node', 'webpack/dev-server.js'));

gulp.task('typescript:format', () =>
  gulp.src(TYPESCRIPT_FILES)
    .pipe($.changedInPlace({ firstPass: yargs.force }))
    .pipe($.tsfmt({ options: require('./tsfmt.json') }))
    .pipe($.print(filepath => `typescript:format ➡ ${filepath}`))
    .pipe(gulp.dest(SRC_DIR))
);

gulp.task('typescript:lint', () =>
  gulp.src(TYPESCRIPT_FILES.concat(['webpack/**/*.ts']))
    .pipe($.tslint())
    .pipe($.tslint.report('verbose', {
      summarizeFailureOutput: true,
      emitError: yargs._.indexOf('dev') === -1,
    }))
);

gulp.task('build:static', ['build:clean'], () =>
  gulp.src(STATIC_FILES)
    .pipe($.changed(BUILD_SRC_DIR))
    .pipe($.print(filepath => `build:static ➡ ${filepath}`))
    .pipe(gulp.dest(BUILD_SRC_DIR))
);

gulp.task('build:typescript', ['build:clean', 'build:static'], () =>
  gulp.src(TYPESCRIPT_FILES.concat(['typings/tsd.d.ts']))
    .pipe($.changed(BUILD_SRC_DIR, { extension: '.js' }))
    .pipe($.sourcemaps.init())
    .pipe($.typescript(typescriptProject))
    .js
    .pipe($.sourcemaps.write({ sourceRoot: SRC_DIR }))
    .pipe($.print(filepath => `build:typescript ➡ ${filepath}`))
    .pipe(gulp.dest(BUILD_SRC_DIR))
);

gulp.task('test:remap-istanbul', ['test:mocha'], () =>
  gulp.src('coverage/coverage.json', { buffer: false })
    .pipe($.exec(`./node_modules/.bin/remap-istanbul -i coverage/coverage.json -o coverage/html-report -t html`))
);

gulp.task('test:mocha', ['build:typescript'], () =>
  gulp.src([`${BUILD_SRC_DIR}/tests/*-helper.js`, `${BUILD_SRC_DIR}/**/*-spec.js`])
    .pipe($.mocha({
      recursive: true,
      reporter: 'min',
      ui: 'bdd',
      istanbul: true,
    }))
);

gulp.task('test', ['test:mocha', 'test:remap-istanbul']);

gulp.task('dev', ['typescript:format', 'build:typescript', 'dev:server'], () => {
  gulp.watch(TYPESCRIPT_FILES, ['build:typescript', 'typescript:format', 'typescript:lint']);
  gulp.watch(STATIC_FILES, ['build:static']);
  gulp.watch(BUILD_SRC_FILES, ['test']);
  gulp.watch(['webpack/**/*'], ['dev:server']);
});



function forceWebpackBuild(configName: string): boolean {
  return yargs[`clean-${configName}`] === true || yargs['clean-all'] === true;
}

function promised(callback: Function, shouldReject: boolean = true): Promise<any> {
  return new Promise((resolve, reject) =>
    callback((err, content) => err && shouldReject ? reject(err) : resolve(content))
  );
}

function buildIndexHtmlFile() {
  const fs = require('fs');
  const dust = require('dustjs-linkedin');
  const manifest = require(`./webpack/manifest-${ENV}`).default;

  const writeIndexHtmlUsingManifests = (manifest: Array<string>): Promise<any> =>
    Promise.all([
      promised(cb => fs.readFile(`${SRC_DIR}/index.dust`, 'utf8', cb)),
      promised(cb => mkdirp(BUILD_PUBLIC_DIR, cb)),
    ])
      .then(([content]) => dust.compile(content, 'index'))
      .then(dust.loadSource)
      .then(() => promised(cb => dust.render('index', { manifest }, cb)))
      .then(html => promised(cb => fs.writeFile(`${BUILD_PUBLIC_DIR}/index.html`, html, cb)));

  return manifest
    .then(writeIndexHtmlUsingManifests)
    .catch(e => console.error(e.stack));
}

function allFilesExist(files: Array<string>): Promise<any> {
  const fs = require('fs');

  return Promise.all(files.map(filepath => promised(cb => fs.stat(`${BUILD_PUBLIC_DIR}/${filepath}`, cb), false)))
    // make sure that all stats are truthy
    .then(stats => stats.reduce((all, current) => all && current, true));
}

function webpackTask(configName: string, ...expectedFiles: Array<string>): Function {
  // return a function for gulp.task()
  return function(done) {
    allFilesExist(expectedFiles)
      .then(allFilesExist => {
        if (expectedFiles.length > 0) {
          if (allFilesExist && !forceWebpackBuild(configName)) {
            log(`Using cached "${expectedFiles.join(', ')}" required for WebPack bundle "${configName}" (use "--clean-${configName}" to rebuild)`);
            return done();
          }
        }

        const { default: config } = require(`./webpack/config-${configName}`);
        const { default: stats } = require('./webpack/stats');

        webpack(config, printStats(configName, stats, done));
      })
      .catch(e => console.error(e.stack));
  }
}

const statsCache = {};

function printStats(configName: string, statsOpts: Object, done: Function): Function {
  return function(err, stats) {
    if (err) {
      log(colors.red(err.message));
      return process.exit(-1);
    }

    const reset = colors.enabled ? '\u001b[0m' : '';

    function logWithWarnings(line) {
      const hasWarning = line.indexOf('WARNING') === 0;
      const dashes = '---------------------------------------------------------------------';
      if (hasWarning) { log(dashes); }
      log(line + reset);
      if (hasWarning) { log(dashes); }
    }

    if (yargs['verbose']) {
      stats
        .toString()
        .split(/\n/g)
        .forEach(logWithWarnings);
    }

    done();
  }
}