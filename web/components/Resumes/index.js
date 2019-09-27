import React from 'react';
import { compose, propOr } from 'ramda';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import Preview from '../Resume';
import messages from './messages'; 

const style = () => ({});

export const Component = ({ resumes, people, actions, skills }) => (
  <Grid container justify="center" wrap="wrap">
    {
      resumes ?
      resumes.map(resume => {
      const author = people[resume.createdBy];
        return (
          <Preview
            key={resume._id}
            resume={resume}
            author={author}
            actions={actions}
            skills={skills}
            isClickable
            ratingValue={propOr(0, "rating")(resume)}
          />
        );
      })
      :
      <Typography variant="display3" gutterBottom> 
        <FormattedMessage {...messages.emptyResumesMessage} /> 
      </Typography>
    }
  </Grid>
);

Component.propTypes = {
  classes: PropTypes.object,
  resumes: PropTypes.array,
  people: PropTypes.object,
  actions: PropTypes.object,
  skills: PropTypes.object,
};

export const enhance = compose(withStyles(style));
export default enhance(Component);