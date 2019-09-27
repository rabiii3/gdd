import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from '../../../store/configureStore.test';
import NoAuth from '..';

describe.skip('app | component | NoAuth', () => {
  it('should render children', done => {
    const Component = () => <div />;
    const initialState = { auth: { token: 'TOKEN' } };
    const hook = {
      ['@@router/LOCATION_CHANGE']: () => {
        done();
      },
    };
    const store = configureStore(initialState, hook);
    const wrapper = mount(
      <Provider store={store}>
        <NoAuth>
          <Component />
        </NoAuth>
      </Provider>,
    );
  });
});
