/// <reference path="typings/tsd.d.ts" />

process.env.NODE_ENV = 'test';

module.exports = function(config) {
  config.set({
    colors: true,
    frameworks: ['mocha'],
    reporters: ['spec'],

    files: [
      'node_modules/phantomjs-polyfill/bind-polyfill.js',
      'test/bundle.js',
    ],

    preprocessors: {
      'test/bundle.js': ['webpack', 'sourcemap']
    },

    browsers: ['Chrome'],
    singleRun: true,

    webpack: {
      devtool: '#inline-source-map',
      resolve: {
        extensions: ['', '.ts', '.tsx', '.js'],
      },
      module: {
        loaders: [
          {
            test: /\.ts(x)?$/,
            loaders: ['ts?silent'],
          },
        ],
      }
    },

    webpackMiddleware: {
      noInfo: true,
      quiet: true,
    },
  });
}