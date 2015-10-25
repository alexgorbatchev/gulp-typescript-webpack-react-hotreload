process.env.NODE_ENV = 'test';
var path = require('path')

module.exports = function karmaConfig(config) {
  config.set({
    colors: true,
    frameworks: ['mocha'],
    reporters: ['spec', 'coverage'],

    files: [
      // Reference: https://www.npmjs.com/package/phantomjs-polyfill
      // Needed because React.js requires bind and phantomjs does not support it
      'node_modules/phantomjs-polyfill/bind-polyfill.js',
      'test/karma/**/*.test.ts',
    ],

    preprocessors: {
      'test/karma/**/*.test.ts': ['webpack', 'sourcemap'],
    },

    browsers: ['PhantomJS'],
    singleRun: true,

    coverageReporter: {
      dir: 'build/coverage/',
      type: 'html',
    },

    // webpack: require('./webpack.config'),

    webpack: {
      resolve: {
        extensions: ['', '.ts', '.tsx', '.js'],
      },
      module: {
        preLoaders: [
          {
            test: /\.ts(x)?$/,
            exclude: /(test|node_modules)\//,
            loader: 'isparta-instrumenter',
          }
        ],
        loaders: [
          {
            test: /\.ts(x)?$/,
            loaders: ['ts-loader']//, 'isparta-instrumenter'],
          },
        ]
      }
    },

    webpackMiddleware: {
      noInfo: true,
      quiet: true,
    },
  });
}