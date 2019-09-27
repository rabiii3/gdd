import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { prop, propEq, path, equals, slice } from 'ramda';
import { compose, withStateHandlers } from 'recompose';
import { FormattedMessage, FormattedRelative } from 'react-intl';


import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { withStyles } from '@material-ui/core/styles';

import messages from './messages';
import SkillsChip from '../../widgets/SkillsChip';
import { UserAvatar, SMALL } from '../../widgets/Avatar';
import { getSkillsLabels } from '../../../lib/models/skills';
import ConfirmDeletingJob from '../../widgets/ConfirmDeletingJob';
import { isAdmin, isHeadHunter } from '../../../lib/models/people';

const styles = {
  tableCell:{
    width: '7em',
  },
};

const Row = ({ 
  classes, 
  history, 
  job, 
  showMoreSkills, 
  toggleShowMoreSkills, 
  skills, 
  routes, 
  user, 
  people, 
  selectedJob, 
  handleSelectedJob, 
  handleDeletingJob, 
  deletingJob, 
  deleteJob }) => {

  const SKILLS = getSkillsLabels(skills, job);
  return (
    <React.Fragment>
    <TableRow
      key={prop('_id',job)} 
      hover 
      selected={propEq('_id', selectedJob, job)} 
      onClick={() => handleSelectedJob(prop('_id',job))}>
      <TableCell align="center" className={classes.tableCell}>
        <Typography align="center">{prop('title',job)}</Typography>
      </TableCell>
      <TableCell className={classes.tableCell}>
        {!showMoreSkills ?
          <Grid container direction="row" justify="flex-start" alignItems="center">
            <Grid item container xs={SKILLS[2] ? 8 : 12}>
              <SkillsChip skills={slice(0,2,SKILLS)}/>
            </Grid>
            <Grid container item xs={4}>
              {SKILLS[2] &&
                  <Tooltip
                    title={<FormattedMessage {...messages.showMore} />}
                  >
                    <IconButton onClick={toggleShowMoreSkills}>
                        <ExpandMoreIcon/>
                    </IconButton>
                  </Tooltip>
                }
            </Grid>
          </Grid>
          :
          <Grid container direction="row" justify="flex-start" alignItems="center">
            <Grid item xs={8}>
              <SkillsChip
                skills={SKILLS}
              />
            </Grid>
            <Grid item xs={4}>
              {SKILLS[2] &&
                <Tooltip
                  title={<FormattedMessage {...messages.showLess} />}
                >
                  <IconButton onClick={toggleShowMoreSkills}>
                      <ExpandLessIcon />
                  </IconButton>
                </Tooltip>
              }
            </Grid>
          </Grid>
          }
      </TableCell>
      <TableCell align="center" className={classes.tableCell}>
        <UserAvatar 
          to={routes.getPathByName('person', prop('createdBy', job))}
          user={people[prop('createdBy', job)]}
          size={SMALL}
          showTooltip
        />
      </TableCell>
      <TableCell align="center" className={classes.tableCell}>
        {prop('createdAt',job) && <FormattedRelative value={prop('createdAt', job)} />}
      </TableCell>
      <TableCell className={classes.tableCell}>
        <Grid container direction="row" justify="center" alignItems="center" wrap="nowrap">
          <Hidden xsUp={!isAdmin(user) && !isHeadHunter(user) && !equals(path(['author', '_id'],user), prop('_id',user))}>
            <Grid item>
              <Tooltip title={<FormattedMessage {...messages.editTooltip} />}>
                <IconButton component={Link} to={{pathname:routes.getPathByName('updateJob',prop('_id', job)), search:'?mode=edit'}}><EditIcon /></IconButton>
              </Tooltip>
            </Grid>
          </Hidden>
          <Hidden xsUp={!isAdmin(user) && !isHeadHunter(user)}>
            <Grid item>
              <Tooltip title={<FormattedMessage {...messages.deleteTooltip} />}>
                <IconButton size="small" onClick={() => handleDeletingJob()} ><DeleteIcon/></IconButton>
              </Tooltip>
            </Grid>
          </Hidden>
          <Hidden xsUp={!isAdmin(user) && !isHeadHunter(user) && !equals(path(['author', '_id'],user), prop('_id',user))}>
            <Grid item>
              <Tooltip title={<FormattedMessage {...messages.visualizeTooltip} />}>
                <IconButton size="small" onClick={() => history.push(routes.getPathByName('updateJob',prop('_id', job)))}  ><RemoveRedEye/></IconButton>
              </Tooltip>
            </Grid>
          </Hidden>
        </Grid>
      </TableCell>
    </TableRow>
    <ConfirmDeletingJob open={deletingJob} onClose={handleDeletingJob} job={job} del={deleteJob}/>
    </React.Fragment>
  )
};

Row.propTypes = {
  classes: PropTypes.object,
  job: PropTypes.object,
  showMoreSkills: PropTypes.bool,
  toggleShowMoreSkills: PropTypes.func,
  skills: PropTypes.object,
  routes: PropTypes.object,
  user: PropTypes.object,
  people: PropTypes.object,
  handleSelectedJob: PropTypes.func,
  selectedJob: PropTypes.string,
  deletingJob: PropTypes.bool,
  handleDeletingJob: PropTypes.func,
  history: PropTypes.object,
  deleteJob: PropTypes.func,
};

const withDeletingJob = withStateHandlers(() => ({deletingJob: false}), {
  handleDeletingJob : ({deletingJob}) => () => ({ deletingJob: !deletingJob }),
});

const withMoreSkills = withStateHandlers(() => ({ showMoreSkills: false }), {
  toggleShowMoreSkills: ({ showMoreSkills }) => () => ({ showMoreSkills: !showMoreSkills })
});

const enhance = compose(
  withStyles(styles),
  withDeletingJob,
  withMoreSkills,
);
export default enhance(Row);
