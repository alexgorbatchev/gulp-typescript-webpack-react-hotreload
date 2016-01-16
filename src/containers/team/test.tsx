import { expect } from 'chai';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';
import TeamContainer from './index';

describe('TeamContainer', function () {
  it('works', function () {
    const instance = TestUtils.renderIntoDocument(
      <TeamContainer />
    );
    
    expect(instance).to.be.ok;
  });
});