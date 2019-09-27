import React from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import TextField from '../../forms/TextField';
import messages from './messages';
import Checkbox from '../../forms/Checkbox';
import { register } from '../../actions/auth';
import Captcha from '../../forms/Captcha';
import { hasRegisterError } from '../../selectors/core';
import { getCaptchaSiteKey } from '../../selectors/config';
import { getColor } from '../../../lib/utils';
import {
  required,
  composeValidators,
  minLength,
  emailFormat,
  emailConfirmation,
  checkEmailUniqueness,
} from '../../forms/utils';
import { RegisterTermsDialog } from '../../widgets';
import withRoutes from '../../hoc/routes';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    color: 'white',
    float: 'right',
  },
  reCAPTCHA: {
    display: 'inline-block',
    color: 'primary',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2,
    width: 300,
  },
});

const RegisterForm = ({ classes, actions, errorRegister, sitekey, history, routes }) => {
  const onSubmit = values => {
    actions.register({ ...values, color: getColor() });
    history.push(routes.getPathByName('registerAlmostThere'));
  };

  return (
    <React.Fragment>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, pristine, form, invalid }) => (
          <div>
            <form onSubmit={handleSubmit}>
              <DialogContent>
                <Field
                  validate={required(<FormattedMessage {...messages.requiredValidation} />)}
                  className={classes.textField}
                  component={TextField}
                  label={<FormattedMessage {...messages.firstname} />}
                  name="firstname"
                  type="text"
                />
                <Field
                  validate={required(<FormattedMessage {...messages.requiredValidation} />)}
                  className={classes.textField}
                  component={TextField}
                  label={<FormattedMessage {...messages.lastname} />}
                  name="lastname"
                  type="text"
                />
                <Field
                  validate={composeValidators(
                    required(<FormattedMessage {...messages.requiredValidation} />),
                    emailFormat(<FormattedMessage {...messages.emailValidation} />),
                    checkEmailUniqueness(<FormattedMessage {...messages.emailUniqueness} />),
                  )}
                  className={classes.textField}
                  component={TextField}
                  label={<FormattedMessage {...messages.email} />}
                  name="email"
                  type="email"
                />
                <Field
                  validate={composeValidators(
                    required(<FormattedMessage {...messages.requiredValidation} />),
                    emailConfirmation(<FormattedMessage {...messages.emailConfirmationError} />),
                  )}
                  className={classes.textField}
                  component={TextField}
                  label={<FormattedMessage {...messages.emailConfirmation} />}
                  name="emailConfirmation"
                  type="text"
                />
                <Field
                  validate={composeValidators(
                    required(<FormattedMessage {...messages.requiredValidation} />),
                    minLength(<FormattedMessage {...messages.passwordValidation} />, 8),
                  )}
                  className={classes.textField}
                  component={TextField}
                  label={<FormattedMessage {...messages.password} />}
                  name="password"
                  type="password"
                />
                <br />
                <Grid container direction="row" alignItems="center">
                  <FormControlLabel
                    label={<FormattedMessage {...messages.acceptTerms} />}
                    control={
                      <Field
                        component={Checkbox}
                        validate={required(<FormattedMessage {...messages.requiredValidation} />)}
                        color="default"
                        name="acceptTerms"
                        type="checkbox"
                      />
                    }
                  />
                  <RegisterTermsDialog />
                </Grid>
                <br /> <br />
                <Field
                  name="captcharesponse"
                  component={Captcha}
                  sitekey={sitekey}
                  validate={required(<FormattedMessage {...messages.requiredValidation} />)}
                />
                <br /> <br />
                <Grid container spacing={16} justify="center">
                  <Grid item xs={5}>
                    {errorRegister && (
                      <Typography variant="body1" gutterBottom align="left" color="secondary">
                        <FormattedMessage {...messages.errorRegister} />
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button
                  type="submit"
                  disabled={pristine || invalid}
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  <FormattedMessage {...messages.register} />
                </Button>
              </DialogActions>
            </form>
          </div>
        )}
      />
    </React.Fragment>
  );
};

RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
  values: PropTypes.object,
  actions: PropTypes.object.isRequired,
  errorRegister: PropTypes.bool,
  sitekey: PropTypes.string,
  routes: PropTypes.object,
  history: PropTypes.object,
};

const actions = { register };
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

const mapStateToProps = createStructuredSelector({
  errorRegister: hasRegisterError,
  sitekey: getCaptchaSiteKey,
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
export default enhance(RegisterForm);
