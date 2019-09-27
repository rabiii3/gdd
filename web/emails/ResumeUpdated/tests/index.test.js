import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import configureStore from '../../../store/configureStore.test';
import { shallow } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { enhance } from '..';

describe('web | pages | EmailConfirmation | index', () => {
  describe('render', () => {
    it('should emailConfirmation render', () => {
      const theme = createMuiTheme({
        typography: {
          useNextVariants: true,
        },
      });
      const Component = () => <div />;
      const EnhancedComponent = enhance(Component);
      const history = createBrowserHistory();
      const state = { language: { locale: 'en' } };
      const store = configureStore(state);

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
