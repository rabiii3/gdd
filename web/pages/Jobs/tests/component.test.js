import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore  from '../../../store/configureStore.test';
import { JobDescription } from '..';

describe( 'app | pages | JobDescription | component', () => {
  it('should match snapshot', () => {
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
    const props = {
      classes:{}, 
      history:{}, 
      routes:{}, 
      user:{}, 
      sortedJobs:[], 
      skills:{}, 
      selectedJob:"", 
      handleSelectedJob:jest.fn(), 
      sortJobs:jest.fn(),
      deleteJob:jest.fn(),
      sortMode:{},
      people:{},
    };
    const store = configureStore(state);
      const wrapper = shallow(
        <Provider store={store}>
          <JobDescription {...props} />
        </Provider>,
      );
      expect(wrapper).toMatchSnapshot();
  });
});