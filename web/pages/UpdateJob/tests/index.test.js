import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from '../../../store/configureStore.test';
import { enhance } from '..';

describe( 'app | pages | UpdateJobDescription | index', () => {
  it('should match snapshot', () => {
    const Component = () => <div/>;
    const EnhancedComponent = enhance(Component);
    const state = {
      jobDescription:{
        data:{
          '0':{
            _id: '0',
            title: 'required js dev',
            content: 'some content',
            skills: ['5d035ef378c332001b67bada', '5d035ef378c332001b67badb'],
            createdBy: '456',
            createdAt: '',
            updatedBy: '456',
            updatedAt: '',
            tenantId: '333'
          }
        },
        sort:{
          sortBy: 'TITLE',
          direction: 'desc',
        }
      },
    };

    const store = configureStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <EnhancedComponent match={{params: {id: 1}, isExact: true, path: "", url: ""}} />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});