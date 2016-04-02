import * as chai from 'chai';
import { expect } from 'chai';
import jsxChai from 'jsx-chai';

require('mocha-clean');

require('source-map-support').install({
  environment: 'node'
});

global['DEVELOPMENT'] = false;
global['TEST'] = true;

chai.use(jsxChai);
chai.use(require('sinon-chai'));
