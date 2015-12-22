const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
import {execSync} from 'child_process';

let devtool, entry, output, plugins, resolve, preLoaders, loaders;

const PRODUCTION = process.env.NODE_ENV === 'production';
const TEST = process.env.NODE_ENV === 'test';
const DEVELOPMENT = !PRODUCTION && !TEST;
const SRC_DIR = path.join(__dirname, 'src');
const TEST_DIR = path.join(__dirname, 'test');

devtool = 'source-map';

entry = {
  vendor: [
    'react',
    'radium',
    'react-dom',
    'react-router',
  ],
  app: [path.join(SRC_DIR, 'index.tsx')],
};

output = {
  path: path.join(__dirname, 'build', 'public'),
  publicPath: '/static/',
  filename: '[name].js',
  chunkFilename: '[name].js',
};

plugins = [
  new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  // new webpack.optimize.AggressiveMergingPlugin(),
];

resolve = {
  alias: {},
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
    test: /\.ts(x)?$/,
    loaders: ['react-hot', 'ts?silent'],
    include: [SRC_DIR],
  },
  {
    test: /\.(png|jpg|svg)$/,
    loader: 'url-loader?limit=8192',
    include: [path.join(SRC_DIR, 'images')],
  },
];

if (DEVELOPMENT) {
  entry.vendor.unshift(
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server'
  );

  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({ VERSION: `"${process.env.NODE_ENV}"` })
  );
}

if (PRODUCTION) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({ comments: false }),
    new webpack.DefinePlugin({ VERSION: getVersion() }),
    new ManifestPlugin()
  );

  output.filename = '[name]-[hash].js';
  output.chunkFilename = '[name]-[hash].js';
}

if (TEST) {
  devtool = '#inline-source-map';
  entry = {};
  output = {};
  plugins = [];
  
  loaders[0].include.push(TEST_DIR);

  // preLoaders.push({
  //   test: /\.ts(x)?$/,
  //   exclude: /(test|node_modules|bower_components)\//,
  //   loader: 'isparta-instrumenter',
  // });
}

export let stats = {
  colors: require('gulp-util').colors.enabled,
  assets: true,
  version: true,
  timings: true,
  hash: true,
  chunks: true,
  chunkModules: false,
  errorDetails: true,
  reasons: false,
};

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

function getVersion(): string {
  const result: string = execSync('git describe --exact-match --tags HEAD 2>&1; exit 0').toString();
  const matches: Array<string> = result.match(/^fatal: no tag exactly matches '(\w+)'/);
  const sha: string = matches && matches[1];
  return JSON.stringify(sha || result.replace(/\n/g, ''));
}
