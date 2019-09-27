import React from 'react';
import { shallow } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import configureStore from '../../../store/configureStore.test';
import { enhance } from '..';

describe('web | pages | ResendLogin | index', () => {
  describe('render', () => {
    it('should resendLogin render', () => {
      const theme = createMuiTheme({
        typography: {
          useNextVariants: true,
        },
      });
      const Component = () => <div />;
      const EnhancedComponent = enhance(Component);
      const state = {
        auth: {},
      };

      const store = configureStore(state, null);

      const wrapper = shallow(
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
