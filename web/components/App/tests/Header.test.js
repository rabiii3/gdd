import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { enhance } from '../Header';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import configureStore from '../../../store/configureStore.test';

describe('app | components | App | index', () => {
  describe('render', () => {
    it('should render', () => {
      const Component = () => <div />;
      const EnhancedComponent = enhance(Component);
      const theme = createMuiTheme({
        typography: {
          useNextVariants: true,
        },
      });
      const state = { language: { locale: 'en' } };
      const store = configureStore(state, null);
      const history = createBrowserHistory();

      const wrapper = mount(
        <Provider store={store}>
          <MuiThemeProvider theme={theme}>
            <Router history={history}>
              <EnhancedComponent />
            </Router>
          </MuiThemeProvider>
        </Provider>,
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});

