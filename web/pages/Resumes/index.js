import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { compose, withStateHandlers, withState, withHandlers } from 'recompose';
import Popover from '@material-ui/core/Popover';
import Fab from '@material-ui/core/Fab';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import GridOn from '@material-ui/icons/GridOn';
import GridOff from '@material-ui/icons/GridOff';
import IconButton from '@material-ui/core/IconButton';
import SearchBar from 'material-ui-search-bar';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CloudUpload from '@material-ui/icons/CloudUpload';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';
import messages from './messages';
import Resumes from '../../components/Resumes';
import ResumesTable from '../../components/ResumesTable';
import {
  getFilteredAndSortedResumes,
  getSortMode,
  getSearchQuery,
  getShowTableView,
  getShowHiddenResumes,
} from '../../selectors/resumes';
import { getPeople } from '../../selectors/people';
import { getCountry } from '../../selectors/config';
import { viewFile, resumesSkillsFilter, resumesChipSkillFilter, updateQueryResumes, resetQueryResumes, del, addQueryResumes, setShowTableView, setShowHiddenResumes, sortResumes } from '../../actions/resumes';
import { Spacer, Container, Content } from '../../widgets';
import ResumeIcon from '../../widgets/ResumeIcon';
import Title from '../../widgets/Title';
import { Header, HeaderLeft, HeaderRight } from '../../components/Header';
import { getSkills } from '../../selectors/skills';
import withRoutes from '../../hoc/routes';

const styles = theme => ({
  root: {
    backgroundImage: 'url(//www.gstatic.com/pantheon/images/marketplace/cameo_banner-1x.png)',
    backgroundRepeat: 'no-repeat',
  },
  div: {
    margin: theme.spacing(1),
  },
  button: {
    float: 'right',
    position: 'fixed',
    right: '30px',
    bottom: '30px',
  },
  dropzone: {
    height: 'calc(100vh - 64px)',
    [theme.breakpoints.down('xs')]: {
      height: 'calc(100vh - 48px)',
    },
  },
  dropMessage: {
    marginTop: '10%',
  },
  onDrag: {
    borderStyle: 'dashed',
    borderWidth: 2,
  },
  accept: {
    backgroundColor: 'aliceblue',
  },
  reject: {
    backgroundColor: 'mistyrose',
  },
  badge: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(3),
  },
  menu: {
    marginLeft: '15%',
  },
  menuItem: {
    textTransform: 'capitalize',
  },
  popover: {
    minWidth: '8rem',
  },
  width: {
    flexGrow: 1,
  },
  boxShadow: {
    boxShadow: '0px 0px 0px 0px',
  }
});

