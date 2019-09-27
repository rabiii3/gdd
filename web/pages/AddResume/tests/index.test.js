import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import LanguageProvider from '../../../components/LanguageProvider';
import configureStore from '../../../store/configureStore.test';
import { enhance } from '../';

describe('web | pages | ResumePage | index', () => {
  describe('render', () => {
    it('should render', () => {
      const Component = () => <div />;
      const EnhancedComponent = enhance(Component);
      const state = { language: { locale: 'en' } };
      const store = configureStore(state);
      const history = createBrowserHistory();

      const wrapper = mount(
        <Provider store={store}>
          <LanguageProvider messages={{}}>
            <Router history={history}>
              <EnhancedComponent />
            </Router>
          </LanguageProvider>
        </Provider>,
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
