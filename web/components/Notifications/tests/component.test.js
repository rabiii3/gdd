import React from 'react';
import { shallow } from 'enzyme';
import { Component } from '..';

describe('web | components | People | index ', () => {
  describe('render', () => {
    it('should match snapshot', () => {
      const props = {
        classes: {},
        notifications: [],
        onClose: jest.fn(),
        getEntity: jest.fn(),
        people: {}
      };
      const wrapper = shallow(<Component {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
