import React from 'react';
import { compose, map } from 'ramda';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withStateHandlers } from 'recompose';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Typography from '@material-ui/core/Typography';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from '../../../widgets/TablePaginationActions';

const style = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    margin: theme.spacing(1),
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  tableCellule: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textDecoration: 'none',
    width: 60,
  },
  tableSmallCellule: {
    width: 20,
  },
});
const STATUS = [
  { label: 'Koopter', value: 'collaborator' },
  { label: 'Hired', value: 'hired' },
  { label: 'Pending', value: 'pending' },
  { label: 'Checking', value: 'checking' },
  { label: 'Accepted', value: 'accepted' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'Fired', value: 'fired' },
  { label: 'Archived', value: 'archived' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Canceled', value: 'canceled' },
];

export const Component = ({ classes, rowsPerPage, page, toggleRows, togglePage, resumesWithStatus }) => {
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {map(status => (
              <TableCell key={status.value}>
                <Typography className={classes.tableSmallCellule}>{status.label} </Typography>
              </TableCell>
            ))(STATUS)}
          </TableRow>
        </TableHead>
        <TableBody>
          {resumesWithStatus.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(resume => {
            return (
              <TableRow key={resume.id}>
                <TableCell>
                  <Typography className={classes.tableCellule}>{resume && resume.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography className={classes.tableSmallCellule}>
                    {resume && resume.hired ? resume.hired : 0}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography className={classes.tableSmallCellule}>
                    {resume && resume.pending ? resume.pending : 0}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography className={classes.tableSmallCellule}>
                    {resume && resume.checking ? resume.checking : 0}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography className={classes.tableSmallCellule}>
                    {resume && resume.accepted ? resume.accepted : 0}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography className={classes.tableSmallCellule}>
                    {resume && resume.rejected ? resume.rejected : 0}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography className={classes.tableSmallCellule}>
                    {resume && resume.fired ? resume.fired : 0}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography className={classes.tableSmallCellule}>
                    {resume && resume.archived ? resume.archived : 0}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography className={classes.tableSmallCellule}>
                    {resume && resume.confirmed ? resume.confirmed : 0}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography className={classes.tableSmallCellule}>
                    {resume && resume.canceled ? resume.canceled : 0}
                  </Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 15, 25]}
              colSpan={10}
              count={resumesWithStatus.length}
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
  );
};

Component.propTypes = {
  classes: PropTypes.object,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  toggleRows: PropTypes.func,
  togglePage: PropTypes.func,
  resumesWithStatus: PropTypes.array,
};

const withRows = withStateHandlers(() => ({ rowsPerPage: 10 }), {
  toggleRows: () => event => ({ rowsPerPage: event.target.value }),
});
const withPage = withStateHandlers(() => ({ page: 0 }), {
  togglePage: () => (event, page) => ({ page }),
});

export const enhance = compose(
  withStyles(style),
  withRows,
  withPage,
);

export default enhance(Component);
