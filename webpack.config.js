var path = require('path');
var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');

var devtool, entry, output, plugins, resolve, preLoaders, loaders;

var PRODUCTION = process.env.NODE_ENV === 'production';
var DEVELOPMENT = !PRODUCTION;

devtool = 'source-map';

entry = {
  vendor: ['react', 'radium'],
  app: ['./src/client/index.tsx'],
};

if (DEVELOPMENT) {
  entry.vendor.unshift(
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server'
  );
}

output = {
  path: path.join(__dirname, 'build', 'public'),
  publicPath: '/static/',
  filename: PRODUCTION ? '[name]-[hash].js' : '[name].js',
  chunkFilename: PRODUCTION ? '[name]-[hash].js' : '[name].js',
};

plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
];

if (PRODUCTION) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({ comments: false }));
  plugins.push(new ManifestPlugin());
}

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
    include: path.join(__dirname, 'src', 'client'),
  },
];

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
