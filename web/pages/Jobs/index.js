import React from 'react';
import PropTypes from 'prop-types';
import { map, prop, propEq } from 'ramda';
import { compose, withStateHandlers, lifecycle } from 'recompose';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Work from '@material-ui/icons/Work';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Hidden from '@material-ui/core/Hidden';

import { Header, HeaderLeft, HeaderRight } from '../../components/Header';
import { Container, Content, Spacer } from '../../widgets';
import messages from './messages';
import withRoutes from '../../hoc/routes';
import { isAdmin, isHeadHunter, isSales } from '../../../lib/models/people';
import { getPeople } from '../../selectors/people';
import { getUser } from '../../selectors/auth';
import { getSkills } from '../../selectors/skills';
import Row from './Row';
import { loadAll, del, sortJobs } from '../../actions/jobs';
import { getSortedJobs, getSortMode, TITLE, SKILLS, AUTHOR, CREATED_AT } from '../../selectors/jobs';

const styles = {
  root: {
    backgroundImage: 'url(//www.gstatic.com/pantheon/images/marketplace/cameo_banner-1x.png)',
    backgroundRepeat: 'no-repeat',
  },
  paper: {
    height: 'auto',
    margin: '3em auto', 
    overflowX: 'auto',
  },
  icon: {
    fontSize: '1.3em',
    width: 'unset',
    color: 'grey',
  },
  tableCell:{
    width: '2rem'
  }
};

export const Jobs = ({ 
  classes, 
  history, 
  routes, 
  user, 
  sortedJobs, 
  deleteJob, 
  skills, 
  selectedJob, 
  handleSelectedJob, 
  sortJobs, 
  sortMode, 
  people }) => {
  return (
    <Container className={classes.root}>

      <Header>
        <HeaderLeft>
          <Work className={classes.icon}/>
          <Spacer size="MEDIUM" />
          <Typography variant="h6" noWrap>
            <FormattedMessage {...messages.title}/>
          </Typography>
        </HeaderLeft>
        <HeaderRight>
          <Hidden xsUp={!isAdmin(user) && !isHeadHunter(user) && !isSales(user)}>
            <Button size="small" color="primary" component={Link} to={routes.getPathByName('addJob')}>
              <AddIcon/> 
                <Typography color="inherit" noWrap>
                  <FormattedMessage {...messages.addJobDescription} />   
                </Typography>
            </Button>
          </Hidden>
        </HeaderRight>
      </Header>

      <Content>
      <Paper className={classes.paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <Tooltip title={<FormattedMessage {...messages.jobTitleTooltip}/>}>
                <TableCell align="center" className={classes.tableCell}>
                  <TableSortLabel
                    active={propEq('sortBy', TITLE, sortMode)}
                    direction={prop('direction',sortMode)}
                    onClick={() => sortJobs(TITLE) }>
                    <FormattedMessage {...messages.jobTitle}/>
                  </TableSortLabel>
                </TableCell>
              </Tooltip>
              <Tooltip title={<FormattedMessage {...messages.skillsTooltip}/>}>
                <TableCell align="center" className={classes.tableCell}>
                  <TableSortLabel
                    active={propEq('sortBy', SKILLS, sortMode)}
                    direction={prop('direction',sortMode)}
                    onClick={() => sortJobs(SKILLS) }>
                    <FormattedMessage {...messages.skills}/>
                  </TableSortLabel>
                </TableCell>
              </Tooltip>
              <Tooltip title={<FormattedMessage {...messages.authorTooltip}/>}>
                <TableCell align="center" className={classes.tableCell}>
                  <TableSortLabel
                    active={propEq('sortBy', AUTHOR, sortMode)}
                    direction={prop('direction',sortMode)}
                    onClick={() => sortJobs(AUTHOR) }>
                    <FormattedMessage {...messages.author}/>
                  </TableSortLabel>
                </TableCell>
              </Tooltip>
              <Tooltip title={<FormattedMessage {...messages.createdAtTooltip}/>}>
                <TableCell align="center" className={classes.tableCell}>
                  <TableSortLabel
                    active={propEq('sortBy', CREATED_AT, sortMode)}
                    direction={prop('direction',sortMode)}
                    onClick={() => sortJobs(CREATED_AT) }>
                    <FormattedMessage {...messages.createdAt}/>
                  </TableSortLabel>
                </TableCell>
              </Tooltip> 
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {map( job =>
            <Row key={prop('_id', job)} 
              job={job} 
              skills={skills} 
              routes={routes} 
              user={user}
              people={people}
              selectedJob={selectedJob}
              handleSelectedJob={handleSelectedJob}
              history={history}
              deleteJob={deleteJob}/>
            ,sortedJobs)}
          </TableBody>
        </Table>
      </Paper>  
      </Content>  
    </Container>
  )
};

Jobs.propTypes = {
  classes: PropTypes.object,
  routes: PropTypes.object,
  showMoreSkills: PropTypes.bool,
  toggleShowMoreSkills: PropTypes.func,
  user: PropTypes.object,
  people: PropTypes.object,
  sortedJobs: PropTypes.array,
  skills: PropTypes.object,
  handleSelectedJob: PropTypes.func,
  selectedJob: PropTypes.string,
  history: PropTypes.object,
  sortJobs: PropTypes.func,
  sortMode: PropTypes.object,
  deleteJob: PropTypes.func,
};

const withSelectedJob = withStateHandlers(() => ({ selectedJob: null }), {
  handleSelectedJob: () => id => ({ selectedJob: id })
});

const mapStateToProps = state => ({
  user: getUser(state),
  people: getPeople(state),
  skills: getSkills(state),
  sortMode: getSortMode(state),
  sortedJobs: getSortedJobs(state),
});

const mapDispatchToProps = dispatch => ({
  loadJobs: () => dispatch(loadAll()),
  deleteJob: job => dispatch(del(job)),
  sortJobs: typeSort => dispatch(sortJobs(typeSort)),
})

export const enhance = compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  lifecycle({
    componentDidMount() {
      const { loadJobs } = this.props;
      loadJobs();
    }
  }),
  withRoutes,
  withSelectedJob,
);
export default enhance(Jobs);