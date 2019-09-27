import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const ConfirmDeletingSkill = ({ open, onClose, skill, remove}) => (
  <Dialog open={open}>
    <DialogTitle>
      <FormattedMessage {...messages.confirmDeletingSkillDialogTitle} />
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        <FormattedMessage {...messages.confirmDeletingSkillDialogContent} />
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
          remove(skill);
        }}
      >
        <FormattedMessage {...messages.agree} />
      </Button>
    </DialogActions>
  </Dialog>
);

ConfirmDeletingSkill.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  remove: PropTypes.func,
  skill: PropTypes.object,
  to: PropTypes.string,
};

export default ConfirmDeletingSkill;
