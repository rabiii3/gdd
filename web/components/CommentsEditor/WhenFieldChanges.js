import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';

const WhenFieldChanges = ({ field, becomes, set, to }) => (
  <Field name={set} subscription={{}}>
    {({ input: { onChange } }) => (
      <OnChange name={field}>
        {value => {
          if (value === becomes) {
            onChange(to)
          }
        }}
      </OnChange>
    )}
  </Field>
);

WhenFieldChanges.propTypes = {
  field: PropTypes.string,
  becomes: PropTypes.string,
  set: PropTypes.string,
  to: PropTypes.object,
}

export default WhenFieldChanges;