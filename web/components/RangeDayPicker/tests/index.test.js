import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import LanguageProvider from '../../../components/LanguageProvider';
import configureStore from '../../../store/configureStore.test';
import { enhance } from '../';

describe('web | components | RangeDayPicker | index', () => {
  describe('render', () => {
    it('should render', () => {
      const Component = () => <div />;
      const EnhancedComponent = enhance(Component);
      const state = { language: { locale: 'en' } };
      const store = configureStore(state, null);

      const wrapper = mount(
        <Provider store={store}>
          <LanguageProvider messages={{}}>
              <EnhancedComponent />
          </LanguageProvider>
        </Provider>,
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
