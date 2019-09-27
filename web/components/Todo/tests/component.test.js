import React from 'react';
import { shallow } from 'enzyme';
import {Todo} from '..';

describe('web | components | Todo | component', () => {

  describe('render', () => {
  it('should match snapshot', () => {
  const props = {
  comment: {},
  people: {},
  classes: {},
  values: {},
  fullWidth: false,
  width: "",
  adminsOrHeadHunters: [],
  };
  const wrapper = shallow(<Todo {...props} />);
  expect(wrapper).toMatchSnapshot();
  });

   
  });
});
