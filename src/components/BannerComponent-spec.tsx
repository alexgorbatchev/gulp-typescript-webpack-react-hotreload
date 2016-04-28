import { expect } from 'chai';
import * as React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import BannerComponent, { BannerKind } from './BannerComponent';

describe('BannerComponent', function() {
  let renderer;

  beforeEach(() => {
    renderer = createRenderer();
  });

  it('works', function() {
    renderer.render(
      <BannerComponent kind={BannerKind.primary} />
    );

    const instance = renderer.getRenderOutput();

    expect(instance).to.be.ok;
  });
});
