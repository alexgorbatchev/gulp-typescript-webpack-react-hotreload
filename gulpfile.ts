/// <reference path="typings/tsd.d.ts" />

import * as path from 'path';

const gulp = require('gulp');
const {log, colors} = require('gulp-util');

const $ = {
  changed: require('gulp-changed'),
  changedInPlace: require('gulp-changed-in-place'),
  collector: require('gulp-collector'),
  devExpress: require('gulp-dev-express'),
  ifElse: require('gulp-if-else'),
  notify: require('gulp-notify'),
  plumber: require('gulp-plumber'),
  print: require('gulp-print'),
  tsfmt: require('gulp-tsfmt'),
  typescript: require('gulp-typescript'),
};

const typescriptProject = $.typescript.createProject('tsconfig.json', { typescript: require('typescript') });
const allTypescriptFiles = ['src/**/*.{ts,tsx}', 'test/**/*.ts', 'gulpfile.ts'];

gulp.task('typescript:format', function() {
  return gulp.src(allTypescriptFiles)
    .pipe($.changedInPlace())
    .pipe($.tsfmt({ options: require('./tsfmt.json') }))
    .pipe($.print(filepath => `Formatted ${filepath}`))
    .pipe(gulp.dest(file => path.basename(file.path)));
});

gulp.task('webpack', function(done) {
  const webpack = require('webpack');
  const config = require('./webpack.config.js');

  webpack(config, function(err, stats) {
    if (err) {
      log(colors.red(err.message));
      return process.exit(-1);
    }

    const reset = colors.enabled ? '\033[0m' : '';

    function logWithWarnings(line) {
      const hasWarning = line.indexOf('WARNING') === 0;
      const dashes = '    ---------------------------------------------------------------------';
      if (hasWarning) { log(dashes); }
      log('    ' + line + reset);
      if (hasWarning) { log(dashes); }
    }

    stats.toString(config.stats).split(/\n/g).forEach(logWithWarnings);

    done();
  });
});

gulp.task('build', ['webpack']);

gulp.task('dev', ['typescript:format'], function() {
  gulp.watch(allTypescriptFiles,  ['typescript:format']);
  gulp.watch(['webpack.ts', 'webpack.config.js'], $.devExpress('webpack.ts'));
});
