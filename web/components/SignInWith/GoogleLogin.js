import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GoogleLogin from 'react-google-login';

const styles = () => ({
  button: {
    background: '#ffffff',
    border: 'none',
    outline: 'none',
  },
});

const SERVICE = 'google';
const Component = ({ login, classes, config, children }) => {
  const responseGoogle = res => {
    if (!res.error) {
      console.log(`Signed in with google as ${res.getBasicProfile().getEmail()}`); // eslint-disable-line no-console
      login({ token: res.getAuthResponse().id_token, service: SERVICE });
    }else{
      console.log(res);// eslint-disable-line no-console
    }
  };

  return (
    <GoogleLogin
      className={classes.button}
      clientId={config.clientId}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
    >
      {children}
    </GoogleLogin>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  login: PropTypes.func.isRequired,
  classes: PropTypes.object,
  config: PropTypes.object,
};

export default withStyles(styles)(Component);
