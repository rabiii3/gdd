import React from 'react';
import { compose, equals, prop } from 'ramda';
import PropTypes from 'prop-types';
import { withProps, withState, withHandlers } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { FormattedNumber, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import connect from 'react-redux/lib/connect/connect';
import classNames from 'classnames';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import { UserAvatar, SMALL, LARGE } from '../../widgets/Avatar';
import { fullname, isAdmin } from '../../../lib/models/people';
import { MailTo, TelTo, ResumeStatus, SkillsChip, LoadResume } from '../../widgets';
import withRoutes from '../../hoc/routes';
import { getSkillsLabels } from '../../../lib/models/skills';
import { getToken, getUser } from '../../selectors/auth';
import { getTenant } from '../../selectors/config';
import { StarRating } from '../../widgets/StarRating'
import { makeResumeFileUrl } from '../../utils';
import { TAGS } from '../../utils/tags';
import { getLastTodo } from '../../selectors/comments';
import { getPeople } from '../../selectors/people';
import Todo from '../../pages/UpdateResume/Todo';
import messages from './messages'

const style = theme => ({

  card: {},
  paper: {
    margin: theme.spacing(1),
    maxWidth: '350px',
    minHeight: '250px',
    display: 'flex',
  },
  chips: {
    minHeight: '4.5rem',
  },
  status: {
    minHeight: '3rem',
    minWidth: '80%',
  },
  cardHeader: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textDecoration: 'none',
    width: '150px',
  },
  marginLeft: {
    marginLeft: -6
  },
  fullName: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textDecoration: 'none',
    maxWidth: '200px',
  },
  fullNameFullWidth: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textDecoration: 'none',
  },
  author: {
    minHeight: 50
  },
});

const View = ({ people, lastTodo, routes, classes, resume, author, actions, skills, user, isClickable, boolPopover, setShowPopover, setClosePopover, openResumeDialog, isDialogOpened, closeResumeDialog, fileUrl, ratingValue }) => {
  return (
    <Paper className={classes.paper}>
      <Grid container direction="column">
        <Grid item className={classes.card} >
          <CardHeader
            avatar={
              <UserAvatar
                to={routes.getPathByName('editResume', resume._id)}
                user={resume}
                size={LARGE}
              />
            }
            title={
              <Typography variant="subtitle2" className={classes.cardHeader}>
                {fullname(resume)}
              </Typography>
            }
            action={
              <div>
                <IconButton
                  onClick={setShowPopover}
                >
                  <MoreVertIcon />
                </IconButton>
                <Popover
                  anchorEl={boolPopover}
                  open={Boolean(boolPopover)}
                  onClose={setClosePopover}
                  anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem onClick={() => { setClosePopover(); openResumeDialog() }} className={classes.popover}>
                    <ListItemIcon>
                      <RemoveRedEye />
                    </ListItemIcon>
                    <ListItemText
                      classes={{ primary: classes.primary }}
                      variant="inset"
                      primary={<FormattedMessage {...messages.seePdf} />}
                    />
                  </MenuItem>
                  <Hidden xsUp={!(isAdmin(user)|| equals(prop('createdBy',resume), prop('_id',user)))}>
                    <MenuItem component={Link} to={{pathname:routes.getPathByName('editResume', resume._id), search:'?mode=edit'}}>
                      <ListItemIcon>
                        <EditIcon />
                      </ListItemIcon>
                      <ListItemText
                        classes={{ primary: classes.primary }}
                        variant="inset"
                        primary={<FormattedMessage {...messages.edit} />}
                      />
                    </MenuItem>
                    <MenuItem onClick={() => { setClosePopover(); actions.deleteResume(resume) }} className={classes.popover}>
                      <ListItemIcon>
                        <DeleteIcon />
                      </ListItemIcon>
                      <ListItemText
                        classes={{ primary: classes.primary }}
                        variant="inset"
                        primary={<FormattedMessage {...messages.deleteResume} />}
                      />
                    </MenuItem>
                  </Hidden>
                </Popover>
                <LoadResume
                  open={isDialogOpened}
                  close={closeResumeDialog}
                  file={fileUrl}
                  download={() => actions.loadFile(resume)}
                />
              </div>
            }

            subheader={
              <Grid container>
                <Typography className={classNames(classes.cardHeader, classes.marginLeft)}>
                  <TelTo person={resume}
                    action={actions.addQueryResumes(TAGS.country)}
                  />
                </Typography>
                <Typography className={classes.cardHeader}>
                  <MailTo person={resume} />
                </Typography>
                {resume.award && (
                  <Typography className={classes.cardHeader}>
                    <FormattedNumber
                      value={resume.award}
                      currency="EUR"
                      minimumFractionDigits={0} 
                    />
                  </Typography>
                )}
              </Grid>
            }
          />
        </Grid >
        <Grid item style={{ display: 'flex', flex: 1 }} >
          <Grid container direction="column">
            <Grid item style={{ minHeight: '50px' }} >
              <SkillsChip
                skills={getSkillsLabels(skills, resume)}
                action={actions.addQueryResumes(TAGS.skill)}
                isClickable={isClickable}
              />
            </Grid>
            <Grid item style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', flex: 1, alignItems: 'center' }} >
            <Grid item>
              <Todo todo comment={lastTodo} people={people} isShownInComment={false} isResumePage={false}/>
            </Grid>
              <Grid container direction="row">
                <Grid item xs={12}>
                  <Grid container direction="column" justify="center" alignItems="center" className={classes.status}>
                    <Grid item>
                      <ResumeStatus size="LARGE" resume={resume} action={actions.addQueryResumes(TAGS.status)} isClickable={isClickable} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} className={classes.author}>
                  <Grid container direction="row" alignItems="center" justify="space-between" >
                    <Grid item xs={9}>
                      <Grid container justify="flex-start" alignItems="center">
                        <Grid item>
                          {isAdmin(user) && author && <UserAvatar
                            to={author && routes.getPathByName('person', author._id)}
                            user={author}
                            size={SMALL}
                          />}
                        </Grid>
                        <Grid item>
                          {isAdmin(user) && <Typography variant="subtitle1" className={classes.fullName}>{fullname(author)}</Typography>}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={3}>
                      <Grid container justify="center" alignItems="center">
                        <StarRating value={ratingValue} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid >
      </Grid>
    </Paper>
  );
};

