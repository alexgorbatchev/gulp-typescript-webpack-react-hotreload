import { expect } from 'chai';
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import Team from './home';

describe('home', function () {
  it('works', function () {
    const instance = TestUtils.renderIntoDocument(
      <Team />
    );

    expect(instance).to.be.ok;
  });
});
