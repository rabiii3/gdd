import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'ramda';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import withRoutes from '../../hoc/routes';
import messages from './messages';
import { Container, Content } from '../../widgets';

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

export const Page = ({ classes, routes }) => (
  <Container className={classes.root}>
    <Content>
      <Grid container justify="center">
        <Grid item xs={12}>
          <Typography align="center" variant="display3" color="textPrimary">
            <FormattedMessage {...messages.error} />
          </Typography>
          <Typography align="center" variant="caption">
            <FormattedMessage {...messages.notFound} />
          </Typography>
          <br /> <br />
          <Divider />
          <br /> <br />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="caption" align="center">
            <Button color="primary" component={Link} to={routes.getPathByName('resumes')}>
              <FormattedMessage {...messages.return} />
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </Content>
  </Container>
);
Page.propTypes = {
  classes: PropTypes.object,
  routes: PropTypes.object,
};

export const enhance = compose(
  withStyles(styles),
  withRoutes,
);
export default enhance(Page);
