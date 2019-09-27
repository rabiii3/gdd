import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import PermIdentity from '@material-ui/icons/PermIdentity';
import MuiAvatar from '@material-ui/core/Avatar';
import { prop } from 'ramda';
import { fullname } from '../../../lib/models/people';
import utils from '../../utils';
import { getColor } from '../../../lib/utils';

const size2Dim = size => ({ LARGE: '60px', MEDIUM: '36px', SMALL: '28px', XSMALL: '21px' }[size] || '36px');
const fontSize2Dim = size => ({ LARGE: '28px', MEDIUM: '20px', SMALL: '12px', XSMALL: '10' }[size] || '20px');
export const LARGE = 'LARGE';
export const MEDIUM = 'MEDIUM';
export const SMALL = 'SMALL';
export const XSMALL = 'XSMALL';

export const UserAvatar = ({ user, ...props }) => {
  return <Avatar user={user} color={getColor(user)} name={fullname(user)} picture={prop('picture', user)} {...props} />;
};
UserAvatar.propTypes = {
  user: PropTypes.object,
};

export const Avatar = ({ color, user, name, size = SMALL, showTooltip, to, className, picture }) => {
  const style = {
    height: size2Dim(size),
    width: size2Dim(size),
    backgroundColor: user && color,
    fontSize: fontSize2Dim(size),
    margin: !user && 12,
  };
  const props = { style, className };
  const widget = !user ?
    <MuiAvatar {...props}><PermIdentity /></MuiAvatar>
    : picture ?
      <Tooltip title={showTooltip ? name : ''}>
        <MuiAvatar src={picture} {...props} />
      </Tooltip>
      :
      <Tooltip title={showTooltip ? name : ''}>
        <MuiAvatar {...props}>{utils.initials(name)}</MuiAvatar>
      </Tooltip>

  if (!to) return widget;
  return (
    <IconButton component={Link} to={to}>
      {widget}
    </IconButton>
  );
};

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  to: PropTypes.string,
  showTooltip: PropTypes.bool,
  picture: PropTypes.string,
  user: PropTypes.object,
};

export default Avatar;
