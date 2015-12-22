import { expect } from 'chai';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';
import Banner, { Kind } from '../src/components/banner';

describe('hello-karma', function () {
  it('works', function () {
    const instance = TestUtils.renderIntoDocument(
      <Banner kind={Kind.primary} />
    );
    
    console.log(instance.refs);
  });
});