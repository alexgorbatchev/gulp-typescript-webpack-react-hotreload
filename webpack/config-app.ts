import * as path from 'path';
import { execSync } from 'child_process';
import stats from './stats';
import ManifestPlugin from './manifest-plugin';
import { TestDllReferencePlugin, VendorDllReferencePlugin, DevDllReferencePlugin } from './dlls';

import {
  PRODUCTION,
  TEST,
  DEVELOPMENT,
  SRC_DIR,
  ROOT_DIR,
  BUILD_PUBLIC_DIR,
  BUILD_SRC_DIR,
  VENDOR_DLL,
  TEST_DLL,
  DEV_DLL,
  WEBPACK_PUBLIC_PATH,
} from '../config';

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

let devtool, entry, output, plugins, resolve, preLoaders, loaders;

devtool = 'inline-source-map';

entry = {
  components: [path.join(BUILD_SRC_DIR, 'components')],
  app: [path.join(BUILD_SRC_DIR, 'index.js')],
};

output = {
  path: BUILD_PUBLIC_DIR,
  publicPath: WEBPACK_PUBLIC_PATH,
  filename: '[name].js',
  chunkFilename: '[name].js',
};

const definePlugin = {
  SHA: getSHA(),
  DEVELOPMENT,
  PRODUCTION,
  TEST,
};

plugins = [
  new DedupePlugin(),
  new OccurenceOrderPlugin(),
  new VendorDllReferencePlugin(),
  new DefinePlugin(definePlugin),
  // new AggressiveMergingPlugin(),
  new CommonsChunkPlugin({
    name: 'components',
    chunks: ['components', 'app'],
  }),
  new ProvidePlugin({
    'Promise': 'exports?global.Promise!es6-promise',
    'fetch': 'exports?self.fetch!isomorphic-fetch',
  }),
];

resolve = {
  alias: {
    sinon: 'sinon/pkg/sinon.js',
  },
};

preLoaders = [
  {
    test: /\.js$/,
    loader: 'source-map-loader',
  },
];

loaders = [
  {
    test: /\.(png|jpg|svg)$/,
    loader: 'url-loader?limit=8192',
    include: [BUILD_SRC_DIR],
  },
];

if (DEVELOPMENT) {
  entry.hmr = [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
  ];

  plugins.push(
    new HotModuleReplacementPlugin(),
    new DevDllReferencePlugin()
  );

  loaders.push(
    {
      test: /\.js$/,
      loaders: ['react-hot'],
      include: [BUILD_SRC_DIR],
    }
  );
}

if (PRODUCTION) {
  devtool = 'source-map';

  plugins.push(
    new UglifyJsPlugin({ comments: false }),
    new ManifestPlugin()
  );

  output.filename = '[name]-[hash].js';
  output.chunkFilename = '[name]-[hash].js';
}

if (TEST) {
  entry = {};
  output = {};
  plugins = [
    new DefinePlugin(definePlugin),
    new TestDllReferencePlugin(),
    new VendorDllReferencePlugin(),
  ];
}

export default {
  target: 'web',
  devtool,
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
