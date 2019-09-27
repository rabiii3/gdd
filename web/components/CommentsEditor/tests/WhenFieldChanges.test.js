import React from 'react';
import { shallow } from 'enzyme';
import WhenFieldChanges from '../WhenFieldChanges';

describe('web | components | CommentsEditor | WhenFieldChanges', () => {
  describe('render', () => {
    it('should match snapshot', () => {
      
      const props = {
        field: 'test',
        becomes: 'none',
        set: 'result',
        to: {},
      };

      const wrapper = shallow(<WhenFieldChanges {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});