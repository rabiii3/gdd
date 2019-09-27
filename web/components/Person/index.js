import React from 'react';
import PropTypes from 'prop-types';
import { compose, map } from 'ramda';
import { Field, Form } from 'react-final-form';
import { FormattedMessage, FormattedNumber, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import NavigationPrompt from 'react-router-navigation-prompt';
import { createStructuredSelector } from 'reselect';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import { ROLES, statusKeyValue, rolesHaveLabel, rejectWorkerFromRoles } from '../../../lib/models/people';
import MultipleSelect from '../../forms/MultiSelect';
import PhoneNumber from '../../forms/PhoneNumber';
import Select from '../../forms/Select';
import TextField from '../../forms/TextField';
import {
  composeValidators,
  emailFormat,
  passwordConfirmation,
  isPhoneNumber,
  required,
  minLength,
} from '../../forms/utils';
import { getCountry } from '../../selectors/config';
import { ChipStatus, ConfirmNavigation } from '../../widgets';
import messages from './messages';
import PersonResumes from './Resumes';
import { getRoles, totalAwardAmount, haveAward } from './utils';
import { getSkills } from '../../selectors/skills';

const Styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 4,
  },

  textField: {
    marginBottom: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * 2,
    width: 400,
    [theme.breakpoints.down('sm')]: {
      width: 280,
    },
  },
  marginContainer: {
    marginLeft: theme.spacing.unit * 6,
    marginBottom: theme.spacing.unit * 4,
  },
  marginContainerSelect: {
    marginLeft: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 4,
  },
  marginContainerForEmptyRoles: {
    marginLeft: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 4,
  },
  rolesContainer: {
    marginLeft: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 4,
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing.unit * 5,
    },
  },
  marginPhoneContainer: {
    marginLeft: '12%',
    marginBottom: theme.spacing.unit * 4,
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing.unit * 5,
    },
  },
  margin: {
    margin: theme.spacing.unit,
  },
  labelEdit: {
    color: '#0000008a',
    fontSize: '12px',
    fontFamily: 'Roboto',
    width: '100%',
  },
  labelNoEdit: {
    color: '#00000061',
    fontSize: '12px',
    fontFamily: 'Roboto',
    width: '80%',
  },
  width: {
    width: 400,
    [theme.breakpoints.down('sm')]: {
      width: 280,
    },
  },
  phonenumber: {
    marginBottom: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * 2,
    width: '100%',
  },
});

