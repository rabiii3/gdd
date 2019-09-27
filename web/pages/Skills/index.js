
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { compose } from 'ramda';
import React from 'react';
import { connect } from 'react-redux';
import { withStateHandlers } from 'recompose';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { bindActionCreators } from 'redux';
import AddIcon from '@material-ui/icons/Add';
import { Header, HeaderLeft, HeaderRight } from '../../components/Header';
import { isAdmin } from '../../../lib/models/people';
import withRoutes from '../../hoc/routes';
import * as skillsActions from '../../actions/skills'
import { getUser } from '../../selectors/auth';
import { getUsedSortedSkills } from '../../selectors/skills'
import { ArrowBack, Spacer, ConfirmDeletingSkill, ConfirmCreateEditSkill } from '../../widgets';
import { SMALL } from '../../widgets/ChipStatus';
import messages from './messages'
import { LARGE } from '../../widgets/Spacer';

const styles = theme => ({
  root: {
    height: '100vh',
    backgroundRepeat: 'no-repeat',
    backgroundImage: 'url(//www.gstatic.com/pantheon/images/marketplace/cameo_banner-1x.png)',
    backgroundSize: '100%',
  },
  button: {
    float: 'right',
    position: 'fixed',
    right: '30px',
    bottom: '30px',
  },
  iconButton: {
    fontSize: 24,
    color: 'grey',
  },
  iconStyle: {
    fontSize: '2rem',
    color: 'grey',
  },
  dialog: {
    width: '24rem',
  },
  tableCellSkillUsed: {
    paddingLeft: '1rem',
  },
  error: {
    paddingTop: '1rem',
    fontSize: '0.75rem',
    fontFamily: 'Roboto',
    color: '#f44336',
  },
  paper: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
});

export const Page = ({
  actions,
  classes,
  skills,
  enableCreateEditSkill,
  isCreateEditSkill,
  userLogged,
  isDeleted,
  setDeleting,
  selectedSkill,
  chooseThisSkill,
}) => {
  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item xs={12}>
        <Header>
          <HeaderLeft>
            <ArrowBack />
            <Spacer size={SMALL} />
            <Icon className={classNames(classes.iconStyle, 'fas fa-medal')} />
            <Spacer size={LARGE} />
            <FormattedMessage {...messages.title} />
          </HeaderLeft>
          <HeaderRight>
          </HeaderRight>
        </Header>

        <Dialog open={isCreateEditSkill}>
          <DialogTitle >
            {isCreateEditSkill === 1 ? <FormattedMessage {...messages.addDialogTitle} /> : <FormattedMessage {...messages.confirmEditingSkillDialogTitle} />}
          </DialogTitle>
          <DialogContent className={classes.dialog}>
            <ConfirmCreateEditSkill
              enableCreateEditSkill={enableCreateEditSkill}
              add={actions.addSkill}
              update={actions.updateSkill}
              chooseThisSkill={chooseThisSkill}
              skill={selectedSkill}
              skills={skills}
            />
          </DialogContent>
        </Dialog>

        <ConfirmDeletingSkill
          open={isDeleted}
          onClose={setDeleting}
          chooseThisSkill={chooseThisSkill}
          skill={selectedSkill}
          remove={actions.removeSkill}
          skills={skills}
        />
        <Tooltip title={<FormattedMessage {...messages.addDialogTitle} />}>
          <Fab
            color="secondary"
            className={classes.button}
            onClick={() => enableCreateEditSkill(1)}
            disabled={isCreateEditSkill}>
            <AddIcon />
          </Fab>
        </Tooltip>
        <br /> <br /> <br /> <br />
        <Paper className={classes.paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell >
                </TableCell>
                <TableCell>
                  {<FormattedMessage {...messages.title} />}
                </TableCell>
                <TableCell>
                  <FormattedMessage {...messages.skillsUsed} />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {skills.map((skill) => {
                return (
                  <TableRow key={skill._id}>
                    <TableCell >
                      <IconButton onClick={() => { chooseThisSkill(skill); setDeleting(true) }} disabled={!isAdmin(userLogged)}>
                        <DeleteIcon className={classes.iconButton} />
                      </IconButton>
                      <IconButton onClick={() => { chooseThisSkill(skill); enableCreateEditSkill(2) }} disabled={!isAdmin(userLogged)}>
                        <EditIcon className={classes.iconButton} />
                      </IconButton>
                    </TableCell>
                    <TableCell >
                      <InputBase value={skill.label} disabled />
                    </TableCell>
                    <TableCell variant="body">
                      <Typography className={classes.tableCellSkillUsed}>
                        {skill.counts ? skill.counts : '0'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
};

Page.propTypes = {
  match: PropTypes.object,
  classes: PropTypes.object,
  userLogged: PropTypes.object,
  enableCreateEditSkill: PropTypes.func,
  isCreateEditSkill: PropTypes.number,
  handleCapitalizeSkill: PropTypes.func,
  skills: PropTypes.array,
  actions: PropTypes.object,
  setDeleting: PropTypes.func,
  isDeleted: PropTypes.bool,
  selectedSkill: PropTypes.object,
  chooseThisSkill: PropTypes.func,
};

const withAdd = withStateHandlers(() => ({ isCreateEditSkill: 0 }), {
  enableCreateEditSkill: () => number => ({ isCreateEditSkill: number }),
});

const withDelete = withStateHandlers(() => ({ isDeleted: false }), {
  setDeleting: () => value => ({ isDeleted: value }),
});

const withSelectSkill = withStateHandlers(() => ({ selectedSkill: null }), {
  chooseThisSkill: () => value => ({ selectedSkill: value })
})

const actions = {
  addSkill: skillsActions.add,
  removeSkill: skillsActions.del,
  updateSkill: skillsActions.update,
};

const mapStateToProps = state => {
  return {
    userLogged: getUser(state),
    skills: getUsedSortedSkills(state),
  };
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export const enhance = compose(
  withStyles(styles),
  withRoutes,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withAdd,
  withDelete,
  withSelectSkill,
);

export default enhance(Page);
