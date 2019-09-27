import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

const GridWidget = ({ children }) => (
  <Grid item xs={12}>
    <Grid container wrap="nowrap">
      {children}
    </Grid>
  </Grid>
);
GridWidget.propTypes = {
  children: PropTypes.node,
};

export default GridWidget;
