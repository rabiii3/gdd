import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';

const CheckboxForm = ({
 input: { onChange,checked, name, ...restInput },
    ...rest,
}) => (

        <Checkbox
            {...rest}
            name={name}
            onChange={onChange}
            checked={checked}
            inputProps={restInput}
        />
    );

CheckboxForm.propTypes = {
    input: PropTypes.object.isRequired,
};

export default CheckboxForm;

