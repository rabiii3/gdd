import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { prop } from 'ramda';
import Grid from '@material-ui/core/Grid/Grid';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import MenuList from '@material-ui/core/MenuList/MenuList';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Typography from '@material-ui/core/Typography/Typography';
import { FormattedRelative, FormattedMessage } from 'react-intl';
import { fullname } from '../../../lib/models/people';
import withRoutes from '../../hoc/routes';
import { Spacer, SMALL, MEDIUM } from '../../widgets/Spacer';
import messages from './messages';
import { UserAvatar } from '../../widgets/Avatar';
import { statusToLabel } from '../../../lib/models/comments';


const styles = {
  card: {
    width: '500px',
  },
  smaller: {
    fontSize: 'xx-small',
  },
  small: {
    fontSize: 'small',
  },
  avatar: {
    fontSize: '15px',
  },
};
const CREATED = 'created';
const UPDATED = 'updated';

export const NotificationCard = ({ classes, people, resume, notification, history, alreadyRead, routes }) => {
  const redirectNotification = resume => {
    return history.push(routes.getPathByName('editResume', resume));
  };
  const updatedBy = people[prop('updatedBy')(resume)];
  const createdBy = people[prop('createdBy')(notification)];
  return (
    <MenuList>
      {resume && notification.event === CREATED ? (
        <MenuItem
          disabled={notification.alreadyRead}
          onClick={() => {
            redirectNotification(notification && notification.entityId);
            alreadyRead(notification._id);
          }}
        >
          <Grid container direction="row" alignItems="center" justify="center">
            <Grid item xs={2}>
              <UserAvatar classes={classes.avatar} user={people && createdBy} size="SMALL" />
            </Grid>
            <Grid item xs={8}>
              <Grid container direction="row" justify="flex-start" alignItems="center">
                <Typography variant="body2" className={classes.small}>
                  {people && `${createdBy.firstname} ${createdBy.lastname}`}
                </Typography>
                <Spacer size={SMALL} />
                <Typography variant="body1" className={classes.small}>
                  <FormattedMessage {...messages.newResume} />
                </Typography>
                <Spacer size={SMALL} />
                <Typography variant="body2" className={classes.small}>
                  {`${resume.firstname} ${resume.lastname}`}
                </Typography>
              </Grid>
              <Spacer size={MEDIUM} />
            </Grid>
            <Grid item xs={2}>
              <Grid container direction="row" justify="flex-end">
                <Typography className={classes.smaller} variant="caption">
                  <FormattedRelative value={notification.createdAt} />
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </MenuItem>
      ) : (
        <Grid>
          {resume && notification.event === UPDATED ? (
            <MenuItem
              disabled={notification.alreadyRead}
              onClick={() => {
                redirectNotification(notification && notification.entityId);
                alreadyRead(notification._id);
              }}
            >
              <Grid container direction="row" alignItems="center" justify="space-between">
                <Grid item xs={2}>
                  <UserAvatar classes={classes.avatar} user={updatedBy} size="SMALL" />
                </Grid>
                <Grid item xs={8}>
                  {(notification.previousVersion && notification.previousVersion.status) !==
                  (notification.nextVersion && notification.nextVersion.status) ? (
                    <Grid container direction="row" justify="flex-start" alignItems="center">
                      <Typography variant="body2" className={classes.small}>
                        {people && `${updatedBy.firstname} ${updatedBy.lastname}`}
                      </Typography>
                      <Spacer size={SMALL} />
                      <Typography variant="body1" className={classes.small}>
                        <FormattedMessage {...messages.status} />
                      </Typography>
                      <Spacer size={SMALL} />
                      <Typography variant="body2" className={classes.small}>
                        {notification.nextVersion && statusToLabel(notification)}
                      </Typography>
                      <Spacer size={SMALL} />
                      <Typography variant="body1" className={classes.small}>
                        <FormattedMessage {...messages.onResume} />
                      </Typography>
                      <Spacer size={SMALL} />
                      <Typography variant="body2" className={classes.small}>
                        {resume && `${resume.firstname} ${resume.lastname}`}
                      </Typography>
                    </Grid>
                  ) : (
                    <Grid container direction="row" justify="flex-start" alignItems="center">
                      <Typography variant="body2" className={classes.small}>
                        {people && `${updatedBy.firstname} ${updatedBy.lastname}`}
                      </Typography>
                      <Spacer size={SMALL} />
                      <Typography variant="body1" className={classes.small}>
                        <FormattedMessage {...messages.updated} />
                      </Typography>
                      <Spacer size={SMALL} />
                      <Typography variant="body2" className={classes.small}>
                        {resume && `${resume.firstname} ${resume.lastname}`}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
                <Grid item xs={2}>
                  <Grid container direction="row" justify="flex-end">
                    <Typography className={classes.smaller} variant="caption">
                      <FormattedRelative value={notification.createdAt} />
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </MenuItem>
          ) : (
            <Grid>
              {resume && notification.content && notification.updatedBy ? (
                <MenuItem
                  disabled={notification.alreadyRead}
                  onClick={() => {
                    redirectNotification(notification && notification.entityId);
                    alreadyRead(notification._id);
                  }}
                >
                  <Grid container direction="row" alignItems="center" justify="space-between">
                    <Grid item xs={2}>
                      <UserAvatar classes={classes.avatar} user={people && createdBy} size="SMALL" />
                    </Grid>
                    <Grid item xs={8}>
                      <Grid container direction="row" justify="flex-start" alignItems="center">
                        <Typography variant="body2" className={classes.small}>
                          {resume && resume.firstname && fullname(people[notification.updatedBy])}
                        </Typography>
                        <Spacer size={SMALL} />
                        <Typography variant="body1" className={classes.small}>
                          <FormattedMessage {...messages.updatesComment} />
                        </Typography>
                        <Spacer size={SMALL} />
                        <Typography variant="body2" className={classes.small}>
                          {resume && `${resume.firstname} ${resume.lastname}`}
                        </Typography>
                        <Typography variant="body1" className={classes.small}>
                          <FormattedMessage {...messages.resume} />
                        </Typography>
                        <Spacer size={SMALL} />
                      </Grid>
                      <Spacer size={MEDIUM} />
                    </Grid>
                    <Grid item xs={2}>
                      <Grid container direction="row" justify="flex-end">
                        <Typography className={classes.smaller} variant="caption">
                          <FormattedRelative value={notification.updatedAt} />
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </MenuItem>
              ) : (
                <Grid>
                  {resume && (
                    <MenuItem
                      disabled={notification.alreadyRead}
                      onClick={() => {
                        redirectNotification(notification && notification.entityId);
                        alreadyRead(notification._id);
                      }}
                    >
                      <Grid container direction="row" alignItems="center" justify="space-between">
                        <Grid item xs={2}>
                          <UserAvatar classes={classes.avatar} user={people && createdBy} size="SMALL" />
                        </Grid>
                        <Grid item xs={8}>
                          <Grid container direction="row" justify="flex-start" alignItems="center">
                            <Typography variant="body2" className={classes.small}>
                              {resume && resume.firstname && fullname(createdBy)}
                            </Typography>

                            <Spacer size={SMALL} />
                            <Typography variant="body1" className={classes.small}>
                              <FormattedMessage {...messages.createsComment} />
                            </Typography>
                            <Spacer size={SMALL} />
                            <Typography variant="body2" className={classes.small}>
                              {resume && `${resume.firstname} ${resume.lastname}`}
                            </Typography>
                            <Typography variant="body1" className={classes.small}>
                              <FormattedMessage {...messages.resume} />
                            </Typography>
                          </Grid>
                          <Spacer size={MEDIUM} />
                        </Grid>
                        <Grid item xs={2}>
                          <Grid container direction="row" justify="flex-end">
                            <Typography className={classes.smaller} variant="caption">
                              <FormattedRelative value={notification.createdAt} />
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </MenuItem>
                  )}
                </Grid>
              )}
            </Grid>
          )}
        </Grid>
      )}
    </MenuList>
  );
};

NotificationCard.propTypes = {
  classes: PropTypes.object.isRequired,
  routes: PropTypes.object.isRequired,
  people: PropTypes.object,
  getResumeById: PropTypes.func,
  resume: PropTypes.object,
  notification: PropTypes.object,
  alreadyRead: PropTypes.func.isRequired,
  history: PropTypes.object,
};

export const enhance = compose(
  withStyles(styles),
  withRoutes,
  withRouter,
);
export default enhance(NotificationCard);
