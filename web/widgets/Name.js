import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { compose } from 'recompose';
import { fullname } from '../../lib/models/people';

const Styles = theme => ({
  name: {
    fontSize: '1em',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('lg')]: {
      width: 300,
    },
    [theme.breakpoints.down('md')]: {
      width: 150,
    },
    [theme.breakpoints.down('sm')]: {
      width: 140,
    },
    [theme.breakpoints.down('xs')]: {
      width: 120,
    },
  },
});

export const UserName = ({ classes, user, withEllipsis }) => <Typography className={withEllipsis && classes.name} noWrap>{fullname(user)}</Typography>;

UserName.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
  withEllipsis: PropTypes.bool,
};
const enhance = compose(withStyles(Styles));
export default enhance(UserName);
