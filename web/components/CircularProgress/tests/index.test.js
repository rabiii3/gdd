import React from 'react';
import { mount } from 'enzyme';
import { enhance } from '../index';

describe('app | components | LinearProgress | index', () => {
  describe('render', () => {
    describe('should inject classes property to component', () => {
      it('should find root property in classes', () => {
        // given
        const Component = () => <div />;
        const EnhancedComponent = enhance(Component);
        const expectedProperty = 'classes';
        const expectedClassesProperty = 'root';

        // when
        const wrapper = mount(<EnhancedComponent />);

        // then
        expect(wrapper.find(Component).prop(expectedProperty)).toHaveProperty(expectedClassesProperty);
      });
    });
  });
});
