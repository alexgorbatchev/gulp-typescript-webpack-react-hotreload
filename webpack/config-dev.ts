import * as path from 'path';
import stats from './stats';

import {
  BUILD_PUBLIC_DIR,
  DEV_DLL,
  PUBLIC_PATH,
} from '../config';

import { vendorDll } from './dlls';

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
  path: BUILD_PUBLIC_DIR,
  publicPath: PUBLIC_PATH,
  filename: '[name].js',
  library: 'dev',
  libraryTarget: 'var',
};

plugins = [
  vendorDll(),
  new DllPlugin({
    path: DEV_DLL,
    name: 'dev',
  }),
];

export default {
  target: 'web',
  devtool,
  entry,
  output,
  plugins,
  resolve,
  stats,
};
