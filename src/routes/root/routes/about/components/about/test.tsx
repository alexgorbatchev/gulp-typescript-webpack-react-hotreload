import { expect } from 'chai';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';
import About from './index';

describe('about', function () {
  it('works', function () {
    const instance = TestUtils.renderIntoDocument(
      <About />
    );
    
    expect(instance).to.be.ok;
  });
});