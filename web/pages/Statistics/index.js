import React from 'react';
import PropTypes from 'prop-types';
import { compose, not } from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CSVLink } from "react-csv";
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames';
import 'react-infinite-calendar/styles.css';
import { createStructuredSelector } from 'reselect';
import Hidden from '@material-ui/core/Hidden';
import Tooltip from '@material-ui/core/Tooltip';
import withWidth from '@material-ui/core/withWidth';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import GridOn from '@material-ui/icons/GridOn';
import GridOff from '@material-ui/icons/GridOff';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import toRenderProps from 'recompose/toRenderProps';
import { getPeople } from '../../selectors/people';
import { getSkills } from '../../selectors/skills';
import { TAGS } from '../../utils/tags';
import { ArrowBack, Spacer, Container } from '../../widgets';
import { Header, HeaderLeft } from '../../components/Header';
import messages from './messages';
import { SMALL } from '../../widgets/Spacer';
import { Title } from '../../widgets/Title';
import { getSkillsUsedByDate, getResumesByAuthorForChart, getStatusUsedByDate, getResumesWithStatus, getShowResumesByCollabTable, getActiveKoopter, getProductiveKoopter } from '../../selectors/statistics';
import Content from '../../widgets/Content';
import TableResumeByCollaborator from './TableResumeByCollaborator/index';
import { updateQueryStatisticsResumes } from '../../actions/resumes';
import { setShowResumesByCollabTable } from '../../actions/statistics';
import StatistiqueFilter from './StatistiqueFilter';
import PieChart from '../../widgets/PieChart';
import withRoutes from '../../hoc/routes';
import { MonitorPeriode } from './MonitorPeriode/index';


const headers = [
  { label: "Collaborator", key: "name" },
  { label: "Number of resume", key: "all" },
  { label: "Pending", key: "pending" },
  { label: "Acepted", key: "acepted" },
  { label: "Hired", key: "hired" },
  { label: "Checking", key: "checking" },
];
const styles = theme => ({
  root: {
    height: '100vh',
    backgroundRepeat: 'no-repeat',
    backgroundImage: 'url(//www.gstatic.com/pantheon/images/marketplace/cameo_banner-1x.png)',
    backgroundSize: '100%',
  },
  iconStyle: {
    fontSize: '2rem',
    color: 'grey',
  },
  padding: {
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(2),
    }
  },
  iconTrophy: {
    fontSize: '1.5rem',
    color: 'grey',
    width: 40
  },
  margin: {
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(8),
      margin: theme.spacing(3),
    }
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
  helper: {
    [theme.breakpoints.up('md')]: {
      borderLeft: `2px solid ${theme.palette.divider}`,
    }
  },
  backgroundChart: {
    background: '#f8f8f8'
  },
  grey: {
    color: 'grey',
  },
  paddingTop: {
    paddingTop: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(4)
    }
  },
  skills: {
    [theme.breakpoints.up('md')]: {
      marginRight: 8,
      flexGrow: 1
    },
    marginBottom: 8,
    flexGrow: 1
  },
  status: {
    [theme.breakpoints.up('md')]: {
      marginLeft: 8,
      flexGrow: 1
    },
    marginBottom: 8,
    flexGrow: 1
  },
  marginChart: {
    [theme.breakpoints.down('md')]: {
      marginRight: 8,
      marginBottom: 8,
      marginLeft: 8,
    }
  }
});

