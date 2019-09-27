import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import { compose} from 'ramda'
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';
import TextField from '../forms/TextField'
import {required, composeValidators, isSkillExists, skillSize} from '../forms/utils'
import messages from './messages';


const styles = ({
  textField: {
    width: '17rem',
  },
})

const ConfirmCreateEditSkill = ({enableCreateEditSkill, add, update, chooseThisSkill, skill, skills, classes}) => {
  const onSubmit = values => {
  if (values._id) {
    update({...values, label: values.label})
    enableCreateEditSkill(0);
    } else {
        add(values.label)
        enableCreateEditSkill(0);
      }
    }


const handleCapitalizeSkill = value => {
    if (value.length === 1)
      return value.charAt(0).toUpperCase() + value.substring(1);
    if (value.length > 1 && value.charAt(value.length - 2) === ' ' )
      return value.substring(0, value.length -1) + value.charAt(value.length - 1).toUpperCase() + value.substring(value.length);
    return value
  }

  return (
      <Form
        onSubmit={onSubmit}
        initialValues={skill ? {...skill} : null}
        render={({ handleSubmit, pristine, form, invalid}) => (
          <form onSubmit={handleSubmit}>
                <Field
                  validate={composeValidators(required(<FormattedMessage {...messages.requiredValidation}/>),
                isSkillExists((<FormattedMessage {...messages.errorSkillExist} />), skills),
                skillSize(<FormattedMessage {...messages.skillSize} />),
              )}
                  component={TextField}
                  name="label"
                  type="text"
                  handleCapitalizeSkill = {handleCapitalizeSkill}
                  label={<FormattedMessage {...messages.addLabelContent} />}
                  disabled={false}
                  className={classes.textField}
                />
          <DialogActions>
            <Button color="primary" onClick={() => {enableCreateEditSkill(0); chooseThisSkill(null)}}>
              <FormattedMessage {...messages.disagree} />
            </Button>
            <Button
              type="submit"
              color="primary"
              autoFocus
              onClick={() => {
                enableCreateEditSkill(0);
                chooseThisSkill(null)
              }}
              disabled={pristine || invalid}
              >
              <FormattedMessage {...messages.agree} />
            </Button>
          </DialogActions>
          </form>
        )}
      />
)}

ConfirmCreateEditSkill.propTypes = {

enableCreateEditSkill: PropTypes.func,
chooseThisSkill: PropTypes.func,
selectedSkill: PropTypes.object,
add: PropTypes.func,
update: PropTypes.func,
skills: PropTypes.array,
classes: PropTypes.object,
skill: PropTypes.object,
}

export const enhance = compose(
  withStyles(styles),
)

export default enhance(ConfirmCreateEditSkill);
