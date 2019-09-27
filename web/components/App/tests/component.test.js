import React from 'react';
import { shallow } from 'enzyme';
import { App } from '..';
import { Header } from '../Header';
import { UserCard } from '../UserCard';
import routes from '../../../routes';

describe('app | App | component', () => {
  describe('render App', () => {
    it('should match snapshot', () => {
      const props = {
        routes: {
          getRoutes: jest.fn(() => []),
          getDefaultRoute: jest.fn(() => { }),
          isSignInRoute: jest.fn(() => false),
        },
        actions: {},
        user: undefined,
      };
      const wrapper = shallow(<App {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});

describe('app | App | Header | component', () => {
  describe('render Header', () => {
    it('should match snapshot', () => {
      const props = {
        classes: {},
        openUserMenu: jest.fn(() => { }),
        closeUserMenu: jest.fn(() => { }),
        openDrawer: jest.fn(() => { }),
        closeDrawer: jest.fn(() => { }),
        isDrawerOpen: false,
        routes: {
          getRoutes: jest.fn(() => []),
          getPathByName: jest.fn(() => { }),
          isSignInRoute: jest.fn(() => false),
        },
      };
      const wrapper = shallow(<Header {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});

describe('app | App | UserCard | component', () => {
  describe('render User Card', () => {
    it('should match snapshot', () => {
      const props = {
        classes: {},
        logout: jest.fn(() => { }),
        handleClose: jest.fn(() => { }),
        routes,
        user: {
          firstname: 'Slim',
          lastname: 'Chkir',
        },
      };
      const wrapper = shallow(<UserCard {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
