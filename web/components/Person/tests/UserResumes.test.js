import React from 'react';
import { mount } from 'enzyme';
import { enhance } from '../Resumes';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

describe('web |components | Person | UserResumes', () => {
  describe('render', () => {
    it('should render', () => {
      const Component = () => <div />;
      const EnhancedComponent = enhance(Component);

      const theme = createMuiTheme({
        typography: {
          useNextVariants: true,
        },
      });
      const wrapper = mount(
        <MuiThemeProvider theme={theme}>
          <EnhancedComponent />
        </MuiThemeProvider>,
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
