const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');

import * as path from 'path';

import {
  PRODUCTION,
  SRC_DIR,
  BUILD_DIR,
  VENDOR_MANIFEST,
  PUBLIC_PATH,
} from '../config';

const REQUIRED_MODULES: Array<string> = [
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
];

const DEVELOPMENT_MODULES: Array<string> = [
  'redux-devtools',
  'redux-devtools-log-monitor',
  'redux-devtools-dock-monitor',
  'react-hot-api',
  'react-hot-loader',
  'sockjs-client',
];

let devtool, entry, output, plugins, resolve, dllOptions;

devtool = 'source-map';
plugins = [];

entry = {
  vendor: REQUIRED_MODULES,
};

output = {
  path: BUILD_DIR,
  publicPath: PUBLIC_PATH,
  filename: '[name].js',
  library: 'vendor',
  libraryTarget: 'var',
};

dllOptions = {
  path: VENDOR_MANIFEST,
  name: 'vendor',
};

if (PRODUCTION) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({ comments: false }),
    new ManifestPlugin()
  );

  output.filename = '[name]-[hash].js';
  output.library = '[name]_[hash]';
  dllOptions.name = '[name]_[hash]';
} else {
  entry.vendor = entry.vendor.concat(DEVELOPMENT_MODULES);
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