export const Page = ({
  classes,
  isDropzoneOpen,
  setDropzone,
  resumes,
  people,
  intl,
  sortResumes,
  sortMode,
  setShowFilter,
  setCloseFilter,
  filter,
  history,
  actions,
  query,
  skills,
  routes,
  setShowTableView,
  setShowHiddenResumes,
  showTableView,
  isHidden,
}) => {
  let dropzoneRef;
  const MAXSIZE = 5000000;
  const ACCEPTED = 'application/pdf';
  return (
    <Container className={classes.root}>
      <Header>
        <HeaderLeft>
          <ResumeIcon />
          <Spacer size="MEDIUM" />
          <Title text={intl.formatMessage(messages.title)} />
        </HeaderLeft>
        <HeaderRight>
          <Hidden xsDown>
            <SearchBar
              placeholder={intl.formatMessage(messages.search)}
              value={query}
              onChange={event => actions.updateQueryResumes(event)}
              onCancelSearch={() => actions.resetQueryResumes()}
              className={classNames(query && classes.width, classes.boxShadow)}
            />
            {showTableView ? (
              <Tooltip title={<FormattedMessage {...messages.cardMode} />}>
                <IconButton onClick={() => setShowTableView(false)}>
                  <GridOff />
                </IconButton>
              </Tooltip>
            ) : (
                <Tooltip title={<FormattedMessage {...messages.tableMode} />}>
                  <IconButton onClick={() => setShowTableView(true)}>
                    <GridOn />
                  </IconButton>
                </Tooltip>
              )}
          </Hidden>
          <IconButton
            aria-label="More"
            aria-owns={filter ? 'long-menu' : null}
            aria-haspopup="true"
            onClick={setShowFilter}
          >
            <MoreVertIcon />
          </IconButton>
          <Popover
            anchorEl={filter}
            open={Boolean(filter)}
            onClose={setCloseFilter}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem className={classes.popover}>
              <Typography variant="button">
                <FormattedMessage {...messages.sortBy} />
              </Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => sortResumes('author')} selected={sortMode.sortBy === 'author'}>
              {sortMode.sortBy === 'author' && sortMode.direction === 'desc' && <ArrowDropDown />}
              {sortMode.sortBy === 'author' && sortMode.direction === 'asc' && <ArrowDropUp />}
              <Typography>
                <FormattedMessage {...messages.author} />
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => sortResumes('award')} selected={sortMode.sortBy === 'award'}>
              {sortMode.sortBy === 'award' && sortMode.direction === 'desc' && <ArrowDropDown />}
              {sortMode.sortBy === 'award' && sortMode.direction === 'asc' && <ArrowDropUp />}
              <Typography>
                <FormattedMessage {...messages.award} />
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => sortResumes('candidate')} selected={sortMode.sortBy === 'candidate'}>
              {sortMode.sortBy === 'candidate' && sortMode.direction === 'desc' && <ArrowDropDown />}
              {sortMode.sortBy === 'candidate' && sortMode.direction === 'asc' && <ArrowDropUp />}
              <Typography>
                <FormattedMessage {...messages.candidate} />
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => sortResumes('createdAt')} selected={sortMode.sortBy === 'createdAt'}>
              {sortMode.sortBy === 'createdAt' && sortMode.direction === 'desc' && <ArrowDropDown />}
              {sortMode.sortBy === 'createdAt' && sortMode.direction === 'asc' && <ArrowDropUp />}
              <Typography>
                <FormattedMessage {...messages.createdAt} />
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => sortResumes('email')} selected={sortMode.sortBy === 'email'}>
              {sortMode.sortBy === 'email' && sortMode.direction === 'desc' && <ArrowDropDown />}
              {sortMode.sortBy === 'email' && sortMode.direction === 'asc' && <ArrowDropUp />}
              <Typography>
                <FormattedMessage {...messages.email} />
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => sortResumes('phoneNumber')} selected={sortMode.sortBy === 'phoneNumber'}>
              {sortMode.sortBy === 'phoneNumber' && sortMode.direction === 'desc' && <ArrowDropDown />}
              {sortMode.sortBy === 'phoneNumber' && sortMode.direction === 'asc' && <ArrowDropUp />}
              <Typography>
                <FormattedMessage {...messages.phoneNumber} />
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => sortResumes('rating')} selected={sortMode.sortBy === 'rating'}>
              {sortMode.sortBy === 'rating' && sortMode.direction === 'desc' && <ArrowDropDown />}
              {sortMode.sortBy === 'rating' && sortMode.direction === 'asc' && <ArrowDropUp />}
              <Typography>
                <FormattedMessage {...messages.rating} />
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => sortResumes('skills')} selected={sortMode.sortBy === 'skills'}>
              {sortMode.sortBy === 'skills' && sortMode.direction === 'desc' && <ArrowDropDown />}
              {sortMode.sortBy === 'skills' && sortMode.direction === 'asc' && <ArrowDropUp />}
              <Typography>
                <FormattedMessage {...messages.skills} />
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => sortResumes('status')} selected={sortMode.sortBy === 'status'}>
              <Typography>
                <FormattedMessage {...messages.status} />
              </Typography>
              {sortMode.sortBy === 'status' && sortMode.direction === 'desc' && <ArrowDropDown />}
              {sortMode.sortBy === 'status' && sortMode.direction === 'asc' && <ArrowDropUp />}
            </MenuItem>
            <MenuItem onClick={() => sortResumes('toDo')} selected={sortMode.sortBy === 'toDo'}>
              {sortMode.sortBy === 'toDo' && sortMode.direction === 'desc' && <ArrowDropDown />}
              {sortMode.sortBy === 'toDo' && sortMode.direction === 'asc' && <ArrowDropUp />}
              <Typography>
                <FormattedMessage {...messages.toDo} />
              </Typography>
            </MenuItem>

            <Divider />
            <MenuItem onClick={() => setShowHiddenResumes(true)}>
              <Typography>
                {isHidden ? <FormattedMessage {...messages.exposed} /> : <FormattedMessage {...messages.hidden} />}
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => actions.resetQueryResumes()}>
              <Typography>
                <FormattedMessage {...messages.clearFilter} />
              </Typography>
            </MenuItem>
          </Popover>
        </HeaderRight>
      </Header>
      <Content>
        <Dropzone
          accept={`${ACCEPTED}`}
          maxSize={MAXSIZE}
          className={classes.dropzone}
          disableClick
          onDropAccepted={file => {
            history.push({ pathname: routes.getPathByName('addResume'), state: { file: file[0] } });
          }}
          onDragEnter={() => setDropzone(true)}
          onDragLeave={() => setDropzone(false)}
          acceptClassName={classNames(classes.onDrag, classes.accept)}
          rejectClassName={classNames(classes.onDrag, classes.reject)}
          ref={node => {
            dropzoneRef = node;
          }}
          onDrop={(accepted, rejected) => {
            if (rejected.length > 0) {
              setDropzone(false);
              if (rejected[0].type !== ACCEPTED) {
                alert('This file is not a pdf and is therefore rejected');
              } else if (rejected[0].size > MAXSIZE) {
                alert(`Accepted file must be under ${MAXSIZE} bytes, this file is actually ${rejected[0].size} bytes`);
              }
            }
          }}
        >
          {isDropzoneOpen || !resumes.length ? (
            <Grid container justify="center" alignItems="center">
              <Grid item xs={12}>
                <Typography className={classes.dropMessage} variant="h4" align="center">
                  { resumes.length ? <FormattedMessage {...messages.drag} /> : <FormattedMessage {...messages.firstDrag} /> }
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4" align="center">
                  <CloudUpload className={classes.icon} />
                </Typography>
              </Grid>
            </Grid>
          ) : (
              <React.Fragment>
                {showTableView ? (
                  <ResumesTable
                    sortResumes={sortResumes}
                    sortMode={sortMode}
                    actions={actions}
                    resumes={resumes}
                    people={people}
                    skills={skills}
                  />
                  
                ) : (
                    <Resumes actions={actions} resumes={resumes} people={people} skills={skills} />
                  )}
                <Tooltip title={<FormattedMessage {...messages.addResume} />}>
                  <Fab
                    color="secondary"
                    className={classes.button}
                    size="small"
                    mini="true"
                    onClick={() => {
                      dropzoneRef.open();
                    }}
                  >
                    <AddIcon />
                  </Fab>
                </Tooltip>
              </React.Fragment>
            )}
        </Dropzone>
      </Content>
    </Container>
  );
};

