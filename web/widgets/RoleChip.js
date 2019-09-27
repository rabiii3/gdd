import React from 'react';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import { map } from 'ramda';

const size2Dim = size => ({ LARGE: '230px', MEDIUM: '110px', SMALL: '60px' }[size]);

export const LARGE = 'LARGE';
export const MEDIUM = 'MEDIUM';
export const SMALL = 'SMALL';

const RoleChip = ({ data, size = 'SMALL', action }) => {
  const style = {
    width: size2Dim(size),
    height: 30,
    marginLeft: '2%',
    marginTop: '2%',
  };
  const props = { style };
  return data
    ? map(role => <Chip
      {...props}
      key={role.value}
      onClick={() => {
        action(role.label);
      }}
      label={role.label}
      color="primary"
    />
    )(data)
    : null;
};

RoleChip.propTypes = {
  action: PropTypes.func,
  data: PropTypes.array,
  size: PropTypes.string,
};
export default RoleChip;
