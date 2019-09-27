import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';


const TextFieldForm = ({ input: { value, onChange, name, ...restInput }, requiredField, meta, handleCapitalizeSkill = null, ...rest }) => {
  const showError = meta.touched && requiredField ? !meta.valid : meta.error && meta.touched && meta.dirty;

  return (
    <TextField
      {...rest}
      name={name}
      value={!handleCapitalizeSkill ? value : handleCapitalizeSkill(value)}
      onChange={onChange}
      inputProps={restInput}
      helperText={showError ? meta.error || meta.submitError : undefined}
      error={showError}
    />
  );
};
TextFieldForm.propTypes = {
  classes: PropTypes.object,
  input: PropTypes.object,
  meta: PropTypes.object,
  requiredField: PropTypes.bool,
  handleCapitalizeSkill: PropTypes.func,
}

export default TextFieldForm;
