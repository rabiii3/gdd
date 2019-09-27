import React from 'react';
import { shallow } from 'enzyme';
import { IntlProvider } from 'react-intl';
import { RangeDayPicker } from '../index';

describe('web | components | RangeDayPicker | component', () => {
  const intlProvider = new IntlProvider({ locale: 'en', messages: {} }, {});
  const { intl } = intlProvider.getChildContext();
  describe('render', () => {
    it('should match snapshot', () => {
      const props = {
        classes: {},
        handleStatisticsDates: jest.fn(() => { }),
        initialState: {},
        setShowFilter: jest.fn(() => { }),
        setCloseFilter: jest.fn(() => { }),
        filter: {},
        intl: {
          formatMessage: jest.fn()
        },
      };
      const wrapper = shallow(<RangeDayPicker {...props}/>);
      //expect(wrapper).toMatchSnapshot();
    });
  });
});
