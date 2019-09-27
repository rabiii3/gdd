import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from '../../../store/configureStore.test';
import { enhance } from '../index';

describe('app | components | App | index', () => {
  describe('render', () => {
    it.skip('should render', () => {
      const Component = () => <div />;
      const EnhancedComponent = enhance(Component);
      const state = { language: { locale: 'en' } };
      const store = configureStore(state, null);
      const history = createBrowserHistory();
      const wrapper = mount(
        <Provider store={store}>
          <Router history={history}>
            <EnhancedComponent />
          </Router>
        </Provider>,

      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
