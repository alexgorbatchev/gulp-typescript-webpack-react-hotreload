import { expect } from 'chai';
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import Contact from './contact';

describe('contact', function () {
  it('works', function () {
    const instance = TestUtils.renderIntoDocument(
      <Contact />
    );

    expect(instance).to.be.ok;
  });
});
