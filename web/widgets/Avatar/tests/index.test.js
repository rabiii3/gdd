import React from 'react';
import { mount } from 'enzyme';

jest.mock('../../../../lib/utils', () => ({
  getColor: () => 'red',
}));

describe('app | components | Avatar | index', () => {
  describe('render Avatar', () => {
    it('should render Avatar', () => {
      const Component = () => <div />;

      const wrapper = mount(<Component />);

      expect(wrapper).toMatchSnapshot();
    });
  });
});
