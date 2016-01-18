import * as path from 'path';
import stats from './stats';

import {
  SRC_DIR,
  BUILD_DIR,
  DEV_DLL,
  PUBLIC_PATH,
  ROOT_DIR,
  VENDOR_DLL,
  DEV_MANIFEST,
} from '../config';

const {
  DllPlugin,
  DllReferencePlugin,
} = require('webpack');

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
    path: DEV_DLL,
    name: 'dev',
  }),
  new DllReferencePlugin({
    context: ROOT_DIR,
    manifest: require(VENDOR_DLL),
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
