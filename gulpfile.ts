import * as path from 'path';

import {
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
const merge = require('merge2');
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
};

const STATIC_FILES: Array<string> = ['src/index.html'];
const TYPESCRIPT_FILES: Array<string> = ['src/!(node_modules)/**/*.{ts,tsx}'];

var typescript = $.typescript.createProject(require('./tsconfig.json').compilerOptions);

gulp.task('typescript:format', () =>
  gulp.src(TYPESCRIPT_FILES)
    .pipe($.changedInPlace({ firstPass: yargs.force }))
    .pipe($.tsfmt({ options: require('./tsfmt.json') }))
    .pipe($.print(filepath => `Formatted ${filepath}`))
    .pipe(gulp.dest(SRC_DIR))
);

gulp.task('build:clean', done => rimraf(BUILD_PUBLIC_DIR, () => mkdirp(BUILD_PUBLIC_DIR, done)));
gulp.task('build:vendor', webpackTask('vendor', 'vendor.js'));
gulp.task('build:app', ['build:vendor', 'build:dev'], webpackTask('app'));
gulp.task('build:dev', ['build:vendor'], webpackTask('dev', 'dev.js'));
gulp.task('build:test', ['build:vendor', 'build:dev'], webpackTask('test', 'test.js'));
gulp.task('build:static', () => gulp.src('data').pipe(gulp.dest(BUILD_PUBLIC_DIR)));
gulp.task('build:index', ['build:static'], buildIndexHtmlFile);
gulp.task('build', ['build:app', 'build:index']);

gulp.task('karma', ['build:test'], $.bg('karma', 'start', '--single-run=false'));
gulp.task('dev:server', ['build:vendor', 'build:dev', 'build:index', 'build:static'], $.bg('node', 'webpack/dev-server.js'));

gulp.task('static:files', () =>
  gulp.src([`${SRC_DIR}/**/*`, '!**/*.{ts,tsx}'])
    .pipe($.changed(BUILD_SRC_DIR))
    .pipe($.print(filepath => `Copied ${filepath}`))
    .pipe(gulp.dest(BUILD_SRC_DIR))
);

gulp.task('typescript:compile', ['static:files'], () =>
  gulp.src(TYPESCRIPT_FILES.concat(['typings/tsd.d.ts']))
    .pipe($.changed(BUILD_SRC_DIR, { extension: '.js' }))
    .pipe($.sourcemaps.init())
    .pipe($.typescript(typescript))
    .js
    .pipe($.sourcemaps.write({ sourceRoot: SRC_DIR }))
    .pipe($.print(filepath => `Compiled ${filepath}`))
    .pipe(gulp.dest(BUILD_SRC_DIR))
);

gulp.task('mocha', ['typescript:compile'], () =>
  gulp.src([`${BUILD_SRC_DIR}/test/*-helper.js`, `${BUILD_SRC_DIR}/**/*-spec.js`])
    .pipe($.mocha({
      recursive: true,
      reporter: 'min',
      ui: 'bdd',
    }))
);

gulp.task('watch', ['typescript:compile'], function() {
  gulp.watch(TYPESCRIPT_FILES, ['typescript:compile']);
  gulp.watch(`${BUILD_SRC_DIR}/**/*.js`, ['mocha']);
});

gulp.task('dev', ['typescript:format', 'karma', 'dev:server'], function() {
  gulp.watch(TYPESCRIPT_FILES, ['typescript:format']);
  gulp.watch(['webpack/**/*'], ['dev:server']);
  gulp.watch(['data/**/*'], ['build:static']);
  gulp.watch(['karma.conf.ts'], ['karma']);
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
            log(`Found ${expectedFiles.join(', ')} required for "${configName}", run with --clean to rebuild.`);
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


    // .split(/\n/g)
    // .forEach(logWithWarnings);

    done();
  }
}