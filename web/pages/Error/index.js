import React from 'react';
import classNames from 'classnames';
import Icon from '@material-ui/core/Icon';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Container, Content } from '../../widgets';
import Divider from '@material-ui/core/Divider';
import { FormattedMessage } from 'react-intl';
import Typography from '@material-ui/core/Typography';
import messages from './message';

const styles = theme => ({
  root: {
    marginTop: '5em',
  },
  div: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  bomb: {
    fontSize: '2em',
  },
});

export const Page = ({ classes, code }) => (
  <Container className={classes.root}>
    <Content>
      <Grid container justify="center">
        <Grid item xs={12}>
          <Typography align="center" variant="display3" color="textPrimary">
            <Icon className={classNames(`fas fa-bomb`, classes.bomb)} />
            <FormattedMessage {...messages.error} />
          </Typography>
          <br /> <br />
          <br /> <br />
          <Typography align="center" variant="caption">
            <FormattedMessage {...messages[code] } />
          </Typography>
        </Grid>
      </Grid>
    </Content>
  </Container>
);

Page.propTypes = {
  classes: PropTypes.object,
  code: PropTypes.string.isRequired,
};

export const enhance = compose( withStyles(styles));

export default enhance(Page);
