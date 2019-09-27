import React from 'react';
import { shallow } from 'enzyme';
import { Page } from '..';
import routes from '../../../routes';

describe('web | pages | Person | index', () => {
  describe('render', () => {
    it('should match snapshot', () => {
      const props = {
        classes: {},
        match: { params: {} },
        people: {},
        resumes: [],
        isFromDisabled: true,
        disableEditMode: jest.fn(() => {}),
        actions: {},
        routes,
      };

      const wrapper = shallow(<Page {...props} routes={routes} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
