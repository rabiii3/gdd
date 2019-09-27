import React from 'react';
import { shallow } from 'enzyme';
import { UserAvatar, Avatar } from '../../Avatar';

jest.mock('../../../../lib/utils', () => ({
  getColor: () => 'red',
}));

describe('app | Avatar | component', () => {
  describe('render User Avatar', () => {
    it('should match snapshot', () => {
      const props = {
        userAvatarProps: {
          user: {
            firstname: 'Slim',
            lastname: 'Chkir',
          },
        },
        avatarProps: {
          name: 'Slim Chkir',
        },
      };

      const wrapper = shallow(
        <UserAvatar {...props.userAvatarProps}>
          <Avatar {...props.avatarProps} />
        </UserAvatar>,
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
