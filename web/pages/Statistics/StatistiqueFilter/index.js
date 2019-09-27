import React from "react";
import 'react-day-picker/lib/style.css';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { compose } from 'redux';
import { withState, withHandlers, withStateHandlers } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { startOfWeek, subDays, startOfMonth, subMonths, lastDayOfYear, subYears, startOfYear } from 'date-fns';
import MenuItem from '@material-ui/core/MenuItem';
import { KeyboardDatePicker } from "@material-ui/pickers";
import Select from '@material-ui/core/Select';
import { map } from "ramda";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FilterList from '@material-ui/icons/FilterList';
import { FormattedMessage } from 'react-intl';
import { getStatisticsDates, getSelectedFromDate, getSelectedToDate } from '../../../selectors/statistics';
import { handleStatisticsDates, handleStatistiqueFromDate, handleStatistiqueToDate, handleStatistiqueStatus } from '../../../actions/statistics';
import messages from './messages';

const styles = theme => ({
  padding: {
  padding: theme.spacing(2),
  },
  paddingLeft: {
  paddingLeft: theme.spacing(2),
  },
  width: {
  width: 260,
  },
  formControl: {
  margin: theme.spacing(1),
  minWidth: 280,
  },
  filter: {
  color: 'grey',
  marginLeft: theme.spacing(1)
  },

});
export const startWeek = startOfWeek(new Date());
export const startMonth = startOfMonth(new Date());
export const lastWeekBeginning = subDays(startWeek, 7);
export const lastTwoWeeksBeginning = subDays(startWeek, 14)
export const lastWeekEnd = subDays(startWeek, 1);
export const lastMonthBeginning = subMonths(startMonth, 1);
export const lastTowMonthsBeginning = subMonths(startMonth, 2);
export const lastMonthEnd = subDays(startMonth, 1);
export const lastThreeMonthsBeginning = subMonths(startMonth, 3);
export const startLastYear = subYears(startOfYear(new Date()), 1);
export const lastYearEnd = subYears(lastDayOfYear(new Date()), 1);

