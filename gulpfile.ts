import * as path from 'path';

const gulp = require('gulp');
const {log, colors} = require('gulp-util');

const $ = {
  bg: require('gulp-bg'),
  changedInPlace: require('gulp-changed-in-place'),
  devExpress: require('gulp-dev-express'),
  print: require('gulp-print'),
  tsconfigFiles: require('gulp-tsconfig-files'),
  tsfmt: require('gulp-tsfmt'),
  typescript: require('gulp-typescript'),
};

const typescriptProject = $.typescript.createProject('tsconfig.json', { typescript: require('typescript') });
const allTypescriptFiles = ['src/**/*.{ts,tsx}', 'test/**/*.{ts,tsx}', '*.ts'];

gulp.task('typescript:format', function() {
  log('typescript:format is not ready until TypeScript 1.8')
  // gulp.src(allTypescriptFiles)
  //   .pipe($.changedInPlace())
  //   .pipe($.tsfmt({ options: require('./tsfmt.json') }))
  //   .pipe($.print(filepath => `Formatted ${filepath}`))
  //   .pipe(gulp.dest(file => path.dirname(file.path)));
});

gulp.task('typescript:tsconfig', function() {
  gulp.src(['typings/tsd.d.ts'].concat(allTypescriptFiles), { read: false })
    .pipe($.tsconfigFiles());
});

gulp.task('tdd', ['typescript:tsconfig'], $.bg('karma', 'start', '--single-run=false'));

gulp.task('webpack', function(done) {
  const webpack = require('webpack');
  const config = require('./webpack.config.ts').default;

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

    stats
      .toString(config.stats)
      .split(/\n/g)
      .forEach(logWithWarnings);

    done();
  });
});

gulp.task('build', ['webpack']);

gulp.task('dev', ['typescript:format', 'tdd'], function() {
  gulp.watch(allTypescriptFiles, ['typescript:format', 'typescript:tsconfig']);
  gulp.watch(['webpack.ts', 'webpack.config.ts'], $.devExpress('webpack.js'));
});
