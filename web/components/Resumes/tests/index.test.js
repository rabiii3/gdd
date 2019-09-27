import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from '../../../store/configureStore.test';
import { enhance } from '..';

describe('app | components | Resumes | List | index', () => {
  describe('render', () => {
    it('should render', () => {
      const Component = () => <div />;
      const EnhancedComponent = enhance(Component);
      const state = {
        people: {
          data: {
            '1': {
              _id: '1',
              firstname: 'james',
              lastname: 'bond',
              email: 'james.bond@gmail.com',
              status: 'desable',
              type: 'user',
              phoneNumber: '07737383939',
              color: 'red',
              roles: ['user'],
            },
          },
        },
        resumes: {
          data: [
            {
              _id: 2,
              status: 'pending',
              //updatedAt: new Date(),
              candidateId: 1,
              createdBy: '4',
              //createdAt: new Date(),
            },
          ],
        },
      };
      const store = configureStore(state);

      const wrapper = mount(
        <Provider store={store}>
          <EnhancedComponent />
        </Provider>,
      );

      expect(wrapper).toMatchSnapshot();
    });
  });
});
