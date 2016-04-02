import { expect } from 'chai';
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import ApplicationComponent from './ApplicationComponent';

describe('ApplicationComponent', function() {
  it('works', function() {
    const instance = TestUtils.renderIntoDocument(
      <ApplicationComponent />
    );

    expect(instance).to.be.ok;
  });
});
