import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { compose, withStateHandlers, lifecycle } from 'recompose';
import { bindActionCreators } from 'redux';
import { prop, filter, head, equals } from 'ramda';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { isAdmin, isHeadHunter, isSales } from '../../../lib/models/people';
import * as commentsActions from '../../actions/comments';
import * as resumesActions from '../../actions/resumes';
import Comments from '../../components/Comments';
import CommentsEditor from '../../components/CommentsEditor';
import { Header, HeaderLeft, HeaderRight } from '../../components/Header';
import SaveResume from '../../components/SaveResume';
import withRoutes from '../../hoc/routes';
import { getToken } from '../../selectors/auth';
import { getTenant } from '../../selectors/config';
import { getCommentsByResumeId, getLastTodo } from '../../selectors/comments';
import { getLoggedPerson, getPeople } from '../../selectors/people';
import { getResumeById, getResumes } from '../../selectors/resumes';
import { ArrowBack, ConfirmDeleting, Container, Menu, Spacer, UserName } from '../../widgets';
import { UserAvatar } from '../../widgets/Avatar';
import { MEDIUM } from '../../widgets/ChipStatus';
import { SMALL } from '../../widgets/ResumeStatus';
import { makeResumeFileUrl } from '../../utils';
import messages from './messages';
import Todo from './Todo';

const style = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    backgroundColor: 'rgba(0,0,0,0)',
    height: '100%',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  flexGrow: {
    flexGrow: 1,
  },
  grey: {
    color: 'grey',
  },
  bold: {
    fontWeight: 'bold',
  },
  iconHeader: {
    fontSize: 24,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  comment: {
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 1,
    paddingLeft: theme.spacing.unit * 1,
    display: 'flex',
    flexDirection: 'column',
  },
  left:{
    left: 0,
  },
  user:{
    maxWidth: '100%',
  },
  p:{
    maxWidth: '100%',
    overflow: 'hidden'
  }
});

export const Page = ({
  classes,
  isDeleted,
  setDeleting,
  isEditable,
  setEditable,
  actions,
  user,
  people,
  comments,
  resume,
  resumes,
  token,
  tenant,
  match: {
    params: { id },
  },
  routes,
  lastTodo,
  expanded,
  handleExpandClick,
}) => {
  if (!resumes.length) return false;
  if (resumes.length && !resume) return <Redirect to={routes.getDefaultRoute().path} />;
  const setDisabled = () => {
    if (isEditable) {
      if (isAdmin(user) || isSales(user) || isHeadHunter(user)) return false;
      return true;
    }
    return true;
  };
  return (
    <Container className={classes.root}>
      <Header>
        <HeaderLeft >
          <Grid item xs={12} sm={12} md={7} lg={7}> 
            <Grid container alignItems="center" className={classes.user} wrap="nowrap">
              <Grid item ><ArrowBack /></Grid>
              <Grid item ><UserAvatar user={resume} size={MEDIUM} /></Grid>    
              <Grid item ><Spacer size={SMALL} /></Grid>
              <Grid item ><UserName user={resume} withEllipsis/></Grid>
            </Grid>
          </Grid>
          <Grid item md={5} lg={5} className={classes.p}>
            <Hidden implementation="js" smDown >
              <Todo todo comment={lastTodo} people={people} isShownInComment={false} isResumePage/>
            </Hidden>
          </Grid>
        </HeaderLeft>
        <HeaderRight>
          <IconButton onClick={() => setEditable(true)} disabled={isEditable}>
            <EditIcon className={classes.iconHeader} />
          </IconButton>
          {(isAdmin(user) || isSales(user) || isHeadHunter(user)) && (
            <Menu size="MEDIUM">
              <Paper>
                <MenuList>
                  <MenuItem onClick={() => setDeleting(true)}>
                    <ListItemIcon>
                      <DeleteIcon />
                    </ListItemIcon>
                    <ListItemText>
                      <FormattedMessage {...messages.delete} />
                    </ListItemText>
                  </MenuItem>
                </MenuList>
              </Paper>
            </Menu>
          )}
        </HeaderRight>
      </Header>

      <Paper className={classes.paper} elevation={0}>
        <ConfirmDeleting
          open={isDeleted}
          onClose={setDeleting}
          remove={actions.deleteResume}
          resume={resume}
          to={routes.getPathByName('resumes')}
        />
        <SaveResume
          resume={resume}
          fileUrl={makeResumeFileUrl(tenant, token, resume)}
          isEditable={isEditable}
          setEditable={setEditable}
          actions={actions}
          user={user}
          IsStatusDisabled={setDisabled()}
        />
        <Divider />
        <CommentsEditor actions={actions} user={user} comment={{ entityId: id, entityType: 'resume' }} />
        <ExpansionPanel expanded={expanded}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} onClick={ () => handleExpandClick()}>
            {
              expanded ?
              <FormattedMessage {...messages.historyPanel} />
              :
              <Grid container direction="column" justify="space-around" alignItems="flex-start">
                <Grid item> <Todo comment={head(filter(comment => prop('event', comment) || prop('content', comment).length > 8,comments))} people={people} /></Grid>
              </Grid>
            }
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Comments
            comments={comments}
            actions={actions}
            user={user}
            people={people}
            id={comments[0] && comments[0].entityId}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Paper>
    </Container>
  );
};

Page.propTypes = {
  classes: PropTypes.object,
  isEditable: PropTypes.bool,
  setEditable: PropTypes.func,
  isDeleted: PropTypes.bool,
  setDeleting: PropTypes.func,
  history: PropTypes.object,
  actions: PropTypes.object,
  user: PropTypes.object,
  comments: PropTypes.array,
  resumes: PropTypes.array,
  routes: PropTypes.object,
  people: PropTypes.object,
  resume: PropTypes.object,
  token: PropTypes.string,
  tenant: PropTypes.string.isRequired,
  match: PropTypes.object,
  lastTodo: PropTypes.object,
  expanded: PropTypes.bool,
  handleExpandClick: PropTypes.func,
};

const withEdit = withStateHandlers(() => ({ isEditable: false }), {
  setEditable: () => value => ({ isEditable: value }),
});

const withDelete = withStateHandlers(() => ({ isDeleted: false }), {
  setDeleting: () => value => ({ isDeleted: value }),
});

const withExpand = withStateHandlers(() => ({ expanded: false }), {
  handleExpandClick : ({ expanded }) => () => ({ expanded: !expanded }),
});

const mapStateToProps = (state, ownProps) => ({
  user: getLoggedPerson(state),
  token: getToken(state),
  tenant: getTenant(state),
  people: getPeople(state),
  resume: getResumeById(ownProps.match.params.id)(state),
  resumes: getResumes(state),
  comments: getCommentsByResumeId(ownProps.match.params.id)(state),
  lastTodo: getLastTodo(ownProps.match.params.id)(state),
});

const actions = {
  deleteResume: resumesActions.del,
  updateResume: resumesActions.update,
  loadFile: resumesActions.viewFile,
  addComment: commentsActions.add,
  updateComment: commentsActions.update,
  deleteComment: commentsActions.del,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export const enhance = compose(
  withStyles(style),
  withEdit,
  withDelete,
  withExpand,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  lifecycle({
    componentDidMount() {
      const params = new URLSearchParams(prop('search', this.props.location));
      const mode =  params.get('mode');
      this.props.setEditable(equals(mode, 'edit'))
    },
  }),
  withRoutes,
);

export default enhance(Page);