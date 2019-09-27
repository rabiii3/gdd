import React from 'react';
import { RoutesContextConsumer } from '../components/RoutesContext';

const withRoutes = Component => {
  const EnhancedComponent = props => (
    <RoutesContextConsumer>
      {routes => <Component {...props} routes={routes} />}
    </RoutesContextConsumer>
  );
  return EnhancedComponent;
};

export default withRoutes;
