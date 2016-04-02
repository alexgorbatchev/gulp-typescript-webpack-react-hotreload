import * as path from 'path';
import { execSync } from 'child_process';
import stats from './stats';

import {
  PRODUCTION,
  TEST,
  DEVELOPMENT,
  SRC_DIR,
  ROOT_DIR,
  BUILD_PUBLIC_DIR,
  VENDOR_DLL,
  TEST_DLL,
  DEV_DLL,
  APP_MANIFEST,
  PUBLIC_PATH,
} from '../config';

import { testDll, vendorDll, devDll } from './dlls';

const ManifestPlugin = require('webpack-manifest-plugin');

const {
  DllReferencePlugin,
  DefinePlugin,
  HotModuleReplacementPlugin,
  ProvidePlugin,
  optimize: {
    UglifyJsPlugin,
    DedupePlugin,
    OccurenceOrderPlugin,
    CommonsChunkPlugin,
  },
} = require('webpack');

let devtool, entry, output, plugins, resolve, preLoaders, loaders, tslint;

devtool = 'source-map';

entry = {
  components: [ path.join(SRC_DIR, 'components') ],
  app: [ path.join(SRC_DIR, 'index.tsx') ],
};

output = {
  path: BUILD_PUBLIC_DIR,
  publicPath: PUBLIC_PATH,
  filename: '[name].js',
  chunkFilename: '[name].js',
};

const definePlugin = new DefinePlugin({
  SHA: getSHA(),
  DEVELOPMENT,
  PRODUCTION,
  TEST,
});

plugins = [
  new DedupePlugin(),
  new OccurenceOrderPlugin(),
  // new AggressiveMergingPlugin(),
  new CommonsChunkPlugin({
    name: 'components',
    chunks: [ 'components', 'app' ]
  }),
  new ProvidePlugin({
    'Promise': 'exports?global.Promise!es6-promise',
    'fetch': 'exports?self.fetch!whatwg-fetch',
  }),
  definePlugin,
];

resolve = {
  alias: {
    sinon: 'sinon/pkg/sinon.js',
  },
  extensions: [ '', '.tsx', '.ts', '.js' ],
};

preLoaders = [
  {
    test: /\.ts(x)?$/,
    loader: 'tslint',
    include: [ SRC_DIR ],
  },
];

tslint = {
  emitErrors: true,
  configuration: require('../tslint.json'),
};

loaders = [
  {
    test: /\.ts(x)?$/,
    loaders: [ 'react-hot', 'ts?silent' ],
    include: [ SRC_DIR ],
  },
  {
    test: /\.(png|jpg|svg)$/,
    loader: 'url-loader?limit=8192',
    include: [ SRC_DIR ],
  },
];

if (DEVELOPMENT) {
  entry.hmr = [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server'
  ];

  plugins.push(
    new HotModuleReplacementPlugin(),
    new CommonsChunkPlugin({ name: 'hmr' })
  );
}

if (PRODUCTION) {
  plugins.push(
    new ManifestPlugin({ fileName: path.relative(BUILD_PUBLIC_DIR, APP_MANIFEST) }),
    new UglifyJsPlugin({ comments: false })
  );

  output.filename = '[name]-[hash].js';
  output.chunkFilename = '[name]-[hash].js';
}

if (TEST) {
  devtool = '#inline-source-map';
  entry = {};
  output = {};
  plugins = [ definePlugin, testDll(), vendorDll(), devDll() ];
}

plugins.push(vendorDll(), devDll());

export default {
  target: 'web',
  devtool,
  tslint,
  entry,
  output,
  plugins,
  resolve,
  module: {
    preLoaders,
    loaders,
  }
};

function getSHA(): string {
  const result: string = execSync('git describe --exact-match --tags HEAD 2>&1; exit 0').toString();
  const matches: Array<string> = result.match(/^fatal: no tag exactly matches '(\w+)'/);
  return JSON.stringify((matches && matches[1]) || result);
}
