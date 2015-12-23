import { expect } from 'chai';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';
import Banner, { Kind } from './banner';

describe('banner', function () {
  it('works', function () {
    const instance = TestUtils.renderIntoDocument(
      <Banner kind={Kind.primary} />
    );
    
    expect(instance).to.be.ok;
  });
});