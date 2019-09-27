import React from 'react';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '../../forms/TextField';
import withRoutes from '../../hoc/routes';
import messages from './messages';
import { login } from '../../actions/auth';
import { hasSignInError } from '../../selectors/core';
import { required, composeValidators, emailFormat } from '../../forms/utils';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    color: 'white',
    float: 'right',
  },
  link: {
    float: 'right',
    right: theme.spacing.unit,
  },
  textError: {
    color: '#ea4554',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
});

export const SignInForm = ({ routes, classes, actions, errorSignIn }) => {
  const onSubmit = values => {
    actions.login(values);
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, pristine, form, invalid }) => (
        <form onSubmit={handleSubmit}>
          <DialogContent>
            {errorSignIn && (
              <Typography variant="body1" gutterBottom align="left" color="secondary">
                <FormattedMessage {...messages.errorSignIn} />
              </Typography>
            )}
            <Field
              validate={composeValidators(
                required(<FormattedMessage {...messages.requiredValidation} />),
                emailFormat(<FormattedMessage {...messages.emailValidation} />),
              )}
              className={classes.textField}
              component={TextField}
              label={<FormattedMessage {...messages.email} />}
              name="email"
              type="email"
            />
            <Field
              validate={composeValidators(required(<FormattedMessage {...messages.requiredValidation} />))}
              className={classes.textField}
              component={TextField}
              label={<FormattedMessage {...messages.password} />}
              name="password"
              type="password"
            />
            <br />
            <br />
            <Button
              component={Link}
              to={routes.getPathByName('requestResetPassword')}
              color="primary"
              align="left"
            >
              {<FormattedMessage {...messages.forgetPW} />}
            </Button>
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              disabled={pristine || invalid}
              variant="contained"
              color="primary"
              className={classes.button}
            >
              {<FormattedMessage {...messages.signIn} />}
            </Button>
          </DialogActions>
        </form>
      )}
    />
  );
};

SignInForm.propTypes = {
  classes: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  errorSignIn: PropTypes.bool,
  routes: PropTypes.object.isRequired,
};

const actions = { login };

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

const mapStateToProps = createStructuredSelector({
  errorSignIn: hasSignInError,
});

export const enhance = compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withRouter,
  withRoutes,
);
export default enhance(SignInForm);