export const Page = ({ people, classes, intl, skills, resumeByCollaborator, actions, status, resumesWithStatus,
  setShowResumesByCollabTable, showResumesByCollabTable, activeKoopter, productiveKoopter, routes }) => {
  const WithWidth = toRenderProps(withWidth());
  const XS = 'xs';
  const resumesWithStatusTableData = [];
  resumesWithStatus.map(resume => resume && resumesWithStatusTableData.push(resume[1]));
  return (
    <Container className={classes.root}>
      <Header>
        <HeaderLeft>
          <ArrowBack />
          <Spacer size={SMALL} />
          <Icon className={classNames(classes.iconStyle, 'fas fa-chart-bar')} />
          <Spacer size="MEDIUM" />
          <Title text={intl.formatMessage(messages.title)} />
        </HeaderLeft>
      </Header>
      <Content>
        <Paper className={classNames(classes.padding, classes.margin)}>
          <Grid container direction="row" alignItems="stretch" justify="center" >

            <Grid item xs={12} lg={2} xl={1} >
              <Hidden smUp>
                <StatistiqueFilter />
              </Hidden>
              <Hidden xsDown>
                <MonitorPeriode people={people}
                  productiveKoopter={productiveKoopter}
                  activeKoopter={activeKoopter}
                  routes={routes}
                  classes={classes} />
              </Hidden>
            </Grid>

            <Grid item xs={12} lg={7} xl={9} className={classNames(classes.padding, classes.helper, classes.marginChart)}>
              <Grid container direction="column" className={classes.backgroundChart}>
                  <Grid item container direction="row" alignItems="center" justify="space-between" >
                    <Grid item>
                      <Typography variant="h6" className={classes.padding} >
                        <FormattedMessage {...messages.resumeByCollaborator} />
                      </Typography>
                    </Grid>
                    {!not(resumeByCollaborator.length) && 
                    <Grid item>
                      <Tooltip title={<FormattedMessage {...messages.excel} />}>
                        <CSVLink data={resumesWithStatusTableData} headers={headers}>
                          <IconButton className={classNames(`far fa-file-excel`, classes.grey)} />
                        </CSVLink>
                      </Tooltip>
                      <Hidden mdDown>
                        {showResumesByCollabTable ?
                          <Tooltip title={<FormattedMessage {...messages.hiddenTable} />}>
                            <IconButton onClick={() => setShowResumesByCollabTable(false)}>
                              <GridOff />
                            </IconButton>
                          </Tooltip>
                          : 
                          <Tooltip title={<FormattedMessage {...messages.showTable} />}>
                            <IconButton onClick={() => setShowResumesByCollabTable(true)}>
                              <GridOn />
                            </IconButton>
                          </Tooltip>
                        }
                      </Hidden>
                    </Grid>}
                  </Grid>
                <Grid item>
                  <Grid container direction="row" alignItems="center" justify="center">
                    <WithWidth>
                      {({ width }) => (resumeByCollaborator.length ? <PieChart
                        data={resumeByCollaborator}
                        width={width === XS ? 300 : 450}
                        height={width === XS ? 300 : 450}
                        action={actions.updateQueryStatisticsResumes(TAGS.author)}
                      />
                        :
                        <Typography variant="caption" className={classes.grey}><FormattedMessage {...messages.noResult} /> </Typography>
                      )}
                    </WithWidth>
                    {showResumesByCollabTable && <TableResumeByCollaborator resumesWithStatus={resumesWithStatusTableData} />}
                  </Grid>
                </Grid>
              </Grid>
              <Grid container direction="row" alignItems="center" justify="center" className={classes.marginTop} >
                <Grid item xs={12} >
                  <Grid container direction="row" alignItems="stretch" justify="space-between">
                    <Grid item className={classNames(classes.backgroundChart, classes.skills)} >
                      <Typography variant="h6" className={classes.padding} >
                        <FormattedMessage {...messages.skills} />
                      </Typography>
                      <Grid container direction="row" alignItems="center" justify="center">
                        <WithWidth>
                          {({ width }) => <PieChart
                            data={skills}
                            width={width === XS ? 300 : 450}
                            height={width === XS ? 300 : 450}
                            action={actions.updateQueryStatisticsResumes(TAGS.skill)}
                          />}
                        </WithWidth>
                      </Grid>
                    </Grid>
                    <Grid item className={classNames(classes.backgroundChart, classes.status)}>
                      <Typography variant="h6" className={classes.padding} >
                        <FormattedMessage {...messages.status} />
                      </Typography>
                      <Grid container direction="row" alignItems="center" justify="center">
                        <WithWidth>
                          {({ width }) => (
                            <PieChart
                              data={status}
                              width={width === XS ? 300 : 450}
                              height={width === XS ? 300 : 450}
                              action={actions.updateQueryStatisticsResumes(TAGS.status)}
                            />
                          )}
                        </WithWidth>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} lg={3} xl={2} className={classNames(classes.padding, classes.helper)}>
              <Hidden smUp>
                <MonitorPeriode people={people}
                  productiveKoopter={productiveKoopter}
                  activeKoopter={activeKoopter}
                  routes={routes}
                  classes={classes} />
              </Hidden>
              <Hidden xsDown>
                <StatistiqueFilter />
              </Hidden>
            </Grid>

          </Grid>
        </Paper>
      </Content>
    </Container>
  );
};

Page.propTypes = {
  classes: PropTypes.object,
  intl: intlShape,
  skills: PropTypes.array,
  resumeByCollaborator: PropTypes.array,
  actions: PropTypes.object,
  resumesById: PropTypes.object,
  status: PropTypes.array,
  resumesWithStatus: PropTypes.array,
  setShowResumesByCollabTable: PropTypes.func,
  hiredAndConfirmedResumes: PropTypes.array,
  routes: PropTypes.object,
  activeKoopter: PropTypes.array,
  productiveKoopter: PropTypes.array,
  people: PropTypes.object,
  showResumesByCollabTable: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  skills: getSkillsUsedByDate,
  resumeByCollaborator: getResumesByAuthorForChart,
  resumesWithStatus: getResumesWithStatus,
  status: getStatusUsedByDate,
  showResumesByCollabTable: getShowResumesByCollabTable,
  people: getPeople,
  allSkills: getSkills,
  activeKoopter: getActiveKoopter,
  productiveKoopter: getProductiveKoopter,
});
const actions = {
  updateQueryStatisticsResumes,
};

const mapDispatchToProps = dispatch => ({
  actions: {
    ...bindActionCreators(actions, dispatch),
    updateQueryStatisticsResumes: tag => (...params) => dispatch(updateQueryStatisticsResumes(tag)(...params)),
  },
  setShowResumesByCollabTable: showTableView => dispatch(setShowResumesByCollabTable(showTableView)),
});

export const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withWidth(),
  injectIntl,
  withRoutes,
);

export default enhance(Page);