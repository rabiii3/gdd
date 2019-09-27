import React from 'react';
import PropTypes from 'prop-types';
import { prop } from 'ramda';
import { FormattedMessage } from 'react-intl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import messages from './messages';


const ConfirmDeletingJob = ({ open, onClose, job, del }) => (
  <Dialog open={open}>
    <DialogTitle>
      <FormattedMessage {...messages.title} />
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        <FormattedMessage {...messages.content} values={{job: prop('title', job)}} />
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button color="primary" onClick={() => onClose()}>
        <FormattedMessage {...messages.no} />
      </Button>
      <Button
        color="primary"
        autoFocus
        onClick={() => {
          onClose();
          del(job);
        }}
      >
        <FormattedMessage {...messages.yes} />
      </Button>
    </DialogActions>
  </Dialog>
);

ConfirmDeletingJob.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  del: PropTypes.func,
  job: PropTypes.object,
};

export default ConfirmDeletingJob;