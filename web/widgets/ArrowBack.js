import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'ramda';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

export const ArrowBack = ({ history }) => (
  <IconButton onClick={() => history.goBack()}>
    <Icon className='fas fa-arrow-left' size="5x" />
  </IconButton>
);

ArrowBack.propTypes = {
  history: PropTypes.object.isRequired,
};
const enhance = compose(withRouter);
export default enhance(ArrowBack);
