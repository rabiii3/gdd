import React from 'react';
import { mount } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { enhance } from '..';

describe('app | components | LoginForm | index', () => {
  describe('render', () => {
    it('should index render', () => {
      const theme = createMuiTheme({
        typography: {
          useNextVariants: true,
        },
      });
      const Component = () => <div />;
      const EnhancedComponent = enhance(Component);
      const store = createStore(new Function());

      const wrapper = mount(
        <MuiThemeProvider theme={theme}>
          <Provider store={store}>
            <EnhancedComponent />
          </Provider>
        </MuiThemeProvider>,
      );

      expect(wrapper).toMatchSnapshot();
    });
  });
});
