import * as path from 'path';
import stats from './stats';

import {
  BUILD_DIR,
  TEST_DLL,
  PUBLIC_PATH,
} from '../config';

import { vendorDll, devDll } from './dlls';

const {
  DllPlugin,
  DllReferencePlugin,
} = require('webpack');

let entry, output, plugins, loaders, resolve, noParse;

noParse = [/\/sinon\//];

resolve = {
  alias: {
    sinon: 'sinon/pkg/sinon.js',
  },
};

entry = {
  test: [
    'chai',
    'sinon/pkg/sinon.js',
    'sinon-chai',
    'react-addons-test-utils',
  ],
};

output = {
  path: BUILD_DIR,
  publicPath: PUBLIC_PATH,
  filename: '[name].js',
  library: 'test',
  libraryTarget: 'var',
};

plugins = [
  vendorDll(),
  devDll(),
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
  module: { loaders, noParse },
  resolve,
  stats,
};
