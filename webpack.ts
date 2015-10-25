/// <reference path="typings/tsd.d.ts" />

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

const app = new WebpackDevServer(webpack(config), {
  progress: true,
  inline: true,
  hot: true,
  historyApiFallback: true,
  publicPath: '/static/',
  contentBase: 'src/public',
  stats: { colors: true },
});

app.listen(3001, 'localhost', function() {
  process.send && process.send('express ready');

  console.log('http://localhost:3001');
  console.log('http://localhost:3001/webpack-dev-server');
});
