import * as path from 'path';
import stats from './stats';

import {
  BUILD_DIR,
  TEST_DLL,
  PUBLIC_PATH,
} from '../config';

import { vendorDll } from './dlls';

const {
  DllPlugin,
  DllReferencePlugin,
} = require('webpack');

let entry, output, plugins, loaders;

entry = {
  test: [
    'chai',
    'sinon/pkg/sinon.js',
    'react-addons-test-utils',
  ],
};

loaders = [
  {
    test: /sinon/,
    loader: 'imports?define=>false,require=>false',
  },
];

output = {
  path: BUILD_DIR,
  publicPath: PUBLIC_PATH,
  filename: '[name].js',
  library: 'test',
  libraryTarget: 'var',
};

plugins = [
  vendorDll(),
  new DllPlugin({
    path: TEST_DLL,
    name: '[name]',
  }),
];

export default {
  target: 'web',
  entry,
  output,
  plugins,
  module: { loaders },
  stats,
};
