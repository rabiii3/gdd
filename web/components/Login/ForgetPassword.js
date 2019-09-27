import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { compose } from 'ramda';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '../../forms/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import { FormattedMessage } from 'react-intl';
import { bindActionCreators } from 'redux';
import messages from './messages';
import { resetPassword } from '../../actions/auth';
import { emailFormat, composeValidators, required } from '../../forms/utils';
import Typography from '@material-ui/core/Typography/Typography';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    color: 'white',
    float: 'right',
  },
  card: {
    width: 450,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2,
    width: 300,
  },
});

export const ForgetPwForm = ({ classes, actions, setShowResetForm }) => {
  const onSubmit = values => {
    actions.resetPassword(values);
  };

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <AppBar position="static" color="default">
          <Tabs value={0} indicatorColor="secondary" textColor="secondary" fullWidth>
            <Tab label={<FormattedMessage {...messages.restPW} />} />
          </Tabs>
        </AppBar>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, pristine, form, invalid }) => (
            <form onSubmit={handleSubmit}>
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
              <br />
              <Button
                type="submit"
                disabled={pristine || invalid}
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                <FormattedMessage {...messages.restPW} />
              </Button>
            </form>
          )}
        />
      </Card>
      <Typography variant="caption">
        <FormattedMessage {...messages.haveLogin} />
        {
          <Button color="secondary" onClick={() => setShowResetForm()}>
            <FormattedMessage {...messages.signIn} />
          </Button>
        }
      </Typography>
    </React.Fragment>
  );
};

ForgetPwForm.propTypes = {
  classes: PropTypes.object.isRequired,
  setShowResetForm: PropTypes.func,
  actions: PropTypes.object.isRequired,
};

const actions = { resetPassword };
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export const enhance = compose(
  withStyles(styles),
  connect(
    null,
    mapDispatchToProps,
  ),
);
export default enhance(ForgetPwForm);
