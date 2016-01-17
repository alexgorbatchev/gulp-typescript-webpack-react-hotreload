const { DllPlugin, DllReferencePlugin } = require('webpack');

import stats from './stats';

import {
  SRC_DIR,
  BUILD_DIR,
  DEV_MANIFEST,
  PUBLIC_PATH,
  ROOT_DIR,
  VENDOR_MANIFEST,
} from '../config';

let devtool, entry, output, plugins, resolve, dllOptions;

devtool = 'source-map';

entry = {
  dev: [
    'redux-devtools',
    'redux-devtools-log-monitor',
    'redux-devtools-dock-monitor',
    'react-hot-api',
    'react-hot-loader',
  ],
};

output = {
  path: BUILD_DIR,
  publicPath: PUBLIC_PATH,
  filename: '[name].js',
  library: 'dev',
  libraryTarget: 'var',
};

plugins = [
  new DllPlugin({
    path: DEV_MANIFEST,
    name: 'dev',
  }),
  new DllReferencePlugin({
    context: ROOT_DIR,
    manifest: require(VENDOR_MANIFEST),
    sourceType: 'var',
  }),
];

export default {
  target: 'web',
  devtool,
  entry,
  output,
  plugins,
  stats,
};
