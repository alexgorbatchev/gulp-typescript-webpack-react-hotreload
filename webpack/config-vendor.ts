import * as path from 'path';
import stats from './stats';
import ManifestPlugin from './manifest-plugin';

import {
  ENV,
  PRODUCTION,
  BUILD_PUBLIC_DIR,
  VENDOR_DLL,
  WEBPACK_PUBLIC_PATH,
} from '../config';

const {
  DllPlugin,
  DefinePlugin,
  optimize: {
    UglifyJsPlugin,
  },
} = require('webpack');

let devtool, entry, output, plugins, resolve, dllOptions;

devtool = 'inline-source-map';

plugins = [
  new DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(ENV),
  })
];

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
  publicPath: WEBPACK_PUBLIC_PATH,
  filename: '[name].js',
  library: 'vendor',
  libraryTarget: 'var',
};

dllOptions = {
  path: VENDOR_DLL,
  name: '[name]',
};

if (PRODUCTION) {
  devtool = 'source-map';

  plugins.push(
    new UglifyJsPlugin({ comments: false }),
    new ManifestPlugin()
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
