import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'ramda';
import Modal from '@material-ui/core/Modal';
import Form from './Form';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export const AddForm = ({ setModal, isModalOpen, classes, file, country, addForm }) => (
  <Modal open={isModalOpen} onClose={setModal}>
    <div style={getModalStyle()} className={classes.paper}>
      <Typography variant="subtitle1" id="simple-modal-description">
        <Form setModal={setModal} file={file} country={country} addForm={addForm} />
      </Typography>
    </div>
  </Modal>
);

AddForm.propTypes = {
  classes: PropTypes.object.isRequired,
  setModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  file: PropTypes.array,
  country: PropTypes.string,
  addForm: PropTypes.func,
};

export const enhance = compose(withStyles(styles));

export default enhance(AddForm);
