import React from 'react';
import { compose } from 'ramda';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import classNames from 'classnames';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';
import { withStyles } from '@material-ui/core/styles';

const style = theme => ({
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

const MySnackbarContent = ({ classes, className, message, onClose, variant, ...other }) => (
  <SnackbarContent
    className={classNames(classes[variant], className)}
    aria-describedby="client-snackbar"
    message={
      <span id="client-snackbar" className={classes.message}>
        <ErrorIcon className={classNames(classes.icon, classes.iconVariant)} />
        {message}
      </span>
    }
    action={[
      <IconButton key="close" aria-label="Close" color="inherit" className={classes.close} onClick={onClose}>
        <CloseIcon className={classes.icon} />
      </IconButton>,
    ]}
    {...other}
  />
);

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

export const Component = ({  classes, error, actions }) => {
  if (!error) return false;
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open
      variant="error"
      ContentProps={{ 'aria-describedby': 'message-id' }}
      onClose={() => actions.ackError()}
      autoHideDuration={6000}
    >
      <MySnackbarContent
        variant="error"
        className={classes.margin}
        classes={classes}
        message={error.type}
        onClose={() => actions.ackError()}
      />
    </Snackbar>
  );
};

Component.propTypes = {
  error: PropTypes.object,
  actions: PropTypes.object,
  classes: PropTypes.object,
};

export const enhance = compose(
  withStyles(style),
  injectIntl,
);

export default enhance(Component);
