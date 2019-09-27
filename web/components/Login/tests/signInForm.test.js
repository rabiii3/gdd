import React from 'react';
import { shallow } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import configureStore from '../../../store/configureStore.dev';
import { createBrowserHistory } from 'history';
import { enhance } from '../SignIn';

describe('app | components | signInForm', () => {
  describe('render', () => {
    it('should signInForm render', () => {
      const theme = createMuiTheme({
        typography: {
          useNextVariants: true,
        },
      });
      const Component = () => <div />;
      const EnhancedComponent = enhance(Component);
      const state = { auth: {} };
      const hook = {};
      const store = configureStore(state, hook);
      const history = createBrowserHistory();

      const wrapper = shallow(
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
