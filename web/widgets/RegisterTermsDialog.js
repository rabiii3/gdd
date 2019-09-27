import React from 'react';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { compose } from 'ramda';
import { FormattedMessage } from 'react-intl';
import { withHandlers, withState } from 'recompose';
import messages from './messages';

const Styles = {
  terms: {
    color: 'blue',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
};
const RegisterTermsDialog = ({ classes, closeTermsDialog, openTermsDialog, isDialogOpened }) => (
  <Grid>
    <Typography className={classes.terms} onClick={openTermsDialog}>
      <FormattedMessage {...messages.terms} />
    </Typography>
    <Dialog open={isDialogOpened} onClose={closeTermsDialog} scroll="paper" aria-labelledby="scroll-dialog-title">
      <DialogTitle id="scroll-dialog-title">
        {' '}
        <FormattedMessage {...messages.terms} />
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <FormattedMessage {...messages.acceptTermsContent} />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeTermsDialog} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  </Grid>
);
RegisterTermsDialog.propTypes = {
  openTermsDialog: PropTypes.func,
  closeTermsDialog: PropTypes.func,
  isDialogOpened: PropTypes.bool,
  classes: PropTypes.object,
};

const withDialog = withState('isDialogOpened', 'toggleDialog', false);
const withDialogHandlers = withHandlers({
  openTermsDialog: ({ toggleDialog }) => () => toggleDialog(true),
  closeTermsDialog: ({ toggleDialog }) => () => toggleDialog(false),
});
const enhance = compose(
  withStyles(Styles),
  withDialog,
  withDialogHandlers,
);
export default enhance(RegisterTermsDialog);