export const StatistiqueFilter = ({ classes, selectedFromDate, selectedToDate, handleStatistiqueToDate, handleStatistiqueFromDate,
  handleStatisticsDates, handleStatistiqueStatus, disableEditCalendarMode }) => {
  const handlePeriodeClick = (firstDay, lastDay) => {
  const range = { from: firstDay, to: lastDay };
  handleStatisticsDates(range)
  };

  const [periode, setPresets] = React.useState("");
  const [statusSelect, setStatus] = React.useState("");
  const handleChangePresets = (event, data) => {

  setPresets(event.target.value);
  if(data.props.periode) handlePeriodeClick(data.props.periode.begin, data.props.periode.end);
  disableEditCalendarMode(data.props.disabledcalendar.isDisabled)
  }
  const handleChangeStatus = event => {
  setStatus(event.target.value);
  handleStatistiqueStatus(event.target.value)
  }
  const STATUS = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Checking', value: 'checking' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Accepted', value: 'accepted' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'Hired', value: 'hired' },
  { label: 'Fired', value: 'fired' },
  { label: 'Archived', value: 'archived' },
  { label: 'Canceled', value: 'canceled' },
  ]
  return (
  <Grid container alignItems="center" justify="flex-start" >
    <Grid item>
    <Grid container justify="space-evenly">
      <Grid item ><FilterList className={classes.filter} /></Grid>
      <Grid item> <Typography variant="h6" className={classes.paddingLeft}><FormattedMessage {...messages.filter} /></Typography></Grid>
    </Grid>
    </Grid>
    <Grid item>
    <Grid container alignItems="center" justify="center" >
      <Grid item className={classes.padding}  >
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel><FormattedMessage {...messages.period} /></InputLabel>
        <Select value={periode} onChange={handleChangePresets}
        input={
          <OutlinedInput
          name="presets"
          labelWidth={70}
          />
        }>
        <MenuItem value={70} disabledcalendar={{ isDisabled: false }} ><FormattedMessage {...messages.otherPeriode} /></MenuItem>
        <MenuItem value={10} disabledcalendar={{ isDisabled: true }} periode={{ begin: lastWeekBeginning, end: lastWeekEnd }}><FormattedMessage {...messages.lastWeek} /></MenuItem>
        <MenuItem value={20} disabledcalendar={{ isDisabled: true }} periode={{ begin: lastTwoWeeksBeginning, end: lastWeekEnd }} ><FormattedMessage {...messages.lastTwoWeeks} /></MenuItem>
        <MenuItem value={30} disabledcalendar={{ isDisabled: true }} periode={{ begin: lastMonthBeginning, end: lastMonthEnd }} ><FormattedMessage {...messages.lastMonth} /></MenuItem>
        <MenuItem value={40} disabledcalendar={{ isDisabled: true }} periode={{ begin: lastTowMonthsBeginning, end: lastMonthEnd }} ><FormattedMessage {...messages.lastTwoMonths} /></MenuItem>
        <MenuItem value={50} disabledcalendar={{ isDisabled: true }} periode={{ begin: lastThreeMonthsBeginning, end: lastMonthEnd }} ><FormattedMessage {...messages.lastThreeMonths} /></MenuItem>
        <MenuItem value={60} disabledcalendar={{ isDisabled: true }} periode={{ begin: startLastYear, end: lastYearEnd }} ><FormattedMessage {...messages.lastYear} /></MenuItem>
        </Select>
      </FormControl>
      </Grid>
      <Grid item className={classes.padding} >
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        id="date-picker-inline"
        label={<FormattedMessage {...messages.selectesFrom} />}
        value={selectedFromDate && selectedFromDate}
        onChange={handleStatistiqueFromDate}
        KeyboardButtonProps={{
        'aria-label': 'change date',
        }}
      />
      </Grid>
      <Grid item className={classes.padding} >
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        id="date-picker-inline"
        label={<FormattedMessage {...messages.selectesTo} />}
        value={selectedToDate && selectedToDate}
        onChange={handleStatistiqueToDate}
        KeyboardButtonProps={{
        'aria-label': 'change date',
        }}
      />
      </Grid>

      <Grid item className={classes.padding}  >
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel><FormattedMessage {...messages.status} /></InputLabel>
        <Select value={statusSelect} onChange={handleChangeStatus}
        input={
          <OutlinedInput
          name="status"
          labelWidth={50}
          />
        }
        >
        {map(status => <MenuItem key={status.value} value={status.value} status={status.value} > {status.label}</MenuItem>)(STATUS)}
        </Select>
      </FormControl>
      </Grid>
    </Grid >
    </Grid >

  </Grid >

  )
};

StatistiqueFilter.propTypes = {
  classes: PropTypes.object,
  handleStatisticsDates: PropTypes.func,
  handleStatistiqueFromDate: PropTypes.func,
  handleStatistiqueToDate: PropTypes.func,
  handleStatistiqueStatus: PropTypes.func,
  initialState: PropTypes.object,
  setShowFilter: PropTypes.func,
  setCloseFilter: PropTypes.func,
  filter: PropTypes.object,
  props: PropTypes.object,
  selectedFromDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  selectedToDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  disableEditCalendarMode: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  initialState: getStatisticsDates,
  selectedFromDate: getSelectedFromDate,
  selectedToDate: getSelectedToDate
});

const mapDispatchToProps = dispatch => ({
  handleStatisticsDates: range => dispatch(handleStatisticsDates(range)),
  handleStatistiqueFromDate: day => dispatch(handleStatistiqueFromDate(day)),
  handleStatistiqueToDate: day => dispatch(handleStatistiqueToDate(day)),
  handleStatistiqueStatus: status => dispatch(handleStatistiqueStatus(status)),
});

const withFilter = withState('filter', 'handleFilter', null);
const withFilterHandlers = withHandlers({
  setShowFilter: ({ handleFilter }) => event => handleFilter(event.currentTarget),
  setCloseFilter: ({ handleFilter }) => () => handleFilter(null),
});

const withEdit = withStateHandlers(() => ({ isCalendarDisabled: true }), {
  disableEditCalendarMode: () => value => ({ isCalendarDisabled: value }),
});
export const enhance = compose(
  withStyles(styles),
  connect(
  mapStateToProps,
  mapDispatchToProps,
  ),
  withFilter,
  withFilterHandlers,
  withEdit
);
export default enhance(StatistiqueFilter);
