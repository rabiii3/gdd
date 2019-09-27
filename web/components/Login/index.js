import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'ramda';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import { withState, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import SignIn from './SignIn';
import Register from './Register';
import SignInWith from '../SignInWith';
import messages from './messages';
import { loginWith } from '../../actions/auth';

function TabContainer(props) {
  return <Typography component="div">{props.children}</Typography>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  card: {
    width: 450,
    [theme.breakpoints.down('xs')]: {
      width: 320,
    },
  },
  gridContainer: {
    marginTop: '100px',
  },
  grid: {
    flexBasis: 'initial',
  },
  divider:{
    marginTop: 44,
  },
  CardContent:{
    paddingTop: 40,
  }
});

export const LoginForm = ({ classes, setShowTab, tabValue, login }) => (
  <Grid container justify="center" className={classes.gridContainer}>
    <Grid item xs={12} className={classes.grid}>
      <Card className={classes.card}>
        <AppBar position="static" color="default">
          <Tabs
            value={tabValue}
            onChange={() => setShowTab(tabValue ? 0 : 1)}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label={<FormattedMessage {...messages.signIn} />} />
            <Tab label={<FormattedMessage {...messages.register} />} />
          </Tabs>
        </AppBar>
        <CardContent className={classes.CardContent}>
          {tabValue === 0 && (
            <TabContainer >
                <Grid container item justify="center" >
                  <SignInWith login={login} />
                </Grid>
                <Divider variant="middle" className={classes.divider} />
                <Typography align="center" variant="caption"><FormattedMessage {...messages.or} /></Typography>
                <SignIn login={login}/>
            </TabContainer>
          )}
          {tabValue === 1 && (
            <TabContainer>
              <Grid container item justify="center" >
                <SignInWith />
              </Grid>
              <Divider variant="middle" className={classes.divider} />
              <Typography align="center" variant="caption"><FormattedMessage {...messages.or} /></Typography>
              <Register />
            </TabContainer>
          )}
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  setShowTab: PropTypes.func,
  tabValue: PropTypes.number.isRequired,
  login: PropTypes.func.isRequired,
};

const withShowTab = withState('tabValue', 'handleChangeTab', 0);
const withShowTabHandlers = withHandlers({
  setShowTab: ({ handleChangeTab }) => tabValue => handleChangeTab(tabValue),
});

const actions = { loginWith };
const mapDispatchToProps = dispatch => ({ login: (...params) => dispatch(actions.loginWith(...params)) });

export const enhance = compose(
  withStyles(styles),
  withShowTab,
  withShowTabHandlers,
  connect(
    null,
    mapDispatchToProps,
  ),
);

export default enhance(LoginForm);
