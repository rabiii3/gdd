import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const Transition = props => {
  return <Slide direction="up" {...props} />;
};
const ConfirmNavigation = ({ onCancel, onConfirm }) => (
  <Dialog TransitionComponent={Transition} open>
    <DialogTitle>
      <FormattedMessage {...messages.confirmNavigationDialogTitle} />
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        <FormattedMessage {...messages.confirmNavigationDialogContent} />
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel} color="primary">
        <FormattedMessage {...messages.disagree} />
      </Button>
      <Button onClick={onConfirm} color="primary" autoFocus>
        <FormattedMessage {...messages.agree} />
      </Button>
    </DialogActions>
  </Dialog>
);
ConfirmNavigation.propTypes = {
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
};

export default ConfirmNavigation;
