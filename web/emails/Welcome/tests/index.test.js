import React from 'react';
import { shallow } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { enhance } from '..';

describe('web | pages | EmailConfirmation | index', () => {
  describe('render', () => {
    it('should emailConfirmation render', () => {
      const theme = createMuiTheme({
        typography: {
          useNextVariants: true,
        },
      });
      const Component = () => <div />;
      const EnhancedComponent = enhance(Component);

      const wrapper = shallow(
        <MuiThemeProvider theme={theme}>
          <EnhancedComponent />
        </MuiThemeProvider>,
      );

      expect(wrapper).toMatchSnapshot();
    });
  });
});
