import stats from './stats';

import {
  PRODUCTION,
  SRC_DIR,
  BUILD_DIR,
  VENDOR_MANIFEST,
  PUBLIC_PATH,
} from '../config';

const ManifestPlugin = require('webpack-manifest-plugin');

const {
  DllPlugin,
  optimize: {
    UglifyJsPlugin,
  },
} = require('webpack');

let devtool, entry, output, plugins, resolve, dllOptions;

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
  publicPath: PUBLIC_PATH,
  filename: '[name].js',
  library: 'vendor',
  libraryTarget: 'var',
};

dllOptions = {
  path: VENDOR_MANIFEST,
  name: '[name]',
};

if (PRODUCTION) {
  plugins.push(
    new UglifyJsPlugin({ comments: false }),
    new ManifestPlugin({ fileName: 'vendor__-manifest.json' })
  );

  output.filename = '[name]-[hash].js';
  output.library = '[name]_[hash]';
  dllOptions.name = '[name]_[hash]';
}

plugins.push(new DllPlugin(dllOptions));

export default {
  target: 'web',
  devtool,
  entry,
  output,
  plugins,
  stats,
};
