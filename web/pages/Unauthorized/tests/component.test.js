import React from 'react';
import { shallow } from 'enzyme';
import { Page } from '..';
import routes from '../../../routes';

describe('web | pages | Unauthorized | index', () => {
  describe('render', () => {
    it('should match snapshot', () => {
      const props = {
        classes: {},
        routes,
      };
      const wrapper = shallow(<Page {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
