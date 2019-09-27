import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from '../../../store/configureStore.test';
import { enhance } from '..';

describe( 'app | pages | AddJobDescription | index', () => {
  it('should match snapshot', () => {
    const Component = () => <div/>;
    const EnhancedComponent = enhance(Component);
    const state = {};
    const store = configureStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <EnhancedComponent />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});