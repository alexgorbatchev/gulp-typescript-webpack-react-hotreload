/// <reference path="../../typings/tsd.d.ts" />

import * as express from 'express';

const app = express();

app.use('/', express.static(`${__dirname}/../public`));

app.listen(3000, function() {
  process.send && process.send('express ready');
  console.log('starting...')
});
