require('ts-node/register');

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
  stats: config.stats,
});

app.listen(3000, 'localhost', function() {
  process.send && process.send('express ready');

  console.log('http://localhost:3000');
  console.log('http://localhost:3000/webpack-dev-server');
});
