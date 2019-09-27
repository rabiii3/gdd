import React from 'react';
import { compose } from 'recompose';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import messages from './message';
import { Spacer, SMALL } from '../../widgets/Spacer';

const styles = () => ({});

export const Page = ({ resetUrl, name, url }) => (

  <div>
    <Grid container>
      <Grid item xs={3}>
        <Typography align="left" variant="display1" color="textPrimary">
          <FormattedMessage {...messages.hello} values={{ name }} />
        </Typography>
      </Grid>
    </Grid>
    <p />
    <Typography align="left" variant="body1" color="textPrimary">
      <FormattedMessage {...messages.text1} />
      <a href={`${url}`}>
        {url}
      </a>
      <br />
      <FormattedMessage {...messages.text2} />
      <p />
      <FormattedMessage {...messages.text3} />
      <br />
      <a href={`${resetUrl}`}>
        <FormattedMessage {...messages.reset} />
      </a>
    </Typography>
    <p />
  </div>
);

Page.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
};

export const enhance = compose(withStyles(styles));

export default enhance(Page);