Page.propTypes = {
  classes: PropTypes.object,
  setFile: PropTypes.func,
  setDropzone: PropTypes.func,
  isDropzoneOpen: PropTypes.bool,
  intl: intlShape,
  file: PropTypes.array,
  resumes: PropTypes.array,
  people: PropTypes.object,
  addForm: PropTypes.func,
  updateQueryResumes: PropTypes.func,
  addQueryResumes: PropTypes.func,
  resetQueryResumes: PropTypes.func,
  sortResumes: PropTypes.func,
  dateSort: PropTypes.object,
  resumesStatusSort: PropTypes.func,
  statusSort: PropTypes.string,
  resumesCandidateSort: PropTypes.func,
  resumesWorkerSort: PropTypes.func,
  candidateSort: PropTypes.string,
  workerSort: PropTypes.string,
  setShowFilter: PropTypes.func,
  setCloseFilter: PropTypes.func,
  showFilterMenu: PropTypes.bool,
  filter: PropTypes.object,
  sortMode: PropTypes.object,
  actions: PropTypes.object,
  query: PropTypes.string,
  skills: PropTypes.object,
  routes: PropTypes.object,
  setShowTableView: PropTypes.func,
  showTableView: PropTypes.bool.isRequired,
  setShowHiddenResumes: PropTypes.func,
  isHidden: PropTypes.bool,
  history: PropTypes.object,
};

const withHide = withStateHandlers(() => ({ isDropzoneOpen: false }), {
  setDropzone: () => bool => ({ isDropzoneOpen: bool }),
});

const withFilter = withState('filter', 'handleFilter', null);
const withFilterHandlers = withHandlers({
  setShowFilter: ({ handleFilter }) => event => handleFilter(event.currentTarget),
  setCloseFilter: ({ handleFilter }) => () => handleFilter(null),
});

const withFilterMenu = withState('showFilterMenu', 'handleShowFilterMenu', false);
const withFilterMenuHandlers = withHandlers({
  setShowFilterMenu: ({ handleShowFilterMenu }) => () => handleShowFilterMenu(showFilterMenu => !showFilterMenu),
});

const mapStateToProps = createStructuredSelector({
  resumes: getFilteredAndSortedResumes,
  people: getPeople,
  country: getCountry,
  sortMode: getSortMode,
  query: getSearchQuery,
  skills: getSkills,
  showTableView: getShowTableView,
  isHidden: getShowHiddenResumes,
});

const actions = {
  loadFile: viewFile,
  resumesSkillsFilter,
  resumesChipSkillFilter,
  updateQueryResumes,
  resetQueryResumes,
  deleteResume: del,
};

const mapDispatchToProps = dispatch => ({
  actions: {
    ...bindActionCreators(actions, dispatch),
    addQueryResumes: tag => (...params) => dispatch(addQueryResumes(tag)(...params)),
  },
  sortResumes: typeSort => dispatch(sortResumes(typeSort)),
  setShowTableView: showTableView => dispatch(setShowTableView(showTableView)),
  setShowHiddenResumes: showHiddenResumes => dispatch(setShowHiddenResumes(showHiddenResumes)),
});

export const enhance = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  injectIntl,
  withHide,
  withFilter,
  withFilterHandlers,
  withFilterMenu,
  withFilterMenuHandlers,
  withStyles(styles),
  withRoutes,
);

export default enhance(Page);
