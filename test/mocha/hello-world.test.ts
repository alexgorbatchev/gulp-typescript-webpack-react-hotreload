import {expect} from 'chai';
import App from '../../src/client/app';

describe('hello-mocha', function () {
  it('works', function () {
    expect(true).to.be.false;
  });

  it('app is here too', function () {
    expect(App).to.be.ok;
  });
});