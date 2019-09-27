import React from 'react';
import { shallow } from 'enzyme';
import { ResumeForm } from '../Form';

describe('web | components | modalandform | componentindex', () => {
  describe('render', () => {
    it('should match snapshot', () => {
      const props = {
        classes: {},
        file: [],
        addForm: () => {},
        setModal: () => {},
      };
      const wrapper = shallow(<ResumeForm {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