export const Component = ({
  person,
  classes,
  resumes,
  isFormDisabled,
  disableEditMode,
  actions,
  isLoggedPerson,
  isAdmin,
  country,
  skills,
}) => {
  const onSubmit = values => {
    if (values.password !== undefined && values.password !== person.password) {
      const newValues = { ...values, roles: getRoles(values.roles), password: values.password };
      actions.editPeople(newValues);
    } else {
      const newValues = { ...values, roles: getRoles(values.roles), password: person.password };
      actions.editPeople(newValues);
    }
    disableEditMode(true);
  };
  const rolesDefaultValue = rolesHaveLabel(person.roles);
  console.log('dv', rolesDefaultValue)
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{ ...person, roles: rolesDefaultValue, password: undefined }}
      render={({ handleSubmit, pristine, form, invalid, values }) => (
        <form onSubmit={handleSubmit}>
          <NavigationPrompt when={!pristine}>
            {({ onConfirm, onCancel }) => <ConfirmNavigation onCancel={onCancel} onConfirm={onConfirm} />}
          </NavigationPrompt>

          <Grid container className={classes.root}>
            <Grid item sm={12} md={5}>
              <Grid container alignItems="center">
                <Grid item>
                  <Field
                    validate={required(<FormattedMessage {...messages.requiredValidation} />)}
                    component={TextField}
                    disabled={isFormDisabled}
                    name="firstname"
                    type="text"
                    label={<FormattedMessage {...messages.firstName} />}
                    className={classes.textField}
                  />
                </Grid>
                <Grid item>
                  <Field
                    validate={required(<FormattedMessage {...messages.requiredValidation} />)}
                    component={TextField}
                    name="lastname"
                    type="text"
                    label={<FormattedMessage {...messages.lastName} />}
                    disabled={isFormDisabled}
                    className={classes.textField}
                  />
                </Grid>
                <Grid item>
                  <Field
                    validate={composeValidators(
                      required(<FormattedMessage {...messages.requiredValidation} />),
                      emailFormat(<FormattedMessage {...messages.emailValidation} />),
                    )}
                    component={TextField}
                    name="email"
                    type="email"
                    label={<FormattedMessage {...messages.email} />}
                    disabled={isFormDisabled}
                    className={classes.textField}
                  />
                </Grid>
                <Grid item>
                  <Field
                    validate={isPhoneNumber(<FormattedMessage {...messages.phoneValidation} />)}
                    component={PhoneNumber}
                    country={country.toUpperCase()}
                    name="phoneNumber"
                    type="text"
                    label={<FormattedMessage {...messages.phoneNumber} />}
                    disabled={isFormDisabled}
                    className={classes.textField}
                    flagSize="lg"
                  />
                </Grid>
                <Grid item>
                  {isLoggedPerson &&
                    !isFormDisabled && (
                    <Field
                      validate={minLength(<FormattedMessage {...messages.passwordLength} />, 8)}
                      component={TextField}
                      type="password"
                      name="password"
                      label={<FormattedMessage {...messages.password} />}
                      disabled={isFormDisabled}
                      className={classes.textField}
                    />
                  )}
                </Grid>
                <Grid item>
                  {isLoggedPerson &&
                    !isFormDisabled && (
                    <Field
                      validate={passwordConfirmation(<FormattedMessage {...messages.passwordConfirmation} />)}
                      component={TextField}
                      type="password"
                      name="confirmPassword"
                      label={<FormattedMessage {...messages.confirmPassword} />}
                      disabled={isFormDisabled}
                      className={classes.textField}
                    />
                  )}
                </Grid>
                <Grid item>
                  {isAdmin && (
                    <Grid container className={classes.marginContainerSelect}>
                      <Grid item>
                        <Field
                          label={<FormattedMessage {...messages.status} />}
                          className={classes.width}
                          name="status"
                          component={Select}
                          disabled={isFormDisabled}
                          renderValue={() => <ChipStatus person={values} />}
                        >
                          {map(status => (
                            <MenuItem key={status.key} value={status.key}>
                              {status.value}
                            </MenuItem>
                          ))(statusKeyValue)}
                        </Field>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
                <Grid item>
                  {isAdmin && (
                    <Grid container className={classes.marginContainerSelect}>
                      <Grid item> 
                      {isFormDisabled ? (
                        <label className={classes.labelNoEdit}> {<FormattedMessage {...messages.roles} />}</label>
                        ) : (
                          <label className={classes.labelEdit}> {<FormattedMessage {...messages.roles} />}</label>
                        )}
                      <Field
                        className={classes.width}
                        component={MultipleSelect}
                        name="roles"
                        type="select"
                        isMulti
                        defaultValue={rolesDefaultValue}
                        isDisabled={isFormDisabled}
                        placeholder={<FormattedMessage {...messages.rolesPlaceholder} />}
                        suggestion={rejectWorkerFromRoles(ROLES)}
                        textFieldProps={{
                          InputLabelProps: {
                            shrink: true,
                          },
                        }}
                      />
                      </Grid>
                    </Grid>
                  )}
                </Grid>
                <Grid item>
                  <Hidden xsUp={haveAward(resumes)}>
                    <Field
                      component={TextField}
                      disabled
                      name="award"
                      type="text"
                      label={
                      <FormattedMessage {...messages.totalAwardAmount} values={{ award:
                        <FormattedNumber value={totalAwardAmount(resumes)} currency="EUR" minimumFractionDigits={0} /> }}/>
                      }
                      className={classes.textField}
                    />
                  </Hidden>  
                </Grid>
              </Grid>
              {!isFormDisabled && (
                <Grid container justify="center" >
                  <Button
                    onClick={() => {
                      disableEditMode(true);
                      form.reset();
                    }}
                    color="primary"
                    variant="contained"
                    className={classes.margin}
                  >
                    <FormattedMessage {...messages.cancel} />
                  </Button>
                  <Button
                    onClick={form.reset}
                    disabled={pristine}
                    color="primary"
                    variant="contained"
                    className={classes.margin}
                  >
                    <FormattedMessage {...messages.reset} />
                  </Button>
                  <Button
                    type="submit"
                    disabled={pristine || invalid}
                    color="primary"
                    variant="contained"
                    className={classes.margin}
                  >
                    <FormattedMessage {...messages.save} />
                  </Button>
                </Grid>
              )}
            </Grid>
            <Grid item xs={12} md={7}>
              <Grid container justify="center">
                <Grid item>
                  <PersonResumes resumes={resumes} person={person} actions={actions} skills={skills} isClickable={false} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      )}
    />
  );
};

Component.propTypes = {
  person: PropTypes.object,
  classes: PropTypes.object,
  resumes: PropTypes.array,
  values: PropTypes.object,
  isFormDisabled: PropTypes.bool,
  actions: PropTypes.object,
  disableEditMode: PropTypes.func,
  isLoggedPerson: PropTypes.bool,
  isAdmin: PropTypes.bool,
  country: PropTypes.string,
  skills: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  country: getCountry,
  skills: getSkills,
});

export const enhance = compose(
  withStyles(Styles),
  connect(mapStateToProps),
  injectIntl,
);

export default enhance(Component);
