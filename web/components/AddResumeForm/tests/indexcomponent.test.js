import React from 'react';
import { shallow } from 'enzyme';
import { AddForm } from '../';

describe('web | components | modalandform | componentindex', () => {
  describe('render', () => {
    it('should match snapshot', () => {
      const props = {
        setModal: () => {},
        isModalOpen: false,
        classes: {},
        file: [],
      };
      const wrapper = shallow(<AddForm {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
