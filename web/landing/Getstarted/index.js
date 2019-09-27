import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Field, Form } from 'react-final-form';

import { withStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import messages from './messages';
import TextField from '../../forms/TextField';
import PhoneNumber from '../../forms/PhoneNumber';
import { composeValidators, required, emailFormat, isValidKey, checkKeyValidity } from '../../forms/utils';
import { getCountry } from '../../selectors/config';
import AutoFill from './AutoFill'; 



const styles = {
  fieldContainer:{
    margin: 'auto',
    width: '80%'
  }
};

const GetStarted = ({ open, onClose, country, classes }) => { 
  
  const onSubmit = values => {console.log('VAL', values)}
  
  return(
    <Dialog open={open} onClose={() => onClose()} fullWidth>
      <DialogTitle>
        <FormattedMessage {...messages.getStartedFree} />
      </DialogTitle>
      <Form
      onSubmit={onSubmit}
      render={ ({handleSubmit, invalid, pristine}) => (
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>
              <FormattedMessage {...messages.description} />
            </DialogContentText>
            <AutoFill 
              field="company"
              set="key"
            />
          <Grid container direction="column" justify="center" alignItems="stretch" className={classes.fieldContainer}>
            <Grid item>
              <Field
              requiredField
              component={TextField}
              name="email"
              type="text"
              label={<FormattedMessage {...messages.email} />}
              validate={composeValidators(
                emailFormat(<FormattedMessage {...messages.emailValidation} />), 
                required(<FormattedMessage {...messages.requiredValidation} />))}
              fullWidth
              />
              <Field
              requiredField
              component={TextField}
              name="firstName"
              type="text"
              label={<FormattedMessage {...messages.firstName} />}
              validate={required(<FormattedMessage {...messages.requiredValidation} />)}
              fullWidth
              />
              <Field
              requiredField
              component={TextField}
              name="lastName"
              type="text"
              label={<FormattedMessage {...messages.lastName} />}
              validate={required(<FormattedMessage {...messages.requiredValidation} />)}
              fullWidth
              />
              <Field
              requiredField
              component={TextField}
              name="company"
              type="text"
              label={<FormattedMessage {...messages.company} />}
              validate={required(<FormattedMessage {...messages.requiredValidation} />)}
              fullWidth
              />
              <Field
              requiredField
              component={TextField}
              name="key"
              type="text"
              label={<FormattedMessage {...messages.key} />}
              validate={composeValidators(required(<FormattedMessage {...messages.requiredValidation} />),
              isValidKey(<FormattedMessage {...messages.keyValidation} />),
              checkKeyValidity(<FormattedMessage {...messages.keyUniqueness} />))}
              fullWidth
              />
              <Field
              component={PhoneNumber}
              country={country.toUpperCase()}
              name="phone"
              label={<FormattedMessage {...messages.phone} />}
              fullWidth
              />
            </Grid>
          </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => onClose()} color="primary">
              <FormattedMessage {...messages.cancel} />
            </Button>
            <Button 
              type="submit"
              disabled={pristine || invalid} 
              onClick={() => onClose()}
              color="primary">
              <FormattedMessage {...messages.signUp} />
            </Button>
          </DialogActions>
        </form>
      )}
      />
    </Dialog>
)};

GetStarted.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  country: PropTypes.string,
  classes: PropTypes.object,
}

const mapStateToProps = state =>({
  country: getCountry(state),
});

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps),
);

export default enhance(GetStarted);