import { expect } from 'chai';
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import TeamComponent from './TeamComponent';

describe('TeamComponent', function() {
  it('works', function() {
    const instance = TestUtils.renderIntoDocument(
      <TeamComponent />
    );

    expect(instance).to.be.ok;
  });
});
