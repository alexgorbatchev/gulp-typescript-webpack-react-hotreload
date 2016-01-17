import * as path from 'path';

import { BUILD_DIR } from './config';

const gulp = require('gulp');
const { log, colors } = require('gulp-util');
const $ = {
  bg: require('gulp-bg'),
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

gulp.task('karma', $.bg('karma', 'start', '--single-run=false'));
gulp.task('dev:server', $.bg('node', 'webpack/dev-server.js'));
gulp.task('build:copy', () => gulp.src(STATIC_FILES).pipe(gulp.dest(BUILD_DIR)));
gulp.task('build:vendor', webpack('vendor'));
gulp.task('build:app', webpack('app'));
gulp.task('build:static', ['build:vendor', 'build:copy'])
gulp.task('build', ['build:vendor', 'build:static']);

gulp.task('dev', ['typescript:format', 'karma', 'build:static', 'dev:server'], function() {
  gulp.watch(STATIC_FILES, ['build:copy']);
  gulp.watch(['webpack/**/*'], ['dev-server']);
  gulp.watch(['karma.conf.ts'], ['karma']);
});


function webpack(configName: string) {
  return function (done) {
    const webpack = require('webpack');
    const { default: config, stats } = require(`./webpack/config-${configName}`);
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