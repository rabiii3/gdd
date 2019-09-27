import React from 'react';
import { shallow } from 'enzyme';
import { Component } from '..';
import { IntlProvider } from 'react-intl';

const intlProvider = new IntlProvider({ locale: 'en', messages: {} }, {});
const { intl } = intlProvider.getChildContext();

describe('web | components | Snackbar | component', () => {
  describe('render', () => {
    it('should match snapshot', () => {
      const props = {
        actions: {},
        classes: {},
        error: { type: 'TYPE' },
        intl: { formatMessage: jest.fn() },
      };
      const wrapper = shallow(<Component {...props} intl={intl}  />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
