process.env.NODE_ENV = 'test';
var path = require('path');

module.exports = function(config) {
  config.set({
    colors: true,
    frameworks: ['mocha'],
    reporters: ['spec'],// 'coverage'],

    files: [
      'node_modules/phantomjs-polyfill/bind-polyfill.js',
      'test/karma/bundle.js',
    ],

    preprocessors: {
      // '**/*.ts, **/*.tsx': ['coverage'],
      'test/karma/bundle.js': ['webpack', 'sourcemap']
    },

    browsers: ['Chrome'],
    singleRun: true,

    // coverageReporter: {
    //   dir: 'build/coverage/',
    //   instrumenter: {
    //       '**/*.ts': 'istanbul',
    //       '**/*.tsx': 'istanbul'
    //   },
    //   instrumenterOptions: {
    //       istanbul: {
    //           noCompact: true,
    //           embedSource: true,
    //       }
    //   },
    //   reporters: [
    //       { type: 'html' },
    //       { type: 'text-summary' },
    //   ]
    // },

    webpack: {
      devtool: '#inline-source-map',
      resolve: {
        extensions: ['', '.ts', '.tsx', '.js'],
      },
      module: {
        loaders: [
          {
            test: /\.ts(x)?$/,
            loaders: ['ts-loader'],
          },
        ],
        // postLoaders: [
        //   {
        //     test: /\.ts(x)?$/,
        //     include: path.join(__dirname, 'src', 'client'),
        //     loader: 'istanbul-instrumenter'
        //   }
        // ]
      }
    },

    webpackMiddleware: {
      noInfo: true,
      quiet: true,
    },
  });
}