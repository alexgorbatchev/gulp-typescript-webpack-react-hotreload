import { expect } from 'chai';
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import ApplicationContainer from './ApplicationContainer';

describe('ApplicationContainer', function () {
  it('works', function () {
    const instance = TestUtils.renderIntoDocument(
      <ApplicationContainer />
    );

    expect(instance).to.be.ok;
  });
});
