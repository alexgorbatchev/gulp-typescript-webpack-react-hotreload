import { expect } from 'chai';
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import Banner, { BannerKind } from './banner';

describe('banner', function () {
  it('works', function () {
    const instance = TestUtils.renderIntoDocument(
      <Banner kind={BannerKind.primary} />
    );

    expect(instance).to.be.ok;
  });
});
