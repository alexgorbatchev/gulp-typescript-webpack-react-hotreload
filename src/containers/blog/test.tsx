import { expect } from 'chai';
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import BlogContainer from './index';

describe('BlogContainer', function () {
  it('works', function () {
    const instance = TestUtils.renderIntoDocument(
      <BlogContainer />
    );

    expect(instance).to.be.ok;
  });
});
