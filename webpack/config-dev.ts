import * as path from 'path';
import stats from './stats';
import { vendorDll } from './dlls';

import {
  BUILD_PUBLIC_DIR,
  DEV_DLL,
  WEBPACK_PUBLIC_PATH,
} from '../config';

const {
  DllPlugin,
  DllReferencePlugin,
} = require('webpack');

let devtool, entry, output, plugins, resolve, dllOptions;

devtool = 'inline-source-map';

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
  publicPath: WEBPACK_PUBLIC_PATH,
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
