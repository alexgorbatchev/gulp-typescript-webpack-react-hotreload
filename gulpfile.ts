import * as path from 'path';

import {
  BUILD_DIR,
  BUILD_PUBLIC_DIR,
  BUILD_SRC_DIR,
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
gulp.task('build:clean', done => rimraf(BUILD_PUBLIC_DIR, () => mkdirp(BUILD_DIR, done)));
gulp.task('build:vendor', ['build:typescript'], webpackTask('vendor', 'vendor.js'));
gulp.task('build:app', ['build:vendor', 'build:dev'], webpackTask('app'));
gulp.task('build:dev', ['build:vendor'], webpackTask('dev', 'dev.js'));
gulp.task('build:test', ['build:vendor', 'build:dev'], webpackTask('test', 'test.js'));
gulp.task('build:index', ['build:static', 'build:app'], buildIndexHtmlFile);
gulp.task('build', ['build:app', 'build:index']);
gulp.task('karma', ['build:test'], $.bg('karma', 'start', '--single-run=false'));
gulp.task('dev:server', ['build:vendor', 'build:dev', 'build:index', 'build:static'], $.bg('node', 'webpack/dev-server.js'));

gulp.task('typescript:format', () =>
  gulp.src(TYPESCRIPT_FILES)
    .pipe($.changedInPlace({ firstPass: yargs.force }))
    .pipe($.tsfmt({ options: require('./tsfmt.json') }))
    .pipe($.print(filepath => `typescript:format ➡ ${filepath}`))
    .pipe(gulp.dest(SRC_DIR))
);

gulp.task('typescript:lint', () =>
  gulp.src(TYPESCRIPT_FILES)
    .pipe($.tslint())
    .pipe($.tslint.report('verbose', {
      summarizeFailureOutput: true,
      emitError: yargs._.indexOf('dev') === -1,
    }))
);

gulp.task('build:static', () =>
  gulp.src(STATIC_FILES)
    .pipe($.changed(BUILD_SRC_DIR))
    .pipe($.print(filepath => `build:static ➡ ${filepath}`))
    .pipe(gulp.dest(BUILD_SRC_DIR))
);

gulp.task('build:typescript', ['typescript:lint', 'build:static'], () =>
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
  gulp.src([`${BUILD_SRC_DIR}/test/*-helper.js`, `${BUILD_SRC_DIR}/**/*-spec.js`])
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



const isCleanCache = {};

function isClean(configName: string): boolean {
  if (isCleanCache[configName]) {
    return false;
  }

  isCleanCache[configName] = true;
  return yargs.clean === true;
}

function promised(callback: Function, shouldReject: boolean = true): Promise<any> {
  return new Promise((resolve, reject) =>
    callback((err, content) => err && shouldReject ? reject(err) : resolve(content))
  );
}

function buildIndexHtmlFile() {
  const glob = require('glob');
  const fs = require('fs');
  const dust = require('dustjs-linkedin');
  const { merge } = require('lodash');
  const opts = { cwd: ROOT_DIR };

  const manifests = new Promise(resolve =>
    glob(`${BUILD_PUBLIC_DIR}/*-manifest.json`, opts, (err, files) =>
      resolve(Promise.all(files.map(filepath =>
        promised(cb => fs.readFile(filepath, 'utf8', cb))
          .then(JSON.parse)
      )))
    )
  );

  function filterFiles(manifest: Object): Array<string> {
    const results: Array<string> = [];
    Object.keys(manifest)
      .filter(key => path.extname(key) === '.js')
      .forEach(key => results.push(`${CDN_PATH}/${manifest[key]}`));
    return results;
  }

  function create(manifest: Array<string>) {
    return promised(cb => fs.readFile(`${SRC_DIR}/index.dust`, 'utf8', cb))
      .then(content => dust.compile(content, 'index'))
      .then(dust.loadSource)
      .then(() => promised(cb => dust.render('index', { manifest }, cb)))
      .then(html => promised(cb => fs.writeFile(`${BUILD_PUBLIC_DIR}/index.html`, html, cb)));
  }

  if (DEVELOPMENT) {
    return create([
      '/vendor.js',
      '/dev.js',
      '/webpack/hmr.js',
      '/webpack/components.js',
      '/webpack/app.js',
    ]);
  }

  return manifests
    .then(manifests => merge(...[{}].concat(manifests)))
    .then(filterFiles)
    .then(create)
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
          if (allFilesExist && !isClean(configName)) {
            log(`Found "${expectedFiles.join(', ')}" required for "${configName}", run with --clean to rebuild.`);
            return done();
          }
        } else {
          log(`Will always build ${configName}`);
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

    if (yargs.verbose) {
      stats
        .toString()
        .split(/\n/g)
        .forEach(logWithWarnings);
    }

    done();
  }
}