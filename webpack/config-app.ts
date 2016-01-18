import * as path from 'path';
import { execSync } from 'child_process';
import stats from './stats';

import {
  PRODUCTION,
  TEST,
  DEVELOPMENT,
  SRC_DIR,
  ROOT_DIR,
  BUILD_DIR,
  VENDOR_DLL,
  DEV_DLL,
  APP_MANIFEST,
  PUBLIC_PATH,
} from '../config';

const ManifestPlugin = require('webpack-manifest-plugin');

const {
  DllReferencePlugin,
  DefinePlugin,
  HotModuleReplacementPlugin,
  optimize: {
    UglifyJsPlugin,
    DedupePlugin,
    OccurenceOrderPlugin,
    CommonsChunkPlugin,
  },
} = require('webpack');

let devtool, entry, output, plugins, resolve, preLoaders, loaders;

devtool = 'source-map';

entry = {
  components: './src/components',
  app: [path.join(SRC_DIR, 'index.tsx')],
};

output = {
  path: BUILD_DIR,
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
    chunks: ['components', 'app']
  }),
  definePlugin,
];

resolve = {
  alias: {
    sinon: 'sinon/pkg/sinon.js',
  },
  extensions: ['', '.tsx', '.ts', '.js'],
};

preLoaders = [
  {
    test: /\.ts(x)?$/,
    loader: 'tslint'
  },
];

loaders = [
  {
    test: /sinon/,
    loader: 'imports?define=>false,require=>false',
  },
  {
    test: /\.ts(x)?$/,
    loaders: ['react-hot', 'ts?silent'],
    include: [SRC_DIR],
  },
  {
    test: /\.(png|jpg|svg)$/,
    loader: 'url-loader?limit=8192',
    include: [SRC_DIR],
  },
];

if (DEVELOPMENT) {
  entry.hmr = [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server'
  ];

  // loaders[0].exclude = [ /.*test\.ts(x)?$/ ];

  plugins.push(
    new HotModuleReplacementPlugin(),
    new CommonsChunkPlugin({ name: 'hmr' })
  );
}

if (PRODUCTION) {
  plugins.push(
    new ManifestPlugin({ fileName: path.relative(BUILD_DIR, APP_MANIFEST) }),
    new UglifyJsPlugin({ comments: false })
  );

  output.filename = '[name]-[hash].js';
  output.chunkFilename = '[name]-[hash].js';
}

if (!TEST) {
  plugins.push(
    new DllReferencePlugin({
      context: ROOT_DIR,
      manifest: require(VENDOR_DLL),
      sourceType: 'var',
    }),
    new DllReferencePlugin({
      context: ROOT_DIR,
      manifest: require(DEV_DLL),
      sourceType: 'var',
    })
  );
}

if (TEST) {
  devtool = '#inline-source-map';
  entry = {};
  output = {};
  plugins = [definePlugin];
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
