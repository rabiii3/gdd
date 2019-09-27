import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Typography from '@material-ui/core/Typography/Typography';
import { FormattedMessage } from 'react-intl';
import { withStyles, IconButton } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Divider from '@material-ui/core/Divider/Divider';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Grid from '@material-ui/core/Grid/Grid';
import Button from '@material-ui/core/Button/Button';
import NotificationCard from './NotificationCard';
import { getSortedNotifications } from '../../selectors/notifications';
import messages from './messages';
import { removeNotifications, alreadyRead } from '../../actions/notifications';
import { Spacer, LARGE } from '../../widgets/Spacer';
import { getPeople } from '../../selectors/people';
import { getResumeById } from '../../selectors/resumes';

const styles = {
  remove: {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
};
export const Component = ({ classes, getEntity, notifications, onClose, actions, people }) => (
  <Grid>
    <MenuItem>
      <Typography variant="h6">
        <FormattedMessage {...messages.notification} />
      </Typography>
      <IconButton onClick={onClose}>
        <ChevronRightIcon />
      </IconButton>
      <Spacer size={LARGE} />
      <Grid container direction="row" justify="flex-end" alignItems="center">
        <Button onClick={() => actions.removeNotifications()}>
          <Typography className={classes.remove} color="primary" variant="caption" align="right">
            <FormattedMessage {...messages.remove} />
          </Typography>
        </Button>
      </Grid>
    </MenuItem>
    <Divider />

    {notifications.map(notification => {
      return (
        <NotificationCard
          key={notification._id}
          notification={notification}
          alreadyRead={actions.alreadyRead}
          people={people}
          resume={getEntity(notification)}
        />
      );
    })}
  </Grid>
);

Component.propTypes = {
  classes: PropTypes.object.isRequired,
  notifications: PropTypes.array,
  onClose: PropTypes.func,
  actions: PropTypes.object,
  getEntity: PropTypes.func.isRequired,
  people: PropTypes.object.isRequired,
};

const actions = { removeNotifications, alreadyRead };
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

const mapStateToProps = state => ({
  notifications: getSortedNotifications(state),
  people: getPeople(state),
  getEntity: ({ entityId }) => getResumeById(entityId)(state),
});

export const enhance = compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
);
export default enhance(Component);
