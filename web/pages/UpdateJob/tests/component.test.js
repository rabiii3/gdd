import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore  from '../../../store/configureStore.test';
import { UpdateJobDescription } from '..';

describe( 'app | pages | UpdateJobDescription | component', () => {
  it('should match snapshot', () => {
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
    const props = {
      classes:{},
      jobDescription:{},
      isEditMode: true,
      setEditMode: jest.fn(),
    };
    const store = configureStore(state);
      const wrapper = shallow(
        <Provider store={store}>
          <UpdateJobDescription {...props} />
        </Provider>,
      );
      expect(wrapper).toMatchSnapshot();
  });
});