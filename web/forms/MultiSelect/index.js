import React from 'react';
import PropTypes from 'prop-types';
import { compose, reduce, append, propEq, find, has } from 'ramda';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import '../../../../node_modules/react-select/dist/react-select';
import messages from '../../components/SaveResume/messages';

const styles = theme => ({
  root: {
    marginLeft: theme.spacing(2),
    height: 150,
  },
  input: {
    display: 'flex',
    padding: 0,
    height: 'auto',
    overridesUnderline: {
      '& .MuiInput-underline-367:before {': {
        borderBottom: '1px solid #ff3d00'
      }
    },
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
  },
  chip: {
    margin: `${theme.spacing(1) / 2}px ${theme.spacing(1) / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  red: {
    color: "#f44336",
    margin: theme.spacing(0.5),
  },
  margin: {
    marginBottom: 7,
    marginLeft: '-0.7px'
  }
});

const NoOptionsMessage = props => {
  return (
    props.children
  );
};

const inputComponent = ({ inputRef, ...props }) => {
  return <div ref={inputRef} {...props} />;
};

inputComponent.propTypes = {
  inputRef: PropTypes.func,
};

const Control = props => {
  return (
    <TextField
      error={props && props.selectProps.dirty && props.selectProps.required && !props.hasValue}
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
};

Control.propTypes = {
  selectProps: PropTypes.object,
  hasValue: PropTypes.bool,
  innerRef: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.object,
  innerProps: PropTypes.object,
};

const Option = props => {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
};

Option.propTypes = {
  innerRef: PropTypes.func,
  innerProps: PropTypes.object,
  isFocused: PropTypes.bool,
  children: PropTypes.node,
  isSelected: PropTypes.bool,
};

const MultiValue = props => {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      color="primary"
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
};

MultiValue.propTypes = {
  selectProps: PropTypes.object,
  removeProps: PropTypes.object,
  isFocused: PropTypes.bool,
  children: PropTypes.node,
};

const Menu = props => {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
};

Menu.propTypes = {
  selectProps: PropTypes.object,
  innerProps: PropTypes.object,
  children: PropTypes.node,
};

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
};

const MultipleSelect = ({
  input: { value, name, onChange, ...restInput },
  meta: { error, touched, dirty },
  classes,
  suggestion,
  defaultValue,
  ...rest
}) => {
  return (
    <NoSsr>
      <Select
        {...rest}
        placeholder={rest.required && dirty ? !value || value && !value.length ?
          <Typography variant="subtitle1" className={classNames(classes.red, classes.margin)}>
            {rest.placeholder}
          </Typography>
          :
          <Typography color="textSecondary" >
            {rest.placeholder}
          </Typography>
          :
          <Typography color="textSecondary" >
            {rest.placeholder}
          </Typography>}
        name={name}
        inputProps={restInput}
        onChange={onChange}
        classes={classes}
        value={reduce((acc, val) => append(find(propEq( has('value', val) ? 'value' : '_id', val.value || val._id || val), suggestion), acc), [], value)}
        options={suggestion}
        components={components}
        error={error}
        helperText={touched ? error : undefined}
        defaultValue={defaultValue}
        dirty={dirty}
      />

      {rest.required && dirty && (!value || value && !value.length) &&
        <Typography variant="caption" className={classes.red}>
          <FormattedMessage {...messages.requiredValidation} />
        </Typography>}
    </NoSsr>
  );
};

MultipleSelect.propTypes = {
  input: PropTypes.object.isRequired,
  classes: PropTypes.object,
  suggestion: PropTypes.array,
  meta: PropTypes.object,
  defaultValue: PropTypes.array,
  margin: PropTypes.string,
};

export const enhance = compose(withStyles(styles, { withTheme: true }));
export default enhance(MultipleSelect);