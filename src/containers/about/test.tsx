import { expect } from 'chai';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';
import AboutContainer from './index';

describe('AboutContainer', function () {
  it('works', function () {
    const instance = TestUtils.renderIntoDocument(
      <AboutContainer />
    );
    
    expect(instance).to.be.ok;
  });
});