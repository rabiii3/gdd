import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { enhance } from '../';
import LanguageProvider from '../../../components/LanguageProvider';
import configureStore from '../../../store/configureStore.test';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

describe('web | components | Person | index ', () => {
  describe('render', () => {
    it('should render', () => {
      const Component = () => <div />;
      const EnhancedComponent = enhance(Component);
      const theme = createMuiTheme({
        typography: {
          useNextVariants: true,
        },
      });
      const state = { language: { locale: 'en' } };
      const store = configureStore(state);
      const wrapper = mount(
        <MuiThemeProvider theme={theme}>
          <Provider store={store}>
            <LanguageProvider messages={{}}>
              <EnhancedComponent />
            </LanguageProvider>
          </Provider>
        </MuiThemeProvider>,
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
