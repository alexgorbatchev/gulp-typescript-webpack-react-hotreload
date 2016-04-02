import { expect } from 'chai';
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import HeaderComponent, { HeaderKind } from './HeaderComponent';

describe('HeaderComponent', function() {
  it('works', function() {
    const instance = TestUtils.renderIntoDocument(
      <HeaderComponent kind={HeaderKind.h1}>Hello!</HeaderComponent>
    );

    expect(instance).to.be.ok;
  });
});
