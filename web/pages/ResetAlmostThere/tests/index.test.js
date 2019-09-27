import React from 'react';
import { mount } from 'enzyme';
import { Router } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { enhance } from '../';
import configureStore from '../../../store/configureStore.test';

describe('web | pages | RegisterAlmostThere | index', () => {
  describe('render', () => {
    it('should render', () => {
      const Component = () => <div />;
      const EnhancedComponent = enhance(Component);
      const theme = createMuiTheme({
        typography: {
          useNextVariants: true,
        },
      });
      const history = createBrowserHistory();
      const initialState = { auth: { token: 'TOKEN' } };
      const store = configureStore(initialState);
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
