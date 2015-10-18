var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server',
    './src/client/index.tsx'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    alias: {},
    extensions: ['', '.tsx', '.ts', '.js']
  },
  module: {
    preLoaders: [
      {
        test: /\.ts(x)?$/,
        loader: 'tslint'
      }
    ],
    loaders: [
      {
        test: /\.ts(x)?$/,
        loaders: ['react-hot', 'ts-loader'],
        include: path.join(__dirname, 'src', 'client')
      }
    ]
  }
};
