import * as path from 'path';
import stats from './stats';

import {
  ROOT_DIR,
  PRODUCTION,
  SRC_DIR,
  BUILD_DIR,
  VENDOR_DLL,
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
  path: VENDOR_DLL,
  name: '[name]',
};

if (PRODUCTION) {
  plugins.push(
    new ManifestPlugin({ fileName: path.relative(BUILD_DIR, VENDOR_MANIFEST) }),
    new UglifyJsPlugin({ comments: false })
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
