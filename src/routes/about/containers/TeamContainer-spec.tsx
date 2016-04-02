import { expect } from 'chai';
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import TeamContainer from './TeamContainer';

describe('TeamContainer', function () {
  it('works', function () {
    const instance = TestUtils.renderIntoDocument(
      <TeamContainer />
    );

    expect(instance).to.be.ok;
  });
});
