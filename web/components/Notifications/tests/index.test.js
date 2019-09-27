import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from '../../../store/configureStore.test';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { enhance } from '../';

describe('web | pages | Notifications | index', () => {
  describe('render', () => {
    it('should render', () => {
      const Component = () => <div />;
      const EnhancedComponent = enhance(Component);
      const theme = createMuiTheme({
        typography: {
          useNextVariants: true,
        },
      });
      const state = { };
      const store = configureStore(state);
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
