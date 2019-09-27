import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const SelectField = ({ input: { value, name, onChange, ...restInput }, label, meta, ...rest }) => {
  const showError = meta.error && meta.touched && meta.dirty;
  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Select
        {...rest}
        name={name}
        inputProps={restInput}
        onChange={onChange}
        value={value}
        helpertext={showError ? meta.error || meta.submitError : undefined}
        error={showError}
         />
    </FormControl>
  )
};

SelectField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.object,
  meta: PropTypes.object,
};

export default SelectField;
