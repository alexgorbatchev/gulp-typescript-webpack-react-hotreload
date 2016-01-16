import { expect } from 'chai';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';
import Team from './index';

describe('team', function () {
  it('works', function () {
    const instance = TestUtils.renderIntoDocument(
      <Team />
    );
    
    expect(instance).to.be.ok;
  });
});