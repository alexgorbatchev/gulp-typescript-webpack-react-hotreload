const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');

import * as path from 'path';

let devtool, entry, output, plugins, resolve, dllOptions;

const PRODUCTION = process.env.NODE_ENV === 'production';
const SRC_DIR = path.join(__dirname, 'src');
const BUILD_DIR = path.join(__dirname, 'build', 'public');

devtool = 'source-map';
plugins = [];

entry = {
  vendor: [
    'es6-promise',
    'immutable',
    'history',
    'object.assign',
    'radium',
    'react',
    'react-dom',
    'react-redux',
    'react-router',
    'redux',
    'redux-simple-router',
  ],
};

output = {
  path: BUILD_DIR,
  publicPath: '/static/',
  filename: '[name].js',
  library: 'vendor',
  libraryTarget: 'var',
};

dllOptions = {
  path: path.join(BUILD_DIR, '[name]-manifest.json'),
  name: '[name]',
};

if (PRODUCTION) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({ comments: false }),
    new ManifestPlugin()
  );

  output.filename = '[name]-[hash].js';
  dllOptions.name = '[name]-[hash].js';
} else {
  entry.vendor.push(
    'redux-devtools',
    'redux-devtools-log-monitor',
    'redux-devtools-dock-monitor',
    'react-hot-api',
    'react-hot-loader',
    'sockjs-client'
  );
}

plugins.push(new webpack.DllPlugin(dllOptions));

export let stats = {
  colors: require('gulp-util').colors.enabled,
  assets: true,
  version: true,
  timings: true,
  hash: true,
  chunks: true,
  chunkModules: true,
  errorDetails: true,
  reasons: false,
};

export default {
  target: 'web',
  devtool,
  entry,
  output,
  plugins,
  stats,
};
