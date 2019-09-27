import React from 'react';
import { shallow } from 'enzyme';
import { Page } from '..';

describe('web | pages | EmailConfirmation | index', () => {
  describe('render', () => {
    it('should match snapshot', () => {
      const props = {
        classes: {},
        tenant: { label: 'label' },
      };
      const wrapper = shallow(<Page {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
