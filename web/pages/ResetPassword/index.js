import React from 'react';
import qs from 'query-string';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { compose } from 'ramda';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { FormattedMessage } from 'react-intl';
import { bindActionCreators } from 'redux';
import messages from './messages';
import { updatePassword } from '../../actions/auth';
import { Container, Content } from '../../widgets';
import withRoutes from '../../hoc/routes';
import TextField from '../../forms/TextField';
import { required, composeValidators, minLength, passwordConfirmation } from '../../forms/utils';

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
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2,
    width: 300,
  },
});

export const Component = ({ location, classes, actions, routes }) => {
  const onSubmit = values => {
    const parsed = qs.parse(location.search);
    actions.updatePassword({ token: parsed.id, password: values.password });
  };

  return (
    <Container className={classes.root}>
      <Content>
        <Grid container justify="center">
          <Grid item xs={12}>
            <Grid container justify="center">
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
                        validate={composeValidators(
                          required(<FormattedMessage {...messages.requiredValidation} />),
                          minLength(<FormattedMessage {...messages.passwordValidation} />, 8),
                        )}
                        className={classes.textField}
                        component={TextField}
                        label={<FormattedMessage {...messages.password} />}
                        name="password"
                        type="password"
                      />
                      <Field
                        validate={composeValidators(
                          required(<FormattedMessage {...messages.requiredValidation} />),
                          passwordConfirmation(<FormattedMessage {...messages.passwordConfirmation} />, 8),
                        )}
                        className={classes.textField}
                        component={TextField}
                        label={<FormattedMessage {...messages.ConfirmPassword} />}
                        name="ConfirmPassword"
                        type="password"
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
          <Grid item xs={12}>
            <Typography variant="caption" align="center">
              <FormattedMessage {...messages.haveLogin} />
              {
                <Button color="primary" component={Link} to={routes.getPathByName('resumes')}>
                  <FormattedMessage {...messages.signIn} />
                </Button>
              }
            </Typography>
            <Typography variant="caption" align="center">
              <FormattedMessage {...messages.notReciveConfirmation} />
              {
                <Button color="primary" component={Link} to={routes.getPathByName('requestResetPassword')}>
                  <FormattedMessage {...messages.requestPassword} />
                </Button>
              }
            </Typography>
          </Grid>
        </Grid>
      </Content>
    </Container>
  );
};

Component.propTypes = {
  classes: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  routes: PropTypes.object.isRequired,
  user: PropTypes.object,
  location: PropTypes.object.isRequired,
};

const actions = { updatePassword };

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export const enhance = compose(
  withStyles(styles),
  withRoutes,
  connect(
    null,
    mapDispatchToProps,
  ),
);
export default enhance(Component);
