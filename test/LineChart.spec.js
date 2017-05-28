import React from 'react';
import LineChart from '../src/LineChart';
import { mount, shallow, render } from 'enzyme';
import PropTypes from 'prop-types';

describe('(Component) Line Chart', () => {
  let _component;

  beforeEach(() => {
    _component = shallow(<LineChart height={100} width={800} title="Graph" />);
  })

  it('Should exist.', () => {
    expect(_component).to.exist
  })
  describe('(Props)', () => {
    it('(Optional) Could have a height property.', () => {
      expect( _component.props().height ).to.be.defined;
    })
    it('(Optional) Could a title property.', () => {
      expect( _component.props().title ).to.be.defined;
    })
  })


})
