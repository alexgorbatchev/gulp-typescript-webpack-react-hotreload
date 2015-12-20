const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

import config, {stats} from './webpack.config.ts';

const app = new WebpackDevServer(webpack(config), {
  progress: true,
  inline: true,
  hot: true,
  historyApiFallback: true,
  publicPath: '/static/',
  contentBase: 'src',
  stats,
});

app.listen(3000, 'localhost', function() {
  process.send && process.send('express ready');

  console.log('http://localhost:3000');
  console.log('http://localhost:3000/webpack-dev-server');
});
