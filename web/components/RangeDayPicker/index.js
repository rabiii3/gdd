import React from 'react';
import Helmet from 'react-helmet';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { compose } from 'redux';
import { withState, withHandlers } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid/Grid';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography/Typography';
import { FormattedMessage } from 'react-intl';
import Paper from '@material-ui/core/Paper/Paper';
import Divider from '@material-ui/core/Divider/Divider';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Popover from '@material-ui/core/Popover/Popover';
import { startOfWeek, subDays, startOfMonth, subMonths, isEqual, getYear, getMonth, lastDayOfYear, subYears, startOfYear } from 'date-fns';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import { Spacer } from '../../widgets/index';
import { SMALL } from '../../widgets/Menu';
import messages from './messages';
import { getStatisticsDates } from '../../selectors/statistics';
import { handleStatisticsDates } from '../../actions/statistics';

const styles = theme => ({
    dayPicker: {
        '&  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside):hover': {
            backgroundColor: '#f6a532',
        },

        '&  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside)': {
            backgroundColor: '#f6a532',
            color: '#F0F8FF',
        },

        '& .DayPicker-Weekday abbr[title]': {
            color: 'white',
        },

        '&  .DayPicker:not(.DayPicker--interactionDisabled) .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover': {
            backgroundColor: '#f6a53236',
        },

        '&  .DayPicker-Weekdays': {
            backgroundColor: '#503981',
        },

    },
    padding: {
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing.unit * 3,
        },
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
export const endLastYear = subYears(lastDayOfYear(new Date()), 1);

export const RangeDayPicker = ({ classes, initialState, handleStatisticsDates, setShowFilter, setCloseFilter, filter }) => {

    const handlePeriodeClick = (firstDay, lastDay) => {
        const range = { from: firstDay, to: lastDay };
        handleStatisticsDates(range)
    };
    const handleDayClick = (day) => {
        const range = DateUtils.addDayToRange(day, initialState);
        handleStatisticsDates(range)
    };
    const modifiers = { start: initialState && initialState.from, end: initialState && initialState.to };
    const from = modifiers.start;
    const to = modifiers.end;
    const selectedMonth = date => startOfMonth(new Date(getYear(date), getMonth(date), 1))
    return (
        <Paper >
            <Grid container direction="row" alignItems="center" justify="center">
                <Grid item xs={12} >
                    <Grid container direction="row" alignItems="center" justify="center" className={classes.padding}>
                        <Grid item xs={10}>
                            <Grid container direction="row" alignItems="center" justify="center" >
                                <Grid item xs={10}>
                                    <Grid container direction="row" alignItems="center" justify="center" >
                                        {!from && !to &&
                                            <Typography variant="subtitle1" >
                                                <FormattedMessage {...messages.selectFirstDay} />
                                            </Typography>
                                        }
                                        {from && !to &&
                                            <Typography variant="subtitle1" >
                                                <FormattedMessage {...messages.selectLastDay} />
                                            </Typography>}
                                        {from && to && <Grid item>
                                            <Grid container direction="row" alignItems="center" justify="center" >
                                                <Typography variant="body2" >
                                                    <FormattedMessage {...messages.selectesFrom} />
                                                </Typography>
                                                <Spacer size={SMALL} />
                                                <Typography variant="subtitle1" >
                                                    {from.toLocaleDateString()}
                                                </Typography>
                                                <Spacer size={SMALL} />
                                                <Typography variant="body2" >
                                                    <FormattedMessage {...messages.to} />
                                                </Typography>
                                                <Spacer size={SMALL} />
                                                <Typography variant="subtitle1" >
                                                    {to.toLocaleDateString()}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={2} >
                            <Grid container direction="row" alignItems="center" justify="center" >
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
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                >
                                    <MenuItem onClick={() => handlePeriodeClick(lastWeekBeginning, lastWeekEnd)} selected={initialState && initialState.from && isEqual(new Date(initialState.from), new Date(lastWeekBeginning))}>
                                        <Typography>
                                            <FormattedMessage {...messages.lastWeek} />
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => handlePeriodeClick(lastTwoWeeksBeginning, lastWeekEnd)} selected={initialState && initialState.from && isEqual(new Date(initialState.from), new Date(lastTwoWeeksBeginning))}>
                                        <Typography>
                                            <FormattedMessage {...messages.lastTwoWeeks} />
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => handlePeriodeClick(lastMonthBeginning, lastMonthEnd)} selected={initialState && initialState.from && isEqual(new Date(initialState.from), new Date(lastMonthBeginning))}>
                                        <Typography>
                                            <FormattedMessage {...messages.lastMonth} />
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => handlePeriodeClick(lastTowMonthsBeginning, lastMonthEnd)} selected={initialState && initialState.from && isEqual(new Date(initialState.from), new Date(lastTowMonthsBeginning))}>
                                        <Typography>
                                            <FormattedMessage {...messages.lastTwoMonths} />
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => handlePeriodeClick(lastThreeMonthsBeginning, lastMonthEnd)} selected={initialState && initialState.from && isEqual(new Date(initialState.from), new Date(lastThreeMonthsBeginning))}>
                                        <Typography>
                                            <FormattedMessage {...messages.lastThreeMonths} />
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => handlePeriodeClick(startLastYear, endLastYear)} selected={initialState && initialState.from && isEqual(new Date(initialState.from), new Date(startLastYear))}>
                                        <Typography>
                                            <FormattedMessage {...messages.lastYear} />
                                        </Typography>
                                    </MenuItem>
                                </Popover>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
                <Grid item xs={12}  >
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <DayPicker
                        className={classNames("Selectable", classes.dayPicker)}
                        numberOfMonths={2}
                        selectedDays={[from, { from, to }]}
                        modifiers={modifiers}
                        onDayClick={handleDayClick}
                        month={selectedMonth(initialState.from)}
                    />
                </Grid>

                <Helmet>
                    <style>{`
                            .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
                            background-color: #f6a53236 !important;
                            color: #f6a532;
                            }
                            .Selectable .DayPicker-Day {
                            border-radius: 0 !important;
                            }
                            .Selectable .DayPicker-Day--start {
                            border-top-left-radius: 50% !important;
                            border-bottom-left-radius: 50% !important;
                            }
                            .Selectable .DayPicker-Day--end {
                            border-top-right-radius: 50% !important;
                            border-bottom-right-radius: 50% !important;
                            }`
                    }
                    </style>
                </Helmet>
            </Grid>
        </Paper >
    )
};

RangeDayPicker.propTypes = {
    classes: PropTypes.object,
    handleStatisticsDates: PropTypes.func,
    initialState: PropTypes.object,
    setShowFilter: PropTypes.func,
    setCloseFilter: PropTypes.func,
    filter: PropTypes.object,
};
const mapStateToProps = createStructuredSelector({
    initialState: getStatisticsDates,
});

const mapDispatchToProps = dispatch => ({
    handleStatisticsDates: range => dispatch(handleStatisticsDates(range)),
});

const withFilter = withState('filter', 'handleFilter', null);
const withFilterHandlers = withHandlers({
    setShowFilter: ({ handleFilter }) => event => handleFilter(event.currentTarget),
    setCloseFilter: ({ handleFilter }) => () => handleFilter(null),
});
export const enhance = compose(
    withStyles(styles),
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
    withFilter,
    withFilterHandlers
);
export default enhance(RangeDayPicker);



















