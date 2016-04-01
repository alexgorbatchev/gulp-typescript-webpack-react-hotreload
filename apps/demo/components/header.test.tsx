import { expect } from 'chai';
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import Header, { HeaderKind } from './header';

describe('header', function () {
  it('works', function () {
    const instance = TestUtils.renderIntoDocument(
      <Header kind={HeaderKind.h1}>Hello!</Header>
    );

    expect(instance).to.be.ok;
  });
});
