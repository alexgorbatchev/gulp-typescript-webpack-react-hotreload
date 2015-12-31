import { expect } from 'chai';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';
import Blog from './index';

describe('blog', function () {
  it('works', function () {
    const instance = TestUtils.renderIntoDocument(
      <Blog />
    );
    
    expect(instance).to.be.ok;
  });
});