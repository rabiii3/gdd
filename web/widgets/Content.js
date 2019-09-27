import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { compose } from 'ramda';

const Styles = {};

const Content = ({ classes, children }) => (
  <Grid container className={classes.content} justify="center" alignItems="flex-start">
    <Grid item xs={12}>
      {children}
    </Grid>
  </Grid>
);

Content.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
};
const enhance = compose(withStyles(Styles));
export default enhance(Content);
