import { expect } from 'chai';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';
import Header, { Kind } from './header';

describe('header', function () {
  it('works', function () {
    const instance = TestUtils.renderIntoDocument(
      <Header kind={Kind.h1}>Hello!</Header>
    );
    
    expect(instance).to.be.ok;
  });
});