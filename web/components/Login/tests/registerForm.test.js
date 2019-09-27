import React from 'react';
import { mount } from 'enzyme';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { enhance } from '../Register';
import configureStore from '../../../store/configureStore.test';
import { Provider } from 'react-redux';

describe('app | components | registerForm ', () => {
  describe('render', () => {
    it('should registerForm render', () => {
      const theme = createMuiTheme({
        typography: {
          useNextVariants: true,
        },
      });
      const Component = () => <div />;
      const EnhancedComponent = enhance(Component);
      const state = { auth: {} };
      const store = configureStore(state);
      const history = createBrowserHistory();

      const wrapper = mount(
        <MuiThemeProvider theme={theme}>
          <Provider store={store}>
            <Router history={history}>
              <EnhancedComponent />
            </Router>
          </Provider>
        </MuiThemeProvider>,
      );

      expect(wrapper).toMatchSnapshot();
    });
  });
});
