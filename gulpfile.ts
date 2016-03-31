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
gulp.task('build:vendor', webpack('vendor', 'vendor.js'));
gulp.task('build:app', ['build:vendor', 'build:dev'], webpack('app'));
gulp.task('build:dev', ['build:vendor'], webpack('dev', 'dev.js'));
gulp.task('build:test', ['build:vendor', 'build:dev'], webpack('test', 'test.js'));
gulp.task('build:index', buildIndex);
gulp.task('build:static', () => gulp.src('data').pipe(gulp.dest(BUILD_DIR)));
gulp.task('build', ['build:app', 'build:index']);

gulp.task('karma', ['build:test'], $.bg('karma', 'start', '--single-run=false'));
gulp.task('dev:server', ['build:vendor', 'build:dev', 'build:index', 'build:static'], $.bg('node', 'webpack/dev-server.js'));

gulp.task('dev', ['typescript:format', 'karma', 'dev:server'], function() {
  gulp.watch(['webpack/**/*'], ['dev:server']);
  gulp.watch(['data/**/*'], ['build:static']);
  gulp.watch(['karma.conf.ts'], ['karma']);
});



const isCleanCache = {};

function isClean(configName: string): boolean {
  if (isCleanCache[configName]) {
    return false;
  }

  const yargs = require('yargs').argv;
  isCleanCache[configName] = true;
  return yargs.clean === true;
}

function promised(callback: Function, shouldReject: boolean = true): Promise<any> {
  return new Promise((resolve, reject) =>
    callback((err, content) => err && shouldReject ? reject(err) : resolve(content))
  );
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
    .then(manifests => merge(...[{}].concat(manifests)))
    .then(filterFiles)
    .then(create)
    .catch(e => console.error(e.stack));
}

function webpack(configName: string, ...expectedFiles: Array<string>): Function {
  return function(done) {
    const fs = require('fs');

    Promise.all(expectedFiles.map(filepath => promised(cb => fs.stat(`${BUILD_DIR}/${filepath}`, cb), false)))
      .then(stats => stats.reduce((all, current) => all && current, true))
      .then(allFilesExist => {
        if (expectedFiles.length > 0) {
          if (allFilesExist && !isClean(configName)) {
            log(`Found ${expectedFiles.join(', ')} required for "${configName}", run with --clean to rebuild.`);
            return done();
          }
        } else {
          log(`Will always build ${configName}`);
        }

        const webpack = require('webpack');
        const { default: config } = require(`./webpack/config-${configName}`);
        const { default: stats } = require('./webpack/stats');

        webpack(config, printStats(stats, done));
      })
      .catch(e => console.error(e.stack));
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