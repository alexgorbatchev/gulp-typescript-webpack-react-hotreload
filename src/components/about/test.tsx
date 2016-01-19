import { expect } from 'chai';
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import AboutComponent from './index';

describe('about', function () {
  it('works', function () {
    const instance = TestUtils.renderIntoDocument(
      <AboutComponent />
    );

    expect(instance).to.be.ok;
  });
});
