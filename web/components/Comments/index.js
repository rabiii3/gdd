import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedRelative } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose, map } from 'ramda';
import { withStateHandlers } from 'recompose';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import Hidden from '@material-ui/core/Hidden/Hidden';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Paper from '@material-ui/core/Paper';
import ListItemText from '@material-ui/core/ListItemText';
import messages from './messages';
import { UserAvatar } from '../../widgets/Avatar';
import CommentsEditor from '../CommentsEditor';
import { UserName, Spacer, Menu } from '../../widgets';
import { getResumeById } from '../../selectors/resumes';
import withRoutes from '../../hoc/routes';
import { statusToLabel, eventToLabel, isCommentContent } from '../../../lib/models/comments';
import { MEDIUM, SMALL } from '../../widgets/ChipStatus';
import { LARGE } from '../../widgets/RoleChip';
import { isTodo } from '../../../lib/models/todo';
import Todo from '../../pages/UpdateResume/Todo';

const style = theme => ({
  root: {
    width: '100%',
    maxWidth: 500,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  comment: {
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 1,
    paddingLeft: theme.spacing.unit * 1,
    display: 'flex',
    flexDirection: 'column',
  },
  avatar: {
    marginTop: theme.spacing.unit * 2,
    height: '25px',
  },
  date: {
    flexGrow: 1,
    margin: theme.spacing.unit,
  },
  icon: {
    fontSize: 18,
    color: 'grey',
    marginRight: theme.spacing.unit,
    '&:hover': {
      color: 'black',
    },
  },
  when: {
    marginTop: theme.spacing.unit / 2,
  },
  grey: {
    color: 'grey',
  },
  small: {
    fontSize: 'small',
  },
  smaller: {
    fontSize: 'x-small',
  },
  bold: {
    fontWeight: 'bold',
  },
  content: { marginTop: '-8px', marginBottom: '-20px', fontWeight: '300' },
  iconFontSize: { fontSize: 22 }
});
let PREVIOUS_VERSION;
export const Comments = ({ classes, comments, user, people, actions, isEditable, setEdit, routes }) => (
  <Grid container>
    <Grid item xs>
      {map(
        comment =>
          comment.event ? (
            PREVIOUS_VERSION = comment.previousVersion,
            <React.Fragment key={comment._id}>
              <Divider absolute={false} variant="inset" light />
              <Grid container alignItems="center">
                <Grid item>
                  <UserAvatar
                    classes={classes.avatar}
                    user={people[comment.createdBy]}
                    size={SMALL}
                    to={people[comment.createdBy] && routes.getPathByName('person', people[comment.createdBy]._id)}
                  />
                </Grid>
                <Grid item xs className={classNames(classes.margin, classes.comment)}>
                  <Grid container direction="row" alignItems="center">
                    <Typography
                      className={classNames(classes.grey, classes.small)}
                      variant="subtitle1"
                    >
                      {eventToLabel(comment.event)}
                      {(PREVIOUS_VERSION && PREVIOUS_VERSION.updatedBy && people[PREVIOUS_VERSION.updatedBy] || comment.createdBy && people[comment.createdBy]) && <FormattedMessage {...messages.by} />}
                    </Typography>
                    <Spacer size={SMALL} />
                    <Grid className={classNames(classes.grey, classes.small, classes.bold)}>
                      {PREVIOUS_VERSION && PREVIOUS_VERSION.updatedBy ? (
                        <UserName user={people[PREVIOUS_VERSION.updatedBy]} />
                      ) : (
                          <UserName user={people[comment.createdBy]} />
                        )}
                    </Grid>
                    <Spacer size={SMALL} />
                    {(PREVIOUS_VERSION && PREVIOUS_VERSION.status) !==
                      (comment.nextVersion && comment.nextVersion.status) && (
                        <React.Fragment>
                          <Typography className={classNames(classes.grey, classes.small)} variant="subtitle1">
                            <FormattedMessage {...messages.statusChanged} />
                          </Typography>
                          <Spacer size={SMALL} />
                          <Grid className={classNames(classes.grey, classes.small, classes.bold)}>
                            {comment.nextVersion && statusToLabel(comment)}
                          </Grid>
                        </React.Fragment>
                      )}
                    <Spacer size={MEDIUM} />
                    <Typography className={classNames(classes.grey, classes.smaller)} variant="caption" align="right">
                      <FormattedRelative value={comment.createdAt} />
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </React.Fragment>
          ) :
            isEditable !== comment._id ? (
              <React.Fragment key={comment._id}>
                <Divider variant="inset" />
                {(isCommentContent(comment) || isTodo(comment)) &&
                  <Grid container justify="flex-start">
                    <Grid item>
                      <UserAvatar
                        user={people[comment.createdBy]}
                        size={SMALL}
                        to={people[comment.createdBy] && routes.getPathByName('person', people[comment.createdBy]._id)}
                      />
                    </Grid>
                    <Grid item xs className={classNames(classes.margin, classes.comment)}>
                      <Grid container alignItems="center">
                        <Grid item>
                          <UserName user={people[comment.createdBy]} />
                        </Grid>
                        <Grid item>
                          <Typography className={classNames(classes.grey, classes.date, classes.smaller)} variant="caption">
                            <FormattedRelative value={comment.createdAt} />
                          </Typography>
                        </Grid>
                        <Hidden smDown>
                          <Spacer size={LARGE} />
                        </Hidden>
                        <Grid item>
                          <Todo todo comment={comment} people={people} isShownInComment/>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.content} dangerouslySetInnerHTML={{ __html: comment.content }} />
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item>
                          {user &&
                            user._id === comment.createdBy && (
                              <Menu>
                                <Paper>
                                  <MenuList>
                                    <MenuItem onClick={() => setEdit(comment._id)} className={classes.icon}>
                                      <ListItemIcon>
                                        <EditIcon />
                                      </ListItemIcon>
                                      <ListItemText primary={<FormattedMessage {...messages.edit} />} />
                                    </MenuItem>
                                    <MenuItem onClick={() => actions.deleteComment(comment)} className={classes.icon}>
                                      <ListItemIcon>
                                        <DeleteIcon />
                                      </ListItemIcon>
                                      <ListItemText
                                        classes={{ primary: classes.primary }}
                                        variant="inset"
                                        primary={<FormattedMessage {...messages.remove} />}
                                      />
                                    </MenuItem>
                                  </MenuList>
                                </Paper>
                              </Menu>
                            )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>}
              </React.Fragment>
            ) :
              (
                <CommentsEditor key={comment._id} comment={comment} setEdit={setEdit} actions={actions} user={user} />
              )
      )(comments)}
    </Grid>
  </Grid>
);

Comments.propTypes = {
  classes: PropTypes.object,
  comments: PropTypes.array,
  user: PropTypes.object,
  actions: PropTypes.object,
  people: PropTypes.object,
  isEditable: PropTypes.string,
  setEdit: PropTypes.func,
  routes: PropTypes.object,
};

const withEdit = withStateHandlers(() => ({ isEditable: null }), {
  setEdit: () => id => ({ isEditable: id }),
});

const mapStateToProps = (state, ownProps) =>
  createStructuredSelector({
    resume: getResumeById(ownProps.id),
  });

export const enhance = compose(
  connect(
    mapStateToProps,
    null,
  ),
  withStyles(style),
  withEdit,
  withRoutes,
);

export default enhance(Comments);
