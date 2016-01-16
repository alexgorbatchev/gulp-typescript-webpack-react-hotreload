import { expect } from 'chai';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';
import ContactContainer from './index';

describe('ContactContainer', function () {
  it('works', function () {
    const instance = TestUtils.renderIntoDocument(
      <ContactContainer />
    );
    
    expect(instance).to.be.ok;
  });
});