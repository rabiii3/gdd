import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
const Styles = theme => ({
  header: {
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    borderBottom: ' 0.1px solid rgb(193, 193, 193)',
    fontSize: '1.5em',
  },
});

export const StyledHeaderLeft = ({ children }) => (
  <Grid container justify="flex-start" alignItems="center">
    {children}
  </Grid>
);

StyledHeaderLeft.propTypes = {
  children: PropTypes.node,
};
export const HeaderLeft = withStyles(Styles)(StyledHeaderLeft);

export const StyledHeaderRight = ({ children }) => (
  <Grid container justify="flex-end" alignItems="center">
    {children}
  </Grid>
);

StyledHeaderRight.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
};
export const HeaderRight = withStyles(Styles)(StyledHeaderRight);

export const StyledHeader = ({ children, classes }) => {
  const left = () => React.Children.toArray(children).find(child => child.type === HeaderLeft);
  const right = () => React.Children.toArray(children).find(child => child.type === HeaderRight);

  return (
    <Grid container className={classes.header} alignItems="center">
      <Grid item xs={12} sm={5} lg={8}>
        {left()}
      </Grid>
      <Grid item xs={12} sm={7} lg={4}>
        {right()}
      </Grid>

    </Grid>
  );
};

StyledHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
};
export const Header = withStyles(Styles)(StyledHeader);
