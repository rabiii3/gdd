import { compose, filter, map } from 'ramda';
import React from 'react';
import { bindActionCreators } from 'redux';
import Grid from '@material-ui/core/Grid';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './Header';
import SnackbarManager from '../Snackbar';
import withRoutes from '../../hoc/routes';
import Auth from '../Auth';
import { getUser } from '../../selectors/auth';
import { getLoggedPerson } from '../../selectors/people';
import { getError } from '../../selectors/core';
import { getTenantLabel } from '../../selectors/config';
import { logout } from '../../actions/auth';
import { ackError } from '../../actions/core';
import MODE from '../../utils/modes';


const makeAuthRoute = ({ isAuthRequired }, route) => props => {
  if (isAuthRequired(route)) {
    return (
      <Auth route={route}>
        <route.component {...props} />
      </Auth>
    );
  }
  return <route.component {...props} />;
};

const defaultAppRoute = routes => {
  const { getDefaultRoute } = routes;
  const route = getDefaultRoute(MODE.APP);
  if (route) return <Redirect to={route.path} />;
};

const getAppRoutes = (fn, routes) => compose(
  map(fn),
  filter(route => route.mode === MODE.APP || route.mode === MODE.ALL)
)(routes.getRoutes());

export const App = ({ error, tenant, routes, user, actions }) => {
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Header user={user} logout={actions.logout} tenant={tenant} />
      </Grid>
      <Grid item xs={12}>
        <Switch>
          {getAppRoutes(
            route => (
              <Route key={route.path} exact={route.exact} path={route.path} render={makeAuthRoute(routes, route)} />
            ),
            routes,
          )}
          {defaultAppRoute(routes)}
        </Switch>
      </Grid>
      <SnackbarManager error={error} actions={actions} />
    </Grid>
  );
};

App.propTypes = {
  routes: PropTypes.object.isRequired,
  user: PropTypes.object,
  actions: PropTypes.object.isRequired,
  error: PropTypes.object,
  tenant: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  user: getLoggedPerson(state) || getUser(state),
  error: getError(state),
  tenant: getTenantLabel(state),
});

const actions = { logout, ackError };
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export const enhance = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withRoutes,
);
export default enhance(App);
