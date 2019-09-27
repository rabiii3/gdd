import React from 'react';
import { compose } from 'recompose';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import messages from './message';

const styles = () => ({});

export const Page = ({ name, url }) => (
  <Paper>
    <Grid container justify="center">
      <Grid item xs={12}>
        <Typography align="center" variant="display1" color="textPrimary">
          <FormattedMessage {...messages.hello} values={{ name }} />
        </Typography>
        <Typography align="center" variant="body1" color="textPrimary">
          <FormattedMessage {...messages.text1} />
          <p />
          <FormattedMessage {...messages.text2} />
          <p />
          <FormattedMessage {...messages.text3} values={{ url }} />
          <p />
        </Typography>
      </Grid>
    </Grid>
  </Paper>
);

Page.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
};

export const enhance = compose(withStyles(styles));

export default enhance(Page);
