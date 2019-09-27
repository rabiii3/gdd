import React from 'react';
import { shallow } from 'enzyme';
import { Page } from '..';
import { IntlProvider } from 'react-intl';

describe('web | pages | People | index', () => {
  describe('render', () => {
    it('should match snapshot', () => {
      const intlProvider = new IntlProvider({ locale: 'en', messages: {} }, {});
      const { intl } = intlProvider.getChildContext();
      const props = {
        classes: {},
        people: [],
        actions: {},
        term: '',
        intl: { formatMessage: jest.fn() },
      };

      const wrapper = shallow(<Page {...props} intl={intl} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
