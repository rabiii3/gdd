import React from 'react';
import { shallow } from 'enzyme';
import { Component } from '..';
import { Component as UserResumes } from '../Resumes';
import { IntlProvider } from 'react-intl';

describe('web | components | Person | index ', () => {
  describe('render', () => {
    it('should match snapshot', () => {
      const intlProvider = new IntlProvider({ locale: 'en', messages: {} }, {});
      const { intl } = intlProvider.getChildContext();
      const props = {
        classes: {},
        person: {},
        resumes: [],
        isFromDisabled: true,
        disableEditMode: jest.fn(() => {}),
        actions: {},
        isLoggedPerson: false,
        isAdmin: false,
      };
      const wrapper = shallow(<Component {...props} intl={intl} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});

describe('web | components | Person |Resumes', () => {
  describe('render', () => {
    it('should match snapshot', () => {
      const props = {
        classes: {},
        resumes: [],
        person: {},
        actions: {},
      };
      const wrapper = shallow(<UserResumes {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
