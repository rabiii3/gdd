import React from 'react';
import { shallow } from 'enzyme';
import { Todo } from '../Todo';
import routes from '../../../routes';

describe('web | pages | UpdateResume | Todo', () => {
  describe('render', () => {
    it('should match snapshot', () => {
      const props = {
        classes: {},
        people: {},
        todo: true,
        comment: {
          who:[]
        },
        routes,
        isShownInComment: false, 
        isResumePage:false,
      };
      const wrapper = shallow(<Todo {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
