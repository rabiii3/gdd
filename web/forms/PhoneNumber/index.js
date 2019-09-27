import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { AsYouType } from 'libphonenumber-js';
import FlagIcon from '../../components/FlagIcon'

const PhoneNumber = ({ input, name, meta, country, flagSize, ...rest }) =>  {
  const asYouType = new AsYouType(country);
  const updatedValue = asYouType.input(input.value);
  const updatedCountry = asYouType.getNumber() && asYouType.getNumber().country || country;
  const showError = meta.error && meta.touched && meta.dirty;

  return (
    <TextField
      {...rest}
      name={name}
      helperText={showError ? meta.error || meta.submitError : undefined}
      error={showError}
      value={updatedValue}
      onChange={input.onChange}
      onBlur={() => input.onBlur()}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <FlagIcon code={updatedCountry.toLowerCase()} size={flagSize} />
          </InputAdornment>
        ),
      }}
    />
  );
}

PhoneNumber.propTypes = {
  input: PropTypes.object,
  name: PropTypes.string,
  country: PropTypes.string,
  flagSize: PropTypes.string,
  meta: PropTypes.object,
};

export default PhoneNumber;
