import { expect } from 'chai';
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import ContactComponent from './ContactComponent';

describe('ContactComponent', function () {
  it('works', function () {
    const instance = TestUtils.renderIntoDocument(
      <ContactComponent />
    );

    expect(instance).to.be.ok;
  });
});
