import React from 'react';
import { shallow } from 'enzyme';
import { Page } from '..';
import routes from '../../../routes';

describe('web | pages | UpdateResume | component', () => {
  describe('render', () => {
    it('should match snapshot', () => {
      const props = {
        classes: {},
        isEditable: false,
        setEditable: jest.fn(() => {}),
        isDeleted: false,
        setDeleting: jest.fn(() => {}),
        location: {},
        history: {},
        actions: {},
        user: {},
        comments: [],
        resumes: [],
        routes,
        people: {},
        resume: {},
        token: 'token',
        tenant: 'tenant',
        match: { params: {} },
        lastTodo: {},
        expanded: false,
        handleExpandClick: jest.fn(() => {}),
      };
      const wrapper = shallow(<Page {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
