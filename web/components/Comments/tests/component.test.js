import React from 'react';
import { shallow } from 'enzyme';
import { Comments } from '..';

describe('web | components | Comments | component', () => {
  describe('render', () => {
    it('should match snapshot', () => {
      const props = {
        user: {},
        people: {},
        isEditable: "",
        setEdit: jest.fn(() => {}),
        actions: {},
        classes: {},
        comments: [],
      };
      const wrapper = shallow(<Comments {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
