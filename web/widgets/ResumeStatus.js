import React from 'react';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import { compose, } from 'ramda';
import { statusLabel } from '../../lib/models/resumes';
import withRoutes from '../hoc/routes';

const size2Dim = size => ({ LARGE: '230px', MEDIUM: '150px', SMALL: '75px' }[size]);

export const LARGE = 'LARGE';
export const MEDIUM = 'MEDIUM';
export const SMALL = 'SMALL';

const ResumeStatus = ({ resume, size = 'SMALL', action, isClickable }) => {
  const style = {
    width: size2Dim(size),
    height: 30,
  };
  const props = { style };

  return isClickable ? (
    <Chip {...props} onClick={() => action(statusLabel(resume))} label={statusLabel(resume)} color="primary" />
  ) : (
    <Chip {...props} label={statusLabel(resume)} color="primary" />
  );
};
ResumeStatus.propTypes = {
  resume: PropTypes.object,
  size: PropTypes.string,
  action: PropTypes.func,
  isClickable: PropTypes.bool,
};
export const enhance = compose(withRoutes);
export default enhance(ResumeStatus);
