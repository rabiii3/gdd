import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import configureStore from '../../../store/configureStore.test';
import { enhance } from '../';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import LanguageProvider from '../../../components/LanguageProvider';

describe('web | pages | People | index', () => {
  describe('render', () => {
    it('should render', () => {
      const Component = () => <div />;
      const EnhancedComponent = enhance(Component);
      const state = { language: { locale: 'en' } };
      const history = createBrowserHistory();
      const theme = createMuiTheme({
        typography: {
          useNextVariants: true,
        },
      });
      const store = configureStore(state);

      const wrapper = mount(
        <MuiThemeProvider theme={theme}>
          <Provider store={store}>
            <LanguageProvider messages={{}}>
              <Router history={history}>
                <EnhancedComponent />
              </Router>
            </LanguageProvider>
          </Provider>
        </MuiThemeProvider>,
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
