import React from 'react';
import { compose, propOr } from 'ramda';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import { withStateHandlers } from 'recompose';
import connect from 'react-redux/lib/connect/connect';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table/Table';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableBody from '@material-ui/core/TableBody/TableBody';
import TableFooter from '@material-ui/core/TableFooter/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel/TableSortLabel';
import TablePaginationActions from '../../widgets/TablePaginationActions';
import withRoutes from '../../hoc/routes';
import { getToken } from '../../selectors/auth';
import { getTenant } from '../../selectors/config';
import Preview from './TableBody';
import messages from './messages';
import { makeResumeFileUrl } from '../../utils';
import { getLastTodo } from '../../selectors/comments';

const style = theme => ({
  root: {
    width: '98%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    margin: theme.spacing.unit * 2,
  },
  table: {
    minWidth: 700,
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});
const STATUS = 'status';
const AUTHOR = 'author';
const CANDIDATE = 'candidate';
const RATING = 'rating';
const EMAIL = 'email'
const SKILLS = 'skills';
const PHONENUMBER = 'phoneNumber'
const TODO = 'toDo'
const CREATED_AT = 'createdAt'
const AWARD = 'award'

export const Component = ({ tenant, token, classes, resumes, people, actions, skills, sortResumes, sortMode, rowsPerPage, page, toggleRows, togglePage, getEntity }) => {
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell padding="none"/>
            <TableCell align="left" >
              <React.Fragment>
                <Tooltip
                  title={<FormattedMessage {...messages.sort} />}
                >
                  <TableSortLabel
                    active={sortMode.sortBy === CANDIDATE}
                    direction={sortMode.direction}
                    onClick={() => sortResumes(CANDIDATE)}
                  >
                    <FormattedMessage {...messages.candidate} />
                  </TableSortLabel>
                </Tooltip>
              </React.Fragment>
            </TableCell>
            <TableCell align="left">
              <React.Fragment>
                <Tooltip
                  title={<FormattedMessage {...messages.sort} />}
                >
                  <TableSortLabel
                    active={sortMode.sortBy === PHONENUMBER}
                    direction={sortMode.direction}
                    onClick={() => sortResumes(PHONENUMBER)}
                  >
                    <FormattedMessage {...messages.phoneNumber} />
                  </TableSortLabel>
                </Tooltip>
              </React.Fragment>
            </TableCell>
            <TableCell align="left" >
              <React.Fragment>
                <Tooltip title={<FormattedMessage {...messages.sort} />} >
                  <TableSortLabel
                    active={sortMode.sortBy === EMAIL}
                    direction={sortMode.direction}
                    onClick={() => sortResumes(EMAIL)}
                  >
                    <FormattedMessage {...messages.email} />
                  </TableSortLabel>
                </Tooltip>
              </React.Fragment>
            </TableCell>
            <TableCell align="left">
              <React.Fragment>
                <Tooltip
                  title={<FormattedMessage {...messages.sort} />}
                >
                  <TableSortLabel
                    active={sortMode.sortBy === SKILLS}
                    direction={sortMode.direction}
                    onClick={() => sortResumes(SKILLS)}
                  >
                    <FormattedMessage {...messages.skills} />
                  </TableSortLabel>
                </Tooltip>
              </React.Fragment>
            </TableCell>
            <TableCell align="left">
              <React.Fragment>
                <Tooltip
                  title={<FormattedMessage {...messages.sort} />}
                >
                  <TableSortLabel
                    active={sortMode.sortBy === STATUS}
                    direction={sortMode.direction}
                    onClick={() => sortResumes(STATUS)}
                  >
                    <FormattedMessage {...messages.status} />
                  </TableSortLabel>
                </Tooltip>
              </React.Fragment>
            </TableCell>
            <TableCell align="left">
              <React.Fragment>
                <Tooltip
                  title={<FormattedMessage {...messages.sort} />}
                >
                  <TableSortLabel
                    active={sortMode.sortBy === RATING}
                    direction={sortMode.direction}
                    onClick={() => sortResumes(RATING)}
                  >
                    <FormattedMessage {...messages.rating} />
                  </TableSortLabel>
                </Tooltip>
              </React.Fragment>
            </TableCell>
            <TableCell align="center">
              <React.Fragment>
                <Tooltip
                  title={<FormattedMessage {...messages.sort} />}
                >
                  <TableSortLabel
                    active={sortMode.sortBy === TODO}
                    direction={sortMode.direction}
                    onClick={() => sortResumes(TODO)}
                  ><FormattedMessage {...messages.todo} />
                  </TableSortLabel>
                </Tooltip>
              </React.Fragment>
            </TableCell>
            <TableCell align="left">
              <React.Fragment>
                <Tooltip
                  title={<FormattedMessage {...messages.sort} />}
                >
                  <TableSortLabel
                    active={sortMode.sortBy === CREATED_AT}
                    direction={sortMode.direction}
                    onClick={() => sortResumes(CREATED_AT)}
                  ><FormattedMessage {...messages.depositDate} />
                  </TableSortLabel>
                </Tooltip>
              </React.Fragment>
            </TableCell>
            <TableCell align="left">
              <React.Fragment>
                <Tooltip
                  title={<FormattedMessage {...messages.sort} />}
                >
                  <TableSortLabel
                    active={sortMode.sortBy === AUTHOR}
                    direction={sortMode.direction}
                    onClick={() => sortResumes(AUTHOR)}
                  ><FormattedMessage {...messages.author} />
                  </TableSortLabel>
                </Tooltip>
              </React.Fragment>
            </TableCell>
            <TableCell align="left">
              <React.Fragment>
                <Tooltip
                  title={<FormattedMessage {...messages.sort} />}
                >
                  <TableSortLabel
                    active={sortMode.sortBy === AWARD}
                    direction={sortMode.direction}
                    onClick={() => sortResumes(AWARD)}
                  ><FormattedMessage {...messages.award} />
                  </TableSortLabel>
                </Tooltip>
              </React.Fragment>
            </TableCell>
            <TableCell padding="none"/>
          </TableRow>
        </TableHead>
        <TableBody>
          {resumes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(resume => {
            const author = people[resume.createdBy];
            return (
              <Preview
                key={resume._id}
                resume={resume}
                author={author}
                actions={actions}
                skills={skills}
                fileUrl={makeResumeFileUrl(tenant, token, resume)}
                people={people}
                lastTodo={getEntity(resume._id)}
                ratingValue={propOr(0, "rating")(resume)}
              />
            );
          })}

        </TableBody>
        <TableFooter >
          <TableRow >
            <TablePagination
              rowsPerPageOptions={[25, 50, 100]}
              colSpan={10}
              count={resumes.length}
              rowsPerPage={rowsPerPage}
              onChangeRowsPerPage={toggleRows}
              page={page}
              onChangePage={togglePage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Paper>
  )
};

Component.propTypes = {
  classes: PropTypes.object,
  resumes: PropTypes.array,
  people: PropTypes.object,
  actions: PropTypes.object,
  skills: PropTypes.object,
  sortResumes: PropTypes.func,
  sortMode: PropTypes.object,
  routes: PropTypes.object.isRequired,
  token: PropTypes.string,
  tenant: PropTypes.string.isRequired,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  toggleRows: PropTypes.func,
  togglePage: PropTypes.func,
  getEntity: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  token: getToken(state),
  tenant: getTenant(state),
  getEntity: entityId => getLastTodo(entityId)(state),

});
const withRows = withStateHandlers(() => ({ rowsPerPage: 50 }), {
  toggleRows: () => event => ({ rowsPerPage: event.target.value }),
});
const withPage = withStateHandlers(() => ({ page: 0 }), {
  togglePage: () => (event, page) => ({ page }),
});
export const enhance = compose(
  withStyles(style),
  connect(mapStateToProps),
  withRows,
  withPage,
  withRoutes,
);

export default enhance(Component);
