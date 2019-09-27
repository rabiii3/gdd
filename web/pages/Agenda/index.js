import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { compose, map } from 'ramda';
import React from 'react';
import { connect } from 'react-redux';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table/Table';
import TableBody from '@material-ui/core/TableBody/TableBody';
import { injectIntl, intlShape, FormattedMessage, FormattedDate } from 'react-intl';
import classNames from 'classnames';
import InfiniteCalendar, {
  Calendar,
  defaultMultipleDateInterpolation,
  withMultipleDates,
} from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import Hidden from '@material-ui/core/Hidden/Hidden';
import Divider from '@material-ui/core/Divider/Divider';
import { ArrowBack, Spacer, Container } from '../../widgets';
import { Header, HeaderLeft, HeaderRight } from '../../components/Header';
import messages from './messages';
import { LARGE, SMALL } from '../../widgets/Spacer';
import { Title } from '../../widgets/Title';
import Content from '../../widgets/Content';
import { getFutureTodo } from '../../selectors/comments';
import { getPeople } from '../../selectors/people';
import { getResumeById } from '../../selectors/resumes';
import Preview from './TableBody';

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
  grey: {
    color: '#73757a',
  },
  darkGrey: { color: '#3c4043' },
  padding: {
    padding: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 4,
  },
  calendar: {
    '& .Cal__Day__root': {
      pointerEvents: 'none',
    },
  },

});

export const Page = ({ classes, intl, allTodo, people, getEntity }) => {

  const today = new Date();
  const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
  const MultipleDatesCalendar = withMultipleDates(Calendar);
  const selectedDates = [Date.now()]
  map(todo => { selectedDates.push(todo.when) })(allTodo)
  return (
    <Container className={classes.root}>
      <Header>
        <HeaderLeft>
          <ArrowBack />
          <Spacer size={SMALL} />
          <Icon className={classNames(classes.iconStyle, 'far fa-calendar-alt')} />
          <Spacer size="MEDIUM" />
          <Title text={intl.formatMessage(messages.title)} />
        </HeaderLeft>
        <HeaderRight>
        </HeaderRight>
      </Header>
      <Content>
        <Grid container direction="row" alignItems="center" justify="space-around">
          <Grid item xs={12} className={classes.padding}>
            <Grid container direction="row" alignItems="center" >
              <Hidden mdDown>
                <Spacer size={LARGE} />
              </Hidden>
              <Grid item >
                <Typography variant="h6" className={classes.darkGrey}>
                  <FormattedMessage {...messages.today} />
                </Typography>
              </Grid>
              <Spacer size={SMALL} />
              <Grid item >
                <Typography variant="h5" className={classes.darkGrey}>
                  <FormattedDate value={Date.now()} weekday='long' />
                </Typography>
              </Grid>
              <Spacer size={SMALL} />
              <Grid item >
                <Typography variant="h5" className={classes.darkGrey}>
                  <FormattedDate value={Date.now()} day='numeric' />
                </Typography>
              </Grid>
              <Spacer size={SMALL} />
              <Grid item >
                <Typography variant="h5" className={classes.darkGrey}>
                  <FormattedDate value={Date.now()} month='long' />
                </Typography>
              </Grid>
              <Spacer size={SMALL} />
            </Grid>
          </Grid>
          <Grid item xs={12} >
            <Grid container direction="row" alignItems="center" justify="space-around" >
              <Grid item xs={12} lg={3}>
                <InfiniteCalendar
                  className={classes.calendar}
                  width={360}
                  disabledDays={[0, 6]}
                  minDate={lastWeek}
                  Component={MultipleDatesCalendar}
                  interpolateSelection={defaultMultipleDateInterpolation}
                  selected={selectedDates}
                  displayOptions={{
                    showHeader: false,
                  }}
                  theme={{
                    selectionColor: 'orange',
                    textColor: {
                      default: '#333',
                      active: '#FFF'
                    },
                    weekdayColor: 'indigo',
                    headerColor: 'rgb(127, 95, 251)',
                    floatingNav: {
                      background: 'rgba(81, 67, 138, 0.96)',
                      color: '#FFF',
                      chevron: '#FFA726'
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={8} >
                <Divider />
                <Table>
                  <TableBody >
                    {allTodo.map(todo => {
                      const candidate = getEntity(todo);
                      return (
                        <Preview
                          key={todo._id}
                          todo={todo}
                          people={people}
                          candidate={candidate}

                        />
                      );
                    })}

                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Content>
    </Container>
  );
};

Page.propTypes = {
  classes: PropTypes.object,
  intl: intlShape,
  allTodo: PropTypes.array,
  people: PropTypes.object,
  resume: PropTypes.object,
  getEntity: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
  allTodo: getFutureTodo(state),
  people: getPeople(state),
  getEntity: ({ entityId }) => getResumeById(entityId)(state),
});

export const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, null),
  injectIntl,
);

export default enhance(Page);
