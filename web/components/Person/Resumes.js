import React from 'react';
import { compose, propOr } from 'ramda';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Preview from '../Resume';

const style = () => ({});

export const Component = ({ resumes, person, actions, skills }) => (
  <Grid container justify="center" wrap="wrap">
    {resumes.map(resume => {
      return <Preview key={resume._id} resume={resume} author={person} actions={actions} skills={skills} ratingValue={propOr(0, "rating")(resume)}
      />;
    })}
  </Grid>
);

Component.propTypes = {
  resumes: PropTypes.array,
  person: PropTypes.object,
  actions: PropTypes.object,
  skills: PropTypes.object,
};

export const enhance = compose(withStyles(style));
export default enhance(Component);
