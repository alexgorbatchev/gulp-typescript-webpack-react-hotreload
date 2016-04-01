import { expect } from 'chai';
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import ContactContainer from './contact';

describe('ContactContainer', function () {
  it('works', function () {
    const instance = TestUtils.renderIntoDocument(
      <ContactContainer />
    );

    expect(instance).to.be.ok;
  });
});
