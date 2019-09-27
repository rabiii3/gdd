/* eslint-disable react/prop-types, react/jsx-handler-names */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose } from 'ramda';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import Avatar from '@material-ui/core/Avatar/Avatar';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import '../../../../node_modules/react-select/dist/react-select';
import { UserAvatar } from '../../widgets/Avatar/index';
import { fullname } from '../../../lib/models/people';
import { Spacer } from '../../widgets/index';
import { SMALL } from '../../widgets/ResumeStatus';

const styles = theme => ({
  root: {
    marginLeft: theme.spacing.unit * 2,
    height: 150,
  },
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
});

const NoOptionsMessage = props => {
  return (
    <Typography color="textSecondary" className={props.selectProps.classes.noOptionsMessage} {...props.innerProps}>
      {props.children}
    </Typography>
  );
};

const inputComponent = ({ inputRef, ...props }) => {
  return <div ref={inputRef} {...props} />;
};

const Control = props => {
  return (
    <TextField
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
      <UserAvatar
        user={props.children}
        size="SMALL"
      />
      <Spacer size={SMALL} />
      {fullname(props.children)}
    </MenuItem>
  );
};

const Placeholder = props => {
  return (
    <Typography color="textSecondary" className={props.selectProps.classes.placeholder} {...props.innerProps}>
      {props.children}
    </Typography>
  );
};

const MultiValue = props => {
  const user = props.children
  return (
    <Chip
      tabIndex={-1}
      label={fullname(user)}
      avatar={<Avatar alt="Natacha" src={user.picture} />}
      color="primary"
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    >
    </Chip>
  );
};

const Menu = props => {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
};

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
};

const MultipleSelect = ({
  input: { value, name, onChange, ...restInput },
  meta: { error, touched },
  classes,
  suggestion,
  defaultValue,
  ...rest
}) => {
  return (
    <div >
      <NoSsr>
        <Select
          {...rest}
          name={name}
          inputProps={restInput}
          onChange={onChange}
          classes={classes}
          value={value ? value.label : defaultValue}
          options={suggestion}
          components={components}
          error={error}
          helperText={touched ? error : undefined}
          defaultValue={defaultValue}
        />
      </NoSsr>
    </div>
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
