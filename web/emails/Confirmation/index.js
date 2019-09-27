import React from 'react';
import { compose } from 'recompose';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import messages from './message';
import { Spacer, SMALL } from '../../widgets/index';

const styles = theme => ({
  div: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

export const Page = ({ confirmationUrl }) => (
  <div>
    <Grid container>
      <Grid item xs={6}>
        <Typography variant="h6" color="textPrimary">
          <FormattedMessage {...messages.thanks} />
        </Typography>
      </Grid>
    </Grid>
    <p />
    <Typography align="left" variant="body1" color="textPrimary">
      <div>
        <FormattedMessage {...messages.getStarted} /> <br />
      </div>
      <p />
      <a href={confirmationUrl}>
        <FormattedMessage {...messages.confirmation} />
      </a>
    </Typography>
    <p />
  </div>
);

Page.propTypes = {
  confirmationUrl: PropTypes.string,
};

export const enhance = compose(withStyles(styles));

export default enhance(Page);
