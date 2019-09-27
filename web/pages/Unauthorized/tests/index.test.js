import React from 'react';
import { mount } from 'enzyme';
import { Router } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { createBrowserHistory } from 'history';
import { enhance } from '../';

describe('web | pages | Unauthorized | index', () => {
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
      const wrapper = mount(
        <MuiThemeProvider theme={theme}>
          <Router history={history}>
            <EnhancedComponent />
          </Router>
        </MuiThemeProvider>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
