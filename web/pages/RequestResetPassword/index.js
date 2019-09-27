import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { bindActionCreators } from 'redux';
import { Form, Field } from 'react-final-form';
import { compose } from 'ramda';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '../../forms/TextField';
import messages from './messages';
import { requestResetPassword } from '../../actions/auth';
import { emailFormat } from '../../forms/utils';
import { Container, Content } from '../../widgets';
import withRoutes from '../../hoc/routes';
import withNoAuth from '../../hoc/noauth';

const styles = theme => ({
  root: {
    marginTop: '5em',
  },
  button: {
    margin: theme.spacing.unit,
    color: 'white',
    float: 'right',
  },
  card: {
    width: 450,
    [theme.breakpoints.down('xs')]: {
      width: 320,
    },
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2,
    width: 300,
  },
});

export const Component = ({ classes, routes, actions }) => {
  const onSubmit = values => {
    actions.requestResetPassword(values);
  };

  return (
    <Container className={classes.root}>
      <Content>
        <Grid container justify="center">
          <Grid item>
            <Card className={classes.card}>
              <AppBar position="static" color="default">
                <Tabs value={0} indicatorColor="primary" fullWidth>
                  <Tab label={<FormattedMessage {...messages.title} />} />
                </Tabs>
              </AppBar>
              <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, pristine, form, invalid }) => (
                  <form onSubmit={handleSubmit}>
                    <Field
                      validate={emailFormat(<FormattedMessage {...messages.emailValidation} />)}
                      className={classes.textField}
                      component={TextField}
                      label={<FormattedMessage {...messages.email} />}
                      name="email"
                      type="email"
                    />
                    <br />
                    <br />
                    <br />
                    <Button
                      type="submit"
                      disabled={pristine || invalid}
                      variant="contained"
                      color="primary"
                      className={classes.button}
                    >
                      <FormattedMessage {...messages.action} />
                    </Button>
                  </form>
                )}
              />
            </Card>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="caption" align="center">
            <FormattedMessage {...messages.haveLogin} />
            {
              <Button color="primary" component={Link} to={routes.getPathByName('resumes')}>
                <FormattedMessage {...messages.signIn} />
              </Button>
            }
          </Typography>
        </Grid>
      </Content>
    </Container>
  );
};

Component.propTypes = {
  classes: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  routes: PropTypes.object.isRequired,
};

const actions = { requestResetPassword };
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export const enhance = compose(
  withStyles(styles),
  connect(
    null,
    mapDispatchToProps,
  ),
  withRoutes,
  withNoAuth,
);
export default enhance(Component);
