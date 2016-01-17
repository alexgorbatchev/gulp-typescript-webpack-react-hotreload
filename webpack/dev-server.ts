const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

import config from './config-app';
import stats from './stats';
import { BUILD_DIR, PUBLIC_PATH } from '../config';

const app = new WebpackDevServer(webpack(config), {
  progress: true,
  inline: true,
  hot: true,
  historyApiFallback: true,
  publicPath: PUBLIC_PATH,
  contentBase: BUILD_DIR,
  stats,
});

app.listen(3000, 'localhost', function() {
  process.send && process.send('express ready');

  console.log('http://localhost:3000');
  console.log('http://localhost:3000/webpack-dev-server');
});
