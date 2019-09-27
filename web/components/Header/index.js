import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
const Styles = theme => ({
  header: {
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(2.5),
    borderBottom: ' 0.1px solid rgb(193, 193, 193)',
    fontSize: '1.5em',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
});
export const StyledHeaderLeft = ({ children }) => (
  <Grid container direction="row" justify="flex-start" alignItems="center" wrap="nowrap">
    {children}
  </Grid>
);

StyledHeaderLeft.propTypes = {
  children: PropTypes.node,
};
export const HeaderLeft = withStyles(Styles)(StyledHeaderLeft);

export const StyledHeaderRight = ({ children }) => (
  <Grid container direction="row" justify="flex-end" alignItems="center" wrap="nowrap">
    {children}
  </Grid>
);

StyledHeaderRight.propTypes = {
  children: PropTypes.node,
};
export const HeaderRight = withStyles(Styles)(StyledHeaderRight);

export const StyledHeader = ({ children, classes }) => {
  const left = () => React.Children.toArray(children).find(child => child.type === HeaderLeft);
  const right = () => React.Children.toArray(children).find(child => child.type === HeaderRight);

  return (
    <Grid container className={classes.header} alignItems="center">

      <Grid item xs={8} sm={6} lg={7}>
        {left()}
      </Grid>
      <Grid item xs={4} sm={6} lg={5}>
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
