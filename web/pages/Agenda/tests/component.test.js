import React from 'react';
import { shallow } from 'enzyme';
import { Page } from '..';
import { IntlProvider } from 'react-intl';

const mockedDate = new Date(2017, 11, 10);
global.Date = jest.fn(() => mockedDate);
global.Date.now = global.Date;

describe('web | pages | Agenda | index', () => {
  describe('render', () => {
    it('should match snapshot', () => {
      const intlProvider = new IntlProvider({ locale: 'en', messages: {} }, {});
      const { intl } = intlProvider.getChildContext();
      const props = {
        classes: {},
        intl: { formatMessage: jest.fn() },
        allTodo: [],
        people: {},
        resume: {},
        getEntity: jest.fn(),
      };

      const wrapper = shallow(<Page {...props} intl={intl} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
