import { compose, filter, map } from 'ramda';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from './Header';
import MODE from '../../utils/modes';
import withRoutes from '../../hoc/routes';

const makeRoute = route => props => <route.component {...props} />;

const defaultRoute = routes => {
  const { getDefaultRoute } = routes;
  const route = getDefaultRoute(MODE.LANDING);
  if (route) return <Redirect to={route.path} />;
};

const getRoutes = (fn, routes) => compose(
  map(fn),
  filter(route => route.mode === MODE.LANDING || route.mode === MODE.ALL)
)(routes.getRoutes());

export const App = ({routes }) => {
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Header />
      </Grid>
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
  withRoutes,
);
export default enhance(App);
