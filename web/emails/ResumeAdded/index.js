import React from 'react';
import { compose } from 'recompose';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Typography from '@material-ui/core/Typography';
import messages from './message';
import { fullname } from '../../models/users';

const styles = () => ({});

export const Page = ({ url, person, author, resume }) => (
  <div>
    <Grid container>
      <Grid item xs={3}>
        <Typography variant="h6" color="textPrimary">
          <FormattedMessage {...messages.hello} values={{ name: fullname(person) }} />
        </Typography>
      </Grid>
    </Grid>
    <p />
    <Typography align="left" variant="body1" color="textPrimary">
      <FormattedMessage {...messages.add} values={{ candidate: fullname(resume), author: fullname(author) }} />
      <p />
      <a href={new URL(`/resume/${resume._id}`, url).toString()}>
        <FormattedMessage {...messages.view} />
      </a>
    </Typography>
    <p />
  </div>
);

Page.propTypes = {
  person: PropTypes.object.isRequired,
  resume: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
};

export const enhance = compose(withStyles(styles));

export default enhance(Page);
