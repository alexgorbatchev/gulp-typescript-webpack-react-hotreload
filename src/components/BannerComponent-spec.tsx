import { expect } from 'chai';
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import BannerComponent, { BannerKind } from './BannerComponent';

describe('BannerComponent', function () {
  it('works', function () {
    const instance = TestUtils.renderIntoDocument(
      <BannerComponent kind={BannerKind.primary} />
    );

    expect(instance).to.be.ok;
  });
});
