import {expect} from 'chai';
import Component, {foo} from '../src/component';

describe('hello-karma', function () {
  it('works', function () {
    foo();
    expect(true).to.be.false;
  });

  it('component is here too', function () {
    expect(Component).to.be.ok;
  });
});