import { expect } from 'chai';
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import BlogComponent from './BlogComponent';

describe('BlogComponent', function() {
  it('works', function() {
    const instance = TestUtils.renderIntoDocument(
      <BlogComponent />
    );

    expect(instance).to.be.ok;
  });
});
