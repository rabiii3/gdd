import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'ramda';
import { FormattedMessage } from 'react-intl';
import { Form, Field } from 'react-final-form';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import withStyles from '@material-ui/core/styles/withStyles';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '../../forms/TextField';
import withRoutes from '../../hoc/routes';
import withNoAuth from '../../hoc/noauth';
import messages from './message';
import { resendRegisterConfirmation } from '../../actions/auth';
import {
  required,
  composeValidators,
  emailFormat,
} from '../../forms/utils';


import { Container, Content } from '../../widgets';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    color: 'white',
    float: 'right',
  },
  card: {
    width: 450,
    marginTop: '90px',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2,
    width: 300,
  },
});

export const Page = ({ routes, classes, actions }) => {
  const onSubmit = values => {
    actions.resendRegisterConfirmation(values);
  };

  return (
    <Container>
      <Content>
        <Grid container direction="row" justify="center">
          <Grid item xs={12}>
            <br />
            <br />
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center">
              <Card className={classes.card}>
                <AppBar position="static" color="default">
                  <Tabs value={0} indicatorColor="primary" textColor="primary" fullWidth>
                    <Tab label="Resend confirmation instruction" />
                  </Tabs>
                </AppBar>
                <Form
                  onSubmit={onSubmit}
                  render={({ handleSubmit, pristine, form, invalid }) => (
                    <form onSubmit={handleSubmit}>
                      <Field
                        className={classes.textField}
                        validate={composeValidators(
                          required(<FormattedMessage {...messages.requiredValidation} />),
                          emailFormat(<FormattedMessage {...messages.emailValidation} />),
                        )}
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
                        <FormattedMessage {...messages.resend} />
                      </Button>
                    </form>
                  )}
                />
              </Card>
            </Grid>
          </Grid>
          <FormHelperText>
            <FormattedMessage {...messages.haveLogin} />
            {
              <Button component={Link} to={routes.getPathByName('resumes')} color="primary">
                <FormattedMessage {...messages.signIn} />
              </Button>
            }
          </FormHelperText>
        </Grid>
      </Content>
    </Container>
  );
};

Page.propTypes = {
  classes: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  routes: PropTypes.object.isRequired,
};

const actions = { resendRegisterConfirmation };
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
export default enhance(Page);
