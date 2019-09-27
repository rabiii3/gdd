import React from 'react';
import { compose } from 'recompose';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import withRoutes from '../../hoc/routes';
import withNoAuth from '../../hoc/noauth';
import { Container, Content } from '../../widgets';
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
});

export const Page = ({ routes, classes }) => (
  <Container className={classes.root}>
    <Content>
      <Grid container justify="center">
        <Grid item xs={12}>
          <Typography align="center" variant="display3" color="textPrimary">
            <FormattedMessage {...messages.almostThere} />
          </Typography>
          <Typography align="center" variant="caption">
            <FormattedMessage {...messages.checkAccount} />
          </Typography>
          <br /> <br />
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <br /> <br />
          <Typography variant="body1" align="center">
            <FormattedMessage {...messages.noConfirmation} />
          </Typography>
          <br /> <br />
        </Grid>
        <Grid item>
          <Button
            component={Link}
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
            align="center"
            to={routes.getPathByName('requestNewConfirmationEmail')}
          >
            <FormattedMessage {...messages.requestConfirmation} />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="caption" align="center">
            <FormattedMessage {...messages.haveLogin} />
            {
              <Button color="primary" component={Link} to={routes.getPathByName('resumes')}>
                <FormattedMessage {...messages.signIn} />
              </Button>
            }
          </Typography>
        </Grid>
      </Grid>
    </Content>
  </Container>
);

Page.propTypes = {
  classes: PropTypes.object,
  routes: PropTypes.object.isRequired,
};

export const enhance = compose(
  withStyles(styles),
  withRoutes,
  withNoAuth,
);

export default enhance(Page);
