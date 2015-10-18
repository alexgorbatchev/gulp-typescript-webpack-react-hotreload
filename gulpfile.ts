/// <reference path="typings/dev.d.ts" />

import * as path from 'path';

const gulp = require('gulp');
const del = require('del');

const $ = {
  changed: require('gulp-changed'),
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
    .pipe($.changed())
    .pipe($.tsfmt(tsfmtOptions))
    .pipe($.print(filepath => `Formatted ${filepath}`))
    .pipe(gulp.dest('src'));
});

gulp.task('typescript:format:tests', function() {
  return gulp.src('tests/**/*.ts')
    .pipe($.changed())
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

gulp.task('webpack', function() {
  const webpack = require('webpack');
});

gulp.task('format', ['typescript:format:src', 'typescript:format:tests']);
gulp.task('build', ['public', 'format', 'typescript']);

gulp.task('dev', ['build'], function() {
  gulp.watch('src/**/*.{ts,tsx}', ['typescript:format:src']);
  gulp.watch('src/server/**/*.ts', ['typescript']);
  gulp.watch('src/public/**/*', ['public']);
  gulp.watch('tests/**/*.ts', ['typescript:format:tests']);
  gulp.watch('build/server/**/*.js', $.devExpress('build/server/index.js'));
  gulp.watch('build/server/webpack.js', $.devExpress('build/server/webpack.js'));
});
