import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Form, Field } from 'react-final-form';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '../../forms/TextField';
import messages from './messages';
import Captcha from '../../forms/Captcha';
import { hasRegisterInError } from '../../selectors/core';
import { getCaptchaSiteKey } from '../../selectors/config';
import { getColor } from '../../../lib/utils';
import {
  required,
  composeValidators,
  minLength,
} from '../../forms/utils';

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

const RegisterForm = ({ classes, user, login, errorRegister, sitekey }) => {
  const onSubmit = values => { login({ ...values, color: getColor() }) };

  return (
    <React.Fragment>
      <Form
        onSubmit={onSubmit}
        initialValues={{ firstname: user.firstname, lastname: user.lastname, email: user.email }}
        render={({ handleSubmit, pristine, form, invalid }) => (
          <div>
            <form onSubmit={handleSubmit}>
              <DialogContent>
                <Field
                  disabled
                  className={classes.textField}
                  component={TextField}
                  label={<FormattedMessage {...messages.email} />}
                  name="email"
                  type="email"
                />
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
                    minLength(<FormattedMessage {...messages.passwordValidation} />, 8),
                  )}
                  className={classes.textField}
                  component={TextField}
                  label={<FormattedMessage {...messages.password} />}
                  name="password"
                  type="password"
                />
                <br />
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
  user: PropTypes.object.isRequired,
  login: PropTypes.object.isRequired,
  errorRegister: PropTypes.bool,
  sitekey: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  errorRegister: hasRegisterInError,
  sitekey: getCaptchaSiteKey,
});

export const enhance = compose(
  withStyles(styles),
  connect( mapStateToProps),
);

export default enhance(RegisterForm);
