import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from '../../../store/configureStore.test';
import { enhance } from '..';

describe( 'app | components | SaveJobDescription | index', () => {
  it('should match snapshot', () => {
    const Component = () => <div/>;
    const EnhancedComponent = enhance(Component);
    const state = {
      skills:{
        data:{
          '5d035ef378c332001b67bada':{
            _id: '5d035ef378c332001b67bada',
            label: 'DevOps',
          },
          '5d035ef378c332001b67badb':{
            _id: '5d035ef378c332001b67badb',
            label: 'React JS',
          }
        }
      },
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
        <Router>
         <EnhancedComponent />
        </Router>
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});