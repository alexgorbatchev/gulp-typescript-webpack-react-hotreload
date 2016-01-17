import * as path from 'path';

const gulp = require('gulp');
const { log, colors } = require('gulp-util');

const $ = {
  bg: require('gulp-bg'),
  devExpress: require('gulp-dev-express'),
  // changedInPlace: require('gulp-changed-in-place'),
  // print: require('gulp-print'),
  // tsfmt: require('gulp-tsfmt'),
};

const STATIC_FILES: Array<string> = [ 'src/index.html' ];
const karma = $.bg('karma', 'start', '--single-run=false');

gulp.task('typescript:format', function() {
  log('typescript:format is not ready until TypeScript 1.8');
  // gulp.src(allTypescriptFiles)
  //   .pipe($.changedInPlace())
  //   .pipe($.tsfmt({ options: require('./tsfmt.json') }))
  //   .pipe($.print(filepath => `Formatted ${filepath}`))
  //   .pipe(gulp.dest(file => path.dirname(file.path)));
});

gulp.task('karma', karma);
gulp.task('webpack-dev-server', $.devExpress('webpack.js'));

function printStats(statsOpts, done) {
  return function(err, stats) {
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

    stats
      .toString(statsOpts)
      .split(/\n/g)
      .forEach(logWithWarnings);

    done();
  }
}

gulp.task('build:copy', function() {
  gulp.src(STATIC_FILES)
    .pipe(gulp.dest(path.join(__dirname, 'build', 'public')));
});

gulp.task('build:vendor', function(done) {
  const webpack = require('webpack');
  const { default: config } = require('./webpack-vendor.config');
  const { stats } = require('./webpack-app.config');
  webpack(config, printStats(stats, done));
});

gulp.task('build:app', function(done) {
  const webpack = require('webpack');
  const { default: config, stats } = require('./webpack-app.config');
  webpack(config, printStats(stats, done));
});

gulp.task('build:static', ['build:vendor', 'build:copy'])
gulp.task('build', ['build:vendor', 'build:static']);

gulp.task('dev', ['typescript:format', 'karma', 'build:static'], function() {
  gulp.watch(STATIC_FILES, ['build:copy']);
  gulp.watch(['webpack.ts', 'webpack-app.config.ts'], ['webpack-dev-server']);
  gulp.watch(['karma.conf.ts'], ['karma']);
});
