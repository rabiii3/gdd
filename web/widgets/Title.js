import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { compose } from 'recompose';

const Styles = {};

export const Title = ({ text }) => (
  <Typography variant="h6">
    {text}
  </Typography>
);

Title.propTypes = {
  text: PropTypes.string.isRequired,
};
const enhance = compose(withStyles(Styles));
export default enhance(Title);
