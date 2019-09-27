import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { getToken, getUser } from '../../selectors/auth';
import { getLoginSiteUrl, getTenant } from '../../selectors/config';
import { isActive, hasSomeRoles } from '../../../lib/models/people';
import Unauthorized from '../../pages/Unauthorized';
import withRoutes from '../../hoc/routes';

const Auth = ({ token, user, route, url, tenant, routes, children }) => {
  // if (!token || !isActive(user)) return <iframe sandbox="allow-top-navigation" style={{width:'100%', height:'100vh'}} src={routes.makeSignInRoute(url, tenant)} />;
  if (!token || !isActive(user)) return <iframe title="auth" style={{width:'100%', height:'calc(100vh - 64px)'}} src={routes.makeSignInRoute(url, tenant)} />;
  if(route.roles && !hasSomeRoles(route.roles, user)) return <Unauthorized />;
  return children;
};

Auth.propTypes = {
  token: PropTypes.string,
  user: PropTypes.object,
  route: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
  tenant: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  routes: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  token: getToken,
  tenant: getTenant,
  user: getUser,
  url: getLoginSiteUrl,
});

const enhance = compose( withRoutes, connect(mapStateToProps) );

export default enhance(Auth);
