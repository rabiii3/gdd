import React from 'react';
import { mount } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import configureStore from '../../../store/configureStore.test';
import { enhance } from '..';

describe('app | pages | | forgetPassword | index', () => {
  it('should render', () => {
    const theme = createMuiTheme({
      typography: {
        useNextVariants: true,
      },
    });
    const Component = () => <div />;
    const EnhancedComponent = enhance(Component);
    const state = { auth: {} };
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
