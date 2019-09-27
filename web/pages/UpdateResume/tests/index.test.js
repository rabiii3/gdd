import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import LanguageProvider from '../../../components/LanguageProvider';
import configureStore from '../../../store/configureStore.test';
import { enhance } from '../';

describe('web | pages | UpdateResume | index', () => {
  describe('render', () => {
    it('should render', () => {
      const Component = () => <div />;
      const EnhancedComponent = enhance(Component);
      const state = {
        auth:{
          user:{},
          token:"token",
        },
        config:{
          tenant:{
            key: "key",
          }
        },
        people:{},
        resumes:{},
        comments:{},
        language: { locale: 'en' }
      };
      const store = configureStore(state);
      const history = createBrowserHistory();
      const match = { params: { id: 1 } };

      const wrapper = mount(
        <Provider store={store}>
          <LanguageProvider messages={{}} >
            <Router history={history}>
              <EnhancedComponent match={match} />
            </Router>
          </LanguageProvider>
        </Provider>,
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
