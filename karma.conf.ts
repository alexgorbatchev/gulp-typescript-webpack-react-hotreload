process.env.NODE_ENV = 'test';

module.exports = function(config) {
  config.set({
    colors: true,
    frameworks: ['mocha'],
    reporters: ['spec'],
    browsers: ['Chrome'],
    singleRun: true,
    webpack: require('./webpack.config').default,
    
    files: [
      'node_modules/phantomjs-polyfill/bind-polyfill.js',
      'test/bundle.js',
    ],

    preprocessors: {
      'test/bundle.js': ['webpack', 'sourcemap']
    },

    webpackMiddleware: {
      noInfo: true,
      quiet: true,
    },
  });
}