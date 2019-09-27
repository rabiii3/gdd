import React from 'react';
import { shallow } from 'enzyme';
import { Page } from '..';
import routes from '../../../routes';

describe('web | pages | EmailConfirmation | index', () => {
  describe('render', () => {
    it('should match snapshot', () => {
      const props = {
        classes: {},
        history: {},
        actions: {},
        routes,
      };
      const wrapper = shallow(<Page {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
