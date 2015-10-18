var path = require('path');
var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');
var common = require('./webpack.common');

module.exports = {
  devtool: 'source-map',
  entry: {
    vendor: ['react'],
    app: common.entry.app
  },
  output: {
    path: common.output.path,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[hash].js',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ comments: false }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: '[name]-[hash].js' }),
    new ManifestPlugin(),
  ],
  resolve: common.resolve,
  module: {
    preLoaders: [
      common.preLoaders.react,
    ],
    loaders: [
      common.loaders.react,
      {
        test: /[/]images[/]/,
        loader: 'file?name=[path][name]-[hash].[ext]'
      }
    ]
  },
};
