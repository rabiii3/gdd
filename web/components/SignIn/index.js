import React from 'react';
import Button from '@material-ui/core/Button';
import { compose } from 'ramda';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

const SignIn = ({ actions }) => (
  <div>
    <Button
      onClick={() => {
        actions.login({
          _id: '1',
          firstname: 'slim',
          lastname: 'chkir',
          email: 'slim.tunisie@gmail.com',
          roles: ['Admin', 'User'],
        });
      }}
    >
      SignIn as Admin
    </Button>
    <Button
      onClick={() => {
        actions.login({
          _id: '2',
          firstname: 'kadda',
          lastname: 'tarek',
          email: ' kadda.tarek@gmail.com',
          roles: ['user'],
        });
      }}
    >
      SignIn as user
    </Button>
  </div>
);

SignIn.propTypes = {
  actions: PropTypes.object.isRequired,
};
const actions = { login };
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});
const enhance = compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withRouter,
);
export default enhance(SignIn);
