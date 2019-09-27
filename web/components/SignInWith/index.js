import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import GoogleLogin from './GoogleLogin';
import { getGoogleConfig } from '../../selectors/config';

const styles = () => ({});

const SignInWith = ({ login, googleConfig }) => <GoogleLogin login={login} config={googleConfig} />;

SignInWith.propTypes = {
  googleConfig: PropTypes.object,
  login: PropTypes.func,
};

const mapStateToProps = state => ({ googleConfig: getGoogleConfig(state) });

export const enhance = compose(
  withStyles(styles),
  connect( mapStateToProps),
);

export default enhance(SignInWith);
