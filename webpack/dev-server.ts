const webpack = require('webpack');
const express = require('express');
const yargs = require('yargs').argv;
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

import config from './config-app';
import stats from './stats';
import { BUILD_PUBLIC_DIR, BUILD_SRC_DIR, WEBPACK_PUBLIC_PATH } from '../config';

const app = express();
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  stats,
  noInfo: !yargs.verbose,
  publicPath: WEBPACK_PUBLIC_PATH,
}));

app.use(webpackHotMiddleware(compiler));

app.use('/fixtures', express.static(`${BUILD_SRC_DIR}/tests/fixtures`));
app.use(['/static', '/*'], express.static(BUILD_PUBLIC_DIR));

app.listen(3000, 'localhost', function() {
  if (process.send) {
    process.send('express ready');
  }

  console.log('http://localhost:3000');
  console.log('http://localhost:3000/webpack-dev-server');
});
