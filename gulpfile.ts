/// <reference path="typings/tsd.d.ts" />

import * as path from 'path';

const gulp = require('gulp');
const del = require('del');
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
const allTypescriptFiles = ['src/**/*.{ts,tsx}', 'tests/**/*.ts', 'gulpfile.ts'];
const tsfmtOptions = { options: require('./tsfmt.json') };

gulp.task('clean', () => del('build'));

gulp.task('typescript:format:src', function() {
  return gulp.src('src/**/*.{ts,tsx}')
    .pipe($.changedInPlace())
    .pipe($.tsfmt(tsfmtOptions))
    .pipe($.print(filepath => `Formatted ${filepath}`))
    .pipe(gulp.dest('src'));
});

gulp.task('typescript:format:tests', function() {
  return gulp.src('tests/**/*.ts')
    .pipe($.changedInPlace())
    .pipe($.tsfmt(tsfmtOptions))
    .pipe($.print(filepath => `Formatted ${filepath}`))
    .pipe(gulp.dest('tests'));
});

gulp.task('typescript', ['typescript:format:src'], function() {
  return gulp.src('src/server/**/*.ts')
    .pipe($.plumber({ errorHandler: $.notify.onError('<%= error.relativeFilename %>: <%= error.diagnostic.messageText %>') }))
    .pipe($.changed('build/server', { extension: '.js' }))
    .pipe($.typescript(typescriptProject)).js
    .pipe($.print(filepath => `Generated ${filepath}`))
    .pipe(gulp.dest('build/server'))

    .pipe($.collector(files => Object.keys(files).join('\n')))
    .pipe($.notify({ title: 'TypeScript', message: `OK\n<%= file.contents %>` }));
});

gulp.task('public', function() {
  gulp.src('src/public/**/*')
    .pipe($.changed('build/public'))
    .pipe($.print(filepath => `Copied ${filepath}`))
    .pipe(gulp.dest('build/public'));
});

gulp.task('webpack', ['pre-build'], function(done) {
  const webpack = require('webpack');

  webpack(require('./webpack.config-production.js'), function(err, stats) {
    if (err) {
      log(colors.red(err.message));
      return process.exit(-1);
    }

    stats.toString('minimal').split(/\n/g).forEach(line => log(`    ${line}`));
    done();
  });
});

gulp.task('format', ['typescript:format:src', 'typescript:format:tests']);
gulp.task('pre-build', ['public', 'format', 'typescript']);
gulp.task('build', ['pre-build', 'webpack']);

gulp.task('dev', ['pre-build'], function() {
  gulp.watch('src/**/*.{ts,tsx}', ['typescript:format:src']);
  gulp.watch('src/server/**/*.ts', ['typescript']);
  gulp.watch('src/public/**/*', ['public']);
  gulp.watch('tests/**/*.ts', ['typescript:format:tests']);
  gulp.watch('build/server/**/*.js', $.devExpress('build/server/index.js'));
  gulp.watch('build/server/webpack.js', $.devExpress('build/server/webpack.js'));
});
