import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  FormControl: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2,
    width: 250,
  },
});

const SelectCountry = ({ input: { value, onChange, name, ...restInput }, classes, callingcodes, ...rest }) => {
  return (
    <div>
      <FormControl className={classes.FormControl}>
        <InputLabel> Country Format Number </InputLabel>
        <Select {...rest} name={name} onChange={onChange} inputProps={restInput} value={value}>
          {callingcodes.map((item, index) => {
            return (
              <MenuItem key={index} value={item.code}>
                {' '}
                {item.country}{' '}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

SelectCountry.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  classes: PropTypes.object,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  ]),
  callingcodes: PropTypes.array,
};

export const enhance = compose(withStyles(styles));

export default enhance(SelectCountry);
