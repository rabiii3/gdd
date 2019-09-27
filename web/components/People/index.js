import React from 'react';
import { compose, map } from 'ramda';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Preview from './Person';

const styles = {};
export const Component = ({ people, actions, userLogged}) => (
  <Grid container justify="center" wrap="wrap">
    {map(person => <Preview key={person._id} people={person} actions={actions} userLogged={userLogged}/>)(people)}
  </Grid>
);

Component.propTypes = {
  actions: PropTypes.object,
  people: PropTypes.array,
  userLogged: PropTypes.object,
};

export const enhance = compose(withStyles(styles));
export default enhance(Component);
