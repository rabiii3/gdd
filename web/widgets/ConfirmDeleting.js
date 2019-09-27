import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const ConfirmDeleting = ({ open, onClose, resume, remove, to }) => (
  <Dialog open={open}>
    <DialogTitle>
      <FormattedMessage {...messages.confirmDeletingDialogTitle} />
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        <FormattedMessage {...messages.confirmDeletingDialogContent} />
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button color="primary" onClick={() => onClose(false)}>
        <FormattedMessage {...messages.disagree} />
      </Button>
      <Button
        color="primary"
        autoFocus
        onClick={() => {
          onClose(false);
          remove(resume);
        }}
        component={Link}
        to={to}
      >
        <FormattedMessage {...messages.agree} />
      </Button>
    </DialogActions>
  </Dialog>
);

ConfirmDeleting.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  remove: PropTypes.func,
  resume: PropTypes.object,
  to: PropTypes.string,
};

export default ConfirmDeleting;
