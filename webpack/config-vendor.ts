import * as path from 'path';
import stats from './stats';

import {
  PRODUCTION,
  BUILD_PUBLIC_DIR,
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
    'react-intl',
    'react-redux',
    'react-router',
    'react-router-redux',
    'redux',
    'redux-thunk',
    'whatwg-fetch',
  ],
};

output = {
  path: BUILD_PUBLIC_DIR,
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
    new ManifestPlugin({ fileName: path.relative(BUILD_PUBLIC_DIR, VENDOR_MANIFEST) }),
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
