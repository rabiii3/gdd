import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { compose } from 'ramda';

const Styles = () => ({
  container: {
    height: '100vh',
  },
});

const Container = ({ classes, className, children }) => (
  <Grid container justify="center" className={classNames(className, classes.container)}>
    <Grid item xs={12}>
      {children}
    </Grid>
  </Grid>
);

Container.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
const enhance = compose(withStyles(Styles));
export default enhance(Container);
