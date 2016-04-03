const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const express = require('express');

import config from './config-app';
import stats from './stats';
import { BUILD_PUBLIC_DIR, BUILD_SRC_DIR, PUBLIC_PATH } from '../config';

const devServer = new WebpackDevServer(webpack(config), {
  progress: true,
  inline: true,
  hot: true,
  historyApiFallback: true,
  publicPath: PUBLIC_PATH,
  contentBase: BUILD_PUBLIC_DIR,
  stats,
});

devServer.use('/fixtures', express.static(`${BUILD_SRC_DIR}/test/fixtures`));

devServer.listen(3000, 'localhost', function() {
  process.send && process.send('express ready');

  console.log('http://localhost:3000');
  console.log('http://localhost:3000/webpack-dev-server');
});
