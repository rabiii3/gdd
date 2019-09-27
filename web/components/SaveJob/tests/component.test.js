import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore  from '../../../store/configureStore.test';
import { SaveJobDescription } from '..';

describe( 'app | components | SaveJobDescription | component', () => {
  it('should match snapshot', () => {
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
    const props = {
      classes:{},
      history:{},
      jobDescription:{}, 
      skills:{}, 
      isEditMode:false, 
      setEditMode:jest.fn(), 
      allSkills:[],
      addJob:jest.fn(),
      updateJob:jest.fn(),
    };
    const store = configureStore(state);
      const wrapper = shallow(
        <Provider store={store}>
          <SaveJobDescription {...props} />
        </Provider>,
      );
      expect(wrapper).toMatchSnapshot();
  });
});