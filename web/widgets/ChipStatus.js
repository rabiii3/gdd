import React from 'react';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import { statusLabel } from '../../lib/models/people';

const size2Dim = size => ({ LARGE: '230px', MEDIUM: '150px', SMALL: '60px' }[size]);

export const LARGE = 'LARGE';
export const MEDIUM = 'MEDIUM';
export const SMALL = 'SMALL';

const ChipStatus = ({ person, size = 'SMALL' }) => {
  const style = {
    width: size2Dim(size),
    height: 30,
  };
  const props = { style };

  return <Chip {...props} label={statusLabel(person)} color="primary" />;
};

ChipStatus.propTypes = {
  person: PropTypes.object,
  size: PropTypes.string,
};
export default ChipStatus;
