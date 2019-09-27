import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import configureStore from '../../../store/configureStore.dev';
import { enhance } from '../';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

describe('web | pages | Person | index', () => {
  describe('render', () => {
    it.skip('should render', () => {
      const Component = () => <div />;
      const EnhancedComponent = enhance(Component);
      const state = { language: { locale: 'en' } };
      const store = configureStore(state, null);
      const theme = createMuiTheme({
        typography: {
          useNextVariants: true,
        },
      });

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
