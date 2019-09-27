import React from 'react';
import { shallow } from 'enzyme';
import { Page } from '..';
import { IntlProvider } from 'react-intl';

const intlProvider = new IntlProvider({ locale: 'en', messages: {} }, {});
const { intl } = intlProvider.getChildContext();

describe('web | components | AddResume | component', () => {
  describe('render', () => {
    it('should match snapshot', () => {
      const props = {
        classes: {},
        actions: { goHome: new Function() },
        location: { state: { file: {} } },
        intl: {
          formatMessage: jest.fn()
        },
      };
      const wrapper = shallow(<Page {...props} intl={intl} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
