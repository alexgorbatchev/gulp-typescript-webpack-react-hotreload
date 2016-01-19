import * as path from 'path';

import {
  BUILD_DIR,
  DEVELOPMENT,
  TEST,
  ROOT_DIR,
  SRC_DIR,
  CDN_PATH,
} from './config';

const gulp = require('gulp');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const { Promise } = require('es6-promise');
const { log, colors } = require('gulp-util');
const $ = {
  bg: require('gulp-bg'),
  sequence: require('run-sequence'),
  // changedInPlace: require('gulp-changed-in-place'),
  // print: require('gulp-print'),
  // tsfmt: require('gulp-tsfmt'),
};

const STATIC_FILES: Array<string> = [ 'src/index.html' ];

gulp.task('typescript:format', function() {
  log('typescript:format is not ready until TypeScript 1.8');
  // gulp.src(allTypescriptFiles)
  //   .pipe($.changedInPlace())
  //   .pipe($.tsfmt({ options: require('./tsfmt.json') }))
  //   .pipe($.print(filepath => `Formatted ${filepath}`))
  //   .pipe(gulp.dest(file => path.dirname(file.path)));
});

gulp.task('build:clean', done => rimraf(BUILD_DIR, () => mkdirp(BUILD_DIR, done)));
gulp.task('build:vendor', webpack('vendor'));
gulp.task('build:app', ['build:vendor', 'build:dev'], webpack('app'));
gulp.task('build:dev', ['build:vendor'], webpack('dev'));
gulp.task('build:test', ['build:vendor'], webpack('test'));
gulp.task('build:index', buildIndex);
gulp.task('build:static', buildStatic);
gulp.task('build', ['build:static']);

gulp.task('karma:start', $.bg('karma', 'start', '--single-run=false'));
gulp.task('karma', karma);
gulp.task('dev:server', ['build:static'], $.bg('node', 'webpack/dev-server.js'));

gulp.task('dev', ['typescript:format', 'karma', 'build:static', 'dev:server'], function() {
  gulp.watch(['webpack/**/*'], ['dev:server']);
  gulp.watch(['karma.conf.ts'], ['karma']);
});



function buildStatic(done) {
  const buildSteps = ['build:vendor', 'build:app', 'build:index'];

  if (DEVELOPMENT) {
    buildSteps.push('build:dev');
  }

  if (TEST) {
    buildSteps.push('build:test');
  }

  return $.sequence('build:clean', buildSteps, done);
}

function karma(done) {
  return $.sequence(['build:static', 'build:test'], 'karma:start', done);
}

function buildIndex() {
  const glob = require('glob');
  const fs = require('fs');
  const dust = require('dustjs-linkedin');
  const { merge } = require('lodash');
  const opts = { cwd: ROOT_DIR };

  const manifests = new Promise(resolve =>
    glob(`${BUILD_DIR}/*-manifest.json`, opts, (err, files) =>
      resolve(Promise.all(files.map(filepath =>
        promised(cb => fs.readFile(filepath, 'utf8', cb))
          .then(JSON.parse)
      )))
    )
  );

  function promised(callback) {
    return new Promise((resolve, reject) =>
      callback((err, content) => err ? reject(err) : resolve(content))
    );
  }

  function filterFiles(manifest): Array<string> {
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
      .then(html => promised(cb => fs.writeFile(`${BUILD_DIR}/index.html`, html, cb)));
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
    .then(manifests => merge.apply(null, [{}].concat(manifests)))
    .then(filterFiles)
    .then(create)
    .catch(e => console.error(e.stack));
}

function webpack(configName: string) {
  return function(done) {
    const webpack = require('webpack');
    const { default: config } = require(`./webpack/config-${configName}`);
    const { default: stats } = require('./webpack/stats');
    webpack(config, printStats(stats, done));
  }
}

function printStats(statsOpts, done) {
  return function(err, stats) {
    if (err) {
      log(colors.red(err.message));
      return process.exit(-1);
    }

    const reset = colors.enabled ? '\033[0m' : '';

    function logWithWarnings(line) {
      const hasWarning = line.indexOf('WARNING') === 0;
      const dashes = '---------------------------------------------------------------------';
      if (hasWarning) { log(dashes); }
      log(line + reset);
      if (hasWarning) { log(dashes); }
    }

    stats
      .toString(statsOpts)
      .split(/\n/g)
      .forEach(logWithWarnings);

    done();
  }
}