var path = require('path');
var webpack = require('webpack');
var common = require('./webpack.common');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server',
    common.entry.app,
  ],
  output: {
    path: common.output.path,
    publicPath: common.output.publicPath,
    filename: 'app.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: common.resolve,
  module: {
    preLoaders: [
      common.preLoaders.react,
    ],
    loaders: [
      common.loaders.react,
      {
        test: /[.]html$/,
        loader: 'file'
      }
    ]
  }
};
