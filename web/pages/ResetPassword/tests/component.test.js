import React from 'react';
import { shallow } from 'enzyme';
import { Component } from '..';
import routes from '../../../routes';

describe('pages | ForgetPassword | component', () => {
  it('should render', () => {
    const props = {
      classes: {},
      actions: {},
      routes,
    };
    const wrapper = shallow(<Component {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
