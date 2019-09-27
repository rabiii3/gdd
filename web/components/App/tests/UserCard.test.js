import React from 'react';
import { mount } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { enhance } from '../UserCard';

describe.skip('app | components | UserCard | index', () => {
  describe('render User Card', () => {
    it('should render User Card', () => {
      const theme = createMuiTheme({
        typography: {
          useNextVariants: true,
        },
      });
      const Component = () => <div />;
      const EnhancedComponent = enhance(Component);

      const wrapper = mount(
        <MuiThemeProvider theme={theme}>
          <EnhancedComponent />
        </MuiThemeProvider>,
      );

      expect(wrapper).toMatchSnapshot();
    });
  });
});
