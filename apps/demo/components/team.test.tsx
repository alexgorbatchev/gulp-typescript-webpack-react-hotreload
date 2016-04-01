import { expect } from 'chai';
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import Team from './team';

describe('team', function () {
  it('works', function () {
    const instance = TestUtils.renderIntoDocument(
      <Team />
    );

    expect(instance).to.be.ok;
  });
});
