import React from 'react';
import { object } from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

const Spinner = ({ classes }) => (
  <div className={`${classes.root} circular-progress--wrapper`}>
    <CircularProgress
      className={`${classes.circularProgress} circular-progress circular-progress__circular-progress`}
      size={50}
    />
  </div>
);

Spinner.propTypes = {
  classes: object,
};

export default Spinner;
