import {expect} from 'chai';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';
import Component, { ComponentKind, foo } from '../src/component';

describe('hello-karma', function () {
  it('works', function () {
    const instance = TestUtils.renderIntoDocument(
      <Component name="World" kind={ComponentKind.primary} />
    );
    
    console.log(instance.refs);
  });

  it('component is here too', function () {
    expect(Component).to.be.ok;
    foo();
  });
});