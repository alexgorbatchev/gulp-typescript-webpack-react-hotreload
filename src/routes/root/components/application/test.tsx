import { expect } from 'chai';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';
import Application from './index';

describe('application', function () {
  it('works', function () {
    const instance = TestUtils.renderIntoDocument(
      <Application />
    );
    
    expect(instance).to.be.ok;
  });
});