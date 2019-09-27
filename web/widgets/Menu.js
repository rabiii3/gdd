import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import Popover from '@material-ui/core/Popover';
import { compose } from 'ramda';
import { withState, withHandlers } from 'recompose';
import IconButton from '@material-ui/core/IconButton';

const size2Dim = size => ({ LARGE: '32px', MEDIUM: '24px', SMALL: '18px' }[size]);
export const LARGE = 'LARGE';
export const MEDIUM = 'MEDIUM';
export const SMALL = 'SMALL';

export const Menu = ({ openUserMenu, closeUserMenu, userMenuAnchor, children, size = 'SMALL' }) => {
  const style = {
    fontSize: size2Dim(size)
  };
  const props = { style };
  return (
    <div>
      <IconButton onClick={openUserMenu}>
        <Icon className="fas fa-ellipsis-v" {...props} />
      </IconButton>
      <Popover
        id="menu-appbar"
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={closeUserMenu}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {children}
      </Popover>
    </div>
  );
};
Menu.propTypes = {
  openUserMenu: PropTypes.func.isRequired,
  closeUserMenu: PropTypes.func.isRequired,
  userMenuAnchor: PropTypes.object,
  children: PropTypes.node.isRequired,
  size: PropTypes.string,
};

const withMenu = withState('userMenuAnchor', 'toggleMenu', null);
const withMenuHandlers = withHandlers({
  openUserMenu: ({ toggleMenu }) => event => toggleMenu(event.currentTarget),
  closeUserMenu: ({ toggleMenu }) => () => toggleMenu(null),
});
const enhance = compose(
  withMenu,
  withMenuHandlers,
);
export default enhance(Menu);
