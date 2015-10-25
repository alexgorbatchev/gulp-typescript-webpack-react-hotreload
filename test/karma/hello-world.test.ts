import {expect} from 'chai';
import App, {foo} from '../../src/client/app';

describe('hello-karma', function () {
  it('works', function () {
    foo();
    expect(true).to.be.false;
  });

  it('app is here too', function () {
    expect(App).to.be.ok;
  });
});