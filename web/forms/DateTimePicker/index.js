import React from 'react';
import PropTypes from 'prop-types';
import { DateTimePicker } from '@material-ui/pickers';

const DateTimePickerForm = ({ input: { value, onChange, ...restInput }, meta, ...rest }) => {
  const showError = meta.error && meta.touched && meta.dirty;
  return (
    <DateTimePicker
      {...rest}
      keyboard
      value={value}
      minDate={new Date()}
      onChange={onChange}
      format="yyyy/MM/dd - hh:mm A"
      mask={[/\d/, /\d/, /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/, ' ', /a|p/i, 'M',]}
      inputProps={restInput}
      helperText={showError ? meta.error || meta.submitError : undefined}
      error={showError}
      clearable
    />
  );
};

DateTimePickerForm.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
};


export default DateTimePickerForm;
