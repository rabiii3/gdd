import React from 'react';
import { shallow } from 'enzyme';
import { Component } from '..';
import routes from '../../../../routes';

describe('web | components | Person | index ', () => {
  describe('render', () => {
    it('should match snapshot', () => {
      const props = {
        classes: {},
        people: {},
        routes: {},
        resumesCount: 0,
        actions: {
          addQueryPeople: jest.fn(() => { }),
        },
      };
      const wrapper = shallow(<Component {...props} routes={routes} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});