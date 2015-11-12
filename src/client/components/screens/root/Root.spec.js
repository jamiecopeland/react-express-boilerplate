"use strict"

import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { renderIntoDocument, Simulate } from 'react-addons-test-utils';
import sinon from 'sinon/pkg/sinon';

import Root from './Root';

describe('Root', function(){
  let renderer;
  let dom;

  beforeEach(() => {
    renderer = renderIntoDocument(<Root/>);
    dom = ReactDOM.findDOMNode(renderer);
  })

  it('should have a root level element with a class name Root', function(){
    expect(dom.getAttribute('class')).to.equal('Root');
  });
});