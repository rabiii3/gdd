import { compose, filter, map } from 'ramda';
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import withRoutes from '../../hoc/routes';
import MODE from '../../utils/modes';

const makeRoute = route => props => <route.component {...props} />;

const defaultRoute = routes => {
  const { getDefaultRoute } = routes;
  const route = getDefaultRoute(MODE.LOGIN);
  if (route) return <Redirect to={route.path} />;
};

const getRoutes = (fn, routes) => compose(
  map(fn),
  filter(route => route.mode === MODE.LOGIN || route.mode === MODE.ALL)
)(routes.getRoutes());

export const App = ({ routes }) => {
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Switch>
          {getRoutes(
            route => (
              <Route key={route.path} exact={route.exact} path={route.path} render={makeRoute(route)} />
            ),
            routes,
          )}
          {defaultRoute(routes)}
        </Switch>
      </Grid>
    </Grid>
  );
};

App.propTypes = {
  routes: PropTypes.object.isRequired,
};

export const enhance = compose(
  withRouter,
  withRoutes,
);
export default enhance(App);
