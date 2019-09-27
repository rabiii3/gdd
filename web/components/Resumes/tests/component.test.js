import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from '../../../store/configureStore.test';
import { Component } from '..';

describe('app | components | ResumesList | component', () => {
  describe('render', () => {
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
    const props = {
      classes: {},
      resumes: [],
      people: {},
      actions: {},
      allSkills: {},
      location: {},
    };
    it('should be defined', () => {
      const store = configureStore(state, null);

      const wrapper = shallow(
        <Provider store={store}>
          <Component {...props} />
        </Provider>,
      );

      expect(wrapper).toBeDefined();
    });

    it('should match snapshot', () => {
      const store = configureStore(state, null);
      const wrapper = shallow(
        <Provider store={store}>
          <Component {...props} />
        </Provider>,
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
