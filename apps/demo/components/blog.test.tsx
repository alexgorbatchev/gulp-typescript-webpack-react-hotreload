import { expect } from 'chai';
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import Blog from './blog';

describe('blog', function () {
  it('works', function () {
    const instance = TestUtils.renderIntoDocument(
      <Blog />
    );

    expect(instance).to.be.ok;
  });
});
