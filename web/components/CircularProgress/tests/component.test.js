import React from 'react';
import { shallow } from 'enzyme';
import CircularProgress from '@material-ui/core/CircularProgress';

import Component from '../component';

describe('app | components | CircularProgress | component', () => {
  // given
  const props = {
    classes: {
      root: {},
    },
  };
  describe('defined', () => {
    it('should be defined', () => {
      // given
      const wrapper = shallow(<Component {...props} />);

      // then
      expect(wrapper).toBeDefined();
    });
  });
  describe('snapshot', () => {
    it('should match snapshot', () => {
      // given
      const wrapper = shallow(<Component {...props} />);

      // then
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('render', () => {
    it('should find a CircularProgress', () => {
      // given
      const wrapper = shallow(<Component {...props} />);
      const component = wrapper.find(CircularProgress);

      // then
      expect(component).toHaveLength(1);
    });
    describe('CircularProgress', () => {
      it('should have a size property', () => {
        // given
        const wrapper = shallow(<Component {...props} />);
        const prop = 'size';
        const expectedValue = 50;
        const property = wrapper.find(CircularProgress).prop(prop);

        // then
        expect(property).toEqual(expectedValue);
      });
    });
  });
});
