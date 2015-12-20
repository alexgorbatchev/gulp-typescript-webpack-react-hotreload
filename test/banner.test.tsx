import { expect } from 'chai';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';
import Banner, { BannerKind, foo } from '../src/components/banner';

describe('hello-karma', function () {
  it('works', function () {
    const instance = TestUtils.renderIntoDocument(
      <Banner name="World" kind={BannerKind.primary} />
    );
    
    console.log(instance.refs);
  });

  it('banner is here too', function () {
    expect(Banner).to.be.ok;
    foo();
  });
});