import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore  from '../../../store/configureStore.test';
import { AddJobDescription } from '..';

describe( 'app | pages | AddJobDescription | component', () => {
  it('should match snapshot', () => {
    const state = {};
    const props = {
      classes:{},
    };
    const store = configureStore(state);
      const wrapper = shallow(
        <Provider store={store}>
          <AddJobDescription {...props} />
        </Provider>,
      );
      expect(wrapper).toMatchSnapshot();
  });
});