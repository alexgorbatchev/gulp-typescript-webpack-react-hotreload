import * as path from 'path';
import stats from './stats';

import {
  BUILD_PUBLIC_DIR,
  TEST_DLL,
  WEBPACK_PUBLIC_PATH,
} from '../config';

import { VendorDllReferencePlugin, DevDllReferencePlugin } from './dlls';

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
  path: BUILD_PUBLIC_DIR,
  publicPath: WEBPACK_PUBLIC_PATH,
  filename: '[name].js',
  library: 'test',
  libraryTarget: 'var',
};

plugins = [
  new VendorDllReferencePlugin(),
  new DevDllReferencePlugin(),
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
