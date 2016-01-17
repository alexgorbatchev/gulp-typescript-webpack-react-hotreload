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
  VENDOR_MANIFEST,
  DEV_MANIFEST,
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
  app: [ path.join(SRC_DIR, 'index.tsx') ],
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
    chunks: [ 'components', 'app' ]
  }),
  new DllReferencePlugin({
    context: ROOT_DIR,
    manifest: require(VENDOR_MANIFEST),
    sourceType: 'var',
  }),
  new DllReferencePlugin({
    context: ROOT_DIR,
    manifest: require(DEV_MANIFEST),
    sourceType: 'var',
  }),
  definePlugin,
];

resolve = {
  alias: {},
  extensions: [ '', '.tsx', '.ts', '.js' ],
};

preLoaders = [
  {
    test: /\.ts(x)?$/,
    loader: 'tslint'
  },
];

loaders = [
  {
    test: /\.ts(x)?$/,
    loaders: ['react-hot', 'ts?silent'],
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

  // loaders[0].exclude = [ /.*test\.ts(x)?$/ ];

  plugins.push(
    new CommonsChunkPlugin({ name: 'hmr' }),
    new HotModuleReplacementPlugin()
  );
}

if (PRODUCTION) {
  plugins.push(
    new UglifyJsPlugin({ comments: false }),
    new ManifestPlugin({ fileName: 'app-manifest.json' })
  );

  output.filename = '[name]-[hash].js';
  output.chunkFilename = '[name]-[hash].js';
}

if (TEST) {
  devtool = '#inline-source-map';
  entry = {};
  output = {};
  plugins = [ definePlugin ];
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
