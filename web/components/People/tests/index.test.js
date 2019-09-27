import React from 'react';
import { mount } from 'enzyme';
import { enhance } from '../';

describe('web | components | People | index ', () => {
  describe('render', () => {
    it('should render', () => {
      const Component = () => <div />;
      const EnhancedComponent = enhance(Component);
      const wrapper = mount(<EnhancedComponent />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
