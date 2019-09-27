import React from 'react';
import { compose } from 'ramda';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginForm from './Login';
import Header from '../App/Header';
import { registerIn, registerInWith } from '../../actions/auth';
import { getUserToRegister, getTenantLabel } from '../../selectors/config';

export const App = ({ tenant, actions, user }) => {
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Header tenant={tenant} />
      </Grid>
      <Grid item xs={12}>
        <LoginForm user={user} registerIn={actions.registerIn} registerInWith={actions.registerInWith} />
      </Grid>
    </Grid>
  );
};

App.propTypes = {
  tenant: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  tenant: getTenantLabel(state),
  user: getUserToRegister(state),
});

const actions = { registerIn, registerInWith };
// const mapDispatchToProps = dispatch => ({ registerInWith: (...params) => dispatch(actions.registerInWith(...params)) });
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});



export const enhance = compose( connect(mapStateToProps, mapDispatchToProps));
export default enhance(App);
