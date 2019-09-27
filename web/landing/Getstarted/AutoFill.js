import React from 'react';
import PropTypes from 'prop-types';
import { toLower, replace } from 'ramda';
import { Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';

const AutoFill = ({ field, set }) => (
  <Field name={set} subscription={{}}>
    {({ input: { onChange } }) => (
      <OnChange name={field}>
        {value => {
          onChange(replace(/\s/g, '', toLower(value)));
        }}
      </OnChange>
    )}
  </Field>
);

AutoFill.propTypes = {
  field: PropTypes.string,
  set: PropTypes.string,
}

export default AutoFill;