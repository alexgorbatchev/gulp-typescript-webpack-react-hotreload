import {expect} from 'chai';
import App from '../../src/client/app';

describe('hello-karma', function () {
  it('works', function () {
    expect(true).to.be.true;
  });

  it('app is here too', function () {
    expect(App).to.be.ok;
  });
});