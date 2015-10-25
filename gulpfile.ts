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

// const {watch: isWatching} = require('yargs').argv;
const typescriptProject = $.typescript.createProject('tsconfig.json', { typescript: require('typescript') });
const allTypescriptFiles = ['src/**/*.{ts,tsx}', 'test/**/*.ts', 'gulpfile.ts'];

gulp.task('typescript:format', function() {
  return gulp.src(allTypescriptFiles)
    .pipe($.changedInPlace())
    .pipe($.tsfmt({ options: require('./tsfmt.json') }))
    .pipe($.print(filepath => `Formatted ${filepath}`))
    .pipe(gulp.dest(file => path.basename(file.path)));
});

// gulp.task('public', function() {
//   gulp.src('src/public/**/*')
//     .pipe($.changed('build/public'))
//     .pipe($.print(filepath => `Copied ${filepath}`))
//     .pipe(gulp.dest('build/public'));
// });

gulp.task('webpack', ['pre-build'], function(done) {
  const webpack = require('webpack');

  webpack(require('./webpack.config.js'), function(err, stats) {
    if (err) {
      log(colors.red(err.message));
      return process.exit(-1);
    }

    stats.toString('minimal').split(/\n/g).forEach(line => log(`    ${line}`));
    done();
  });
});

gulp.task('build', ['webpack']);

gulp.task('dev', ['typescript:format'], function() {
  gulp.watch(allTypescriptFiles,  ['typescript:format']);
  gulp.watch(['webpack.ts', 'webpack.config.js'], $.devExpress('webpack.ts'));
});
