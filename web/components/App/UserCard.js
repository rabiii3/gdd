import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import { withRouter, Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { fullname } from '../../../lib/models/people';
import { UserAvatar, LARGE } from '../../widgets/Avatar';
import withRoutes from '../../hoc/routes';
import messages from './messages';


const styles = {
  card: {
    maxWidth: 400,
    boxShadow: 'unset',
  },
  avatar: {
    width: 60,
    height: 60,
  },
  actions: {
    display: 'flex',
  },
};

export const UserCard = ({ handleClose, routes, user, logout, classes }) => (
  <Card className={classes.card}>
    <CardHeader avatar={<UserAvatar user={user} size={LARGE} />} title={fullname(user)} subheader={user.email} />
    <CardActions className={classes.actions}>
      <Button
        size="small"
        color="primary"
        onClick={() => {
          handleClose();
          logout();
        }}
      >
        <FormattedMessage {...messages.logout} />
      </Button>
      <Button
        onClick={handleClose}
        size="small"
        color="primary"
        component={Link}
        to={routes.getPathByName('person', user._id)}
      >
        <FormattedMessage {...messages.displayProfile} />
      </Button>
    </CardActions>
  </Card>
);

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  routes: PropTypes.object.isRequired,
};

export const enhance = compose(
  withStyles(styles),
  withRouter,
  withRoutes,
);
export default enhance(UserCard);
