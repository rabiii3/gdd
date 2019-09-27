import React from 'react';
import { shallow } from 'enzyme';
import { Page } from '..';

describe('web | pages | EmailConfirmation | index', () => {
  describe('render', () => {
    it('should match snapshot', () => {
      const props = {
        classes: {},
        url: 'http://URL',
        author: {
          firstname: 'AFIRSTNAME',
          lastname: 'ALASTNAME',
        },
        person: {
          firstname: 'FIRSTNAME',
          lastname: 'LASTNAME',
        },
        resume: { _id: 'ID', status: 'STATUS2' },
        previousResume: { status: 'STATUS1' },
      };
      const wrapper = shallow(<Page {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
