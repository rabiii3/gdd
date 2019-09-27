import React from 'react';
import NoAuth from '../components/NoAuth';

const withNoAuth = Component => {
  const EnhancedComponent = props => (
    <NoAuth>
      <Component {...props} />
    </NoAuth>
  );
  return EnhancedComponent;
};

export default withNoAuth;
