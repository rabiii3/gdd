import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { compose } from 'recompose';
import { test } from 'ramda';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
import CallingCodes from './CountrysPhonesCodes';
import TextField from '../../forms/TextField';
import * as resumesActions from '../../actions/resumes';
import SelectCountry from '../../forms/SelectCountry';
import messages from './messages';

const styles = theme => ({
  container: {
    right: theme.spacing.unit * 10,
    width: 300,
    height: 220,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2,
    width: 250,
  },
  title: {
    margin: '0 auto',
  },
  filename: {
    width: 200,
    height: 30,
    background: 'white',
    fontSize: 14,
    marginLeft: '6px',
  },
  button: {
    width: 140,
    margin: theme.spacing.unit,
    color: 'white',
  },
});

export const ResumeForm = ({ classes, addForm, setModal, file, country }) => {
  const onSubmit = values => {
    actions.addResume({ ...values, file: file[0] });
    addForm(values);
    setModal(false);
  };

  const validate = values => {
    const errors = {};
    const phoneUtil = PhoneNumberUtil.getInstance();
    if (!values.firstname) {
      errors.firstname = <FormattedMessage {...messages.required} />;
    }
    if (values.firstname && values.firstname.length < 2) {
      errors.firstname = <FormattedMessage {...messages.firstname} />;
    }
    if (!values.lastname) {
      errors.lastname = <FormattedMessage {...messages.required} />;
    }
    if (values.lastname && values.lastname.length < 2) {
      errors.lastname = <FormattedMessage {...messages.lastname} />;
    }
    if (!values.phonenumber) {
      errors.phonenumber = <FormattedMessage {...messages.required} />;
    }
    if (values.phonenumber) {
      try {
        if (!phoneUtil.isValidNumber(phoneUtil.parse(values.phonenumber, values.country))) {
          errors.phonenumber = <FormattedMessage {...messages.phoneValidation} />;
        }
      } catch (err) {
        errors.phonenumber = <FormattedMessage {...messages.phoneValidation} />;
      }
    }
    if (!values.email) {
      errors.email = <FormattedMessage {...messages.required} />;
    }
    if (values.email && !test(/\S+@\S+\.\S+/, values.email)) {
      errors.email = <FormattedMessage {...messages.email} />;
    }
    if (!values.filename) {
      errors.filename = <FormattedMessage {...messages.required} />;
    }
    return errors;
  };

  const formatNumber = country => value => {
    try {
      const phoneUtil = PhoneNumberUtil.getInstance();

      const number = phoneUtil.parseAndKeepRawInput(value, country);
      return value === undefined || number === null
        ? '' // make controlled
        : phoneUtil.format(number, PhoneNumberFormat.INTERNATIONAL);
    } catch (err) {
      null;
    }
  };

  const editForm = file[0] ? { filename: file[0].name, type: file[0].type } : null;

  return (
    <Dialog open={true} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title" className={classes.title}>
        Upload resume
      </DialogTitle>
      <Form
        onSubmit={onSubmit}
        formatNumber={formatNumber}
        validateOnBlur={true}
        validate={validate}
        initialValues={file ? editForm : null}
        render={({ handleSubmit, pristine, form, invalid, values }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <div className={classes.container}>
                <Field
                  component={TextField}
                  className={classes.textField}
                  name="firstname"
                  type="text"
                  placeholder="First Name"
                />
                <Field
                  component={TextField}
                  className={classes.textField}
                  name="lastname"
                  type="text"
                  placeholder="Last name"
                />
                <Field
                  component={TextField}
                  className={classes.textField}
                  name="email"
                  type="email"
                  placeholder="Email"
                />
                <Field
                  component={SelectCountry}
                  callingcodes={CallingCodes}
                  name="country"
                  country={country}
                  type="select"
                />
                {values.country ? (
                  <Field
                    component={TextField}
                    name="phonenumber"
                    type="text"
                    className={classes.textField}
                    format={formatNumber(values.country)}
                    formatOnBlur
                    placeholder="Phone number"
                  />
                ) : null}
                <br />
                <Field
                  className={classes.filename}
                  component="input"
                  name="filename"
                  type="text"
                  placeholder="File Name"
                  disabled={true}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setModal(false)} color="secondary" variant="contained" className={classes.button}>
                Cancel
              </Button>
              <Button
                className={classes.button}
                type="submit"
                disabled={pristine || invalid}
                color="primary"
                variant="contained"
              >
                Upload
              </Button>
            </DialogActions>
          </form>
        )}
      />
    </Dialog>
  );
};

ResumeForm.propTypes = {
  classes: PropTypes.object.isRequired,
  setModal: PropTypes.func.isRequired,
  add: PropTypes.func,
  file: PropTypes.array,
  addForm: PropTypes.func,
  country: PropTypes.string,
};

const actions = {
  addResume: resumesActions.add,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export const enhance = compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withStyles(styles),
);

export default enhance(ResumeForm);
