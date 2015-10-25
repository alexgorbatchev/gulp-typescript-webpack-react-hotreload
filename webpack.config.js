var path = require('path');
var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');

var devtool, entry, output, plugins, resolve, preLoaders, loaders;

var PRODUCTION = process.env.NODE_ENV === 'production';
var TEST = process.env.NODE_ENV === 'test';
var DEVELOPMENT = !PRODUCTION && !TEST;

devtool = 'source-map';

entry = {
  vendor: ['react', 'radium'],
  app: [path.join(__dirname, 'src', 'app', 'index.tsx')],
};

output = {
  path: path.join(__dirname, 'build', 'public'),
  publicPath: '/static/',
  filename: '[name].js',
  chunkFilename: '[name].js',
};

plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
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
    loaders: ['react-hot', 'ts-loader'],
    include: path.join(__dirname, 'src', 'app'),
  },
  {
    test: /\.(png|jpg|svg)$/,
    loader: 'url-loader?limit=8192'
  },
];

if (DEVELOPMENT) {
  entry.vendor.unshift(
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server'
  );
}

if (PRODUCTION) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({ comments: false }),
    new ManifestPlugin()
  );

  output.filename = '[name]-[hash].js';
  output.chunkFilename = '[name]-[hash].js';
}

if (TEST) {
  devtool = 'inline-source-map';
  entry = {};
  output = {};

  preLoaders.push({
    test: /\.ts(x)?$/,
    exclude: /(test|node_modules|bower_components)\//,
    loader: 'isparta-instrumenter',
  });
}

module.exports = {
  devtool: devtool,
  entry: entry,
  output: output,
  plugins: plugins,
  resolve: resolve,
  module: {
    preLoaders: preLoaders,
    loaders: loaders,
  }
};