View.propTypes = {
  classes: PropTypes.object,
  resume: PropTypes.object,
  author: PropTypes.object,
  routes: PropTypes.object.isRequired,
  actions: PropTypes.object,
  skills: PropTypes.object,
  isClickable: PropTypes.bool,
  openResumeDialog: PropTypes.func,
  closeResumeDialog: PropTypes.func,
  isDialogOpened: PropTypes.bool,
  fileUrl: PropTypes.object,
  user: PropTypes.object,
  lastTodo: PropTypes.object,
  people: PropTypes.object,
  boolPopover: PropTypes.object,
  setShowPopover: PropTypes.func,
  setClosePopover: PropTypes.func,
  ratingValue: PropTypes.number,
};

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  user: getUser,
  token: getToken,
  tenant: getTenant,
  lastTodo: getLastTodo(ownProps.resume._id),
  people: getPeople,
});
const withDialog = withState('isDialogOpened', 'toggleDialog', false);
const withDialogHandlers = withHandlers({
  openResumeDialog: ({ toggleDialog }) => () => toggleDialog(true),
  closeResumeDialog: ({ toggleDialog }) => () => toggleDialog(false),
});

const withOpen = withState('boolPopover', 'handlePopover', null);
const withOpenHandlers = withHandlers({
  setShowPopover: ({ handlePopover }) => event => handlePopover(event.currentTarget),
  setClosePopover: ({ handlePopover }) => () => handlePopover(null),
});

export const enhance = compose(
  withStyles(style),
  connect(
    mapStateToProps,
    null,
  ),
  withProps(({ tenant, token, resume }) => ({
    fileUrl: makeResumeFileUrl(tenant, token, resume),
  })),
  withOpen,
  withOpenHandlers,
  withDialog,
  withDialogHandlers,
  withRoutes,
);

export default enhance(View);
