import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from '../../../store/configureStore.test';
import { enhance } from '..';

describe( 'app | pages | JobDescription | index', () => {
  it('should match snapshot', () => {
    const Component = () => <div/>;
    const EnhancedComponent = enhance(Component);
    const state = {
      auth:{
        user:{
          _id: '123',
          firstname: 'user',
          lastname: 'user',
          locale: 'en',
        }
      },
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
      people:{
        data:{
          '456':{
            _id: '456',
            roles: ['admin'],
            firstname: 'test',
            lastname: 'tester',
          }
        }
      }
    };
    const store = configureStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <EnhancedComponent />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});