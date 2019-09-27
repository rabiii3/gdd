import React from 'react';
import { shallow } from 'enzyme';
import { Component } from '..';

describe('web | components | Peoples | index ', () => {
  describe('render', () => {
    it('should match snapshot', () => {
      const props = {
        people: [],
      };
      const wrapper = shallow(<Component {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
