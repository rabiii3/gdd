import { compose } from 'ramda';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Register from './Register';
import SignInWith from '../SignInWith';


const TabContainer = props => {
  return <Typography component="div">{props.children}</Typography>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  card: {
    width: 450,
    [theme.breakpoints.down('xs')]: {
      width: 320,
    },
  },
  gridContainer: {
    marginTop: '100px',
  },
  grid: {
    flexBasis: 'initial',
  },
  divider:{
    marginTop: 44,
  },
  CardContent:{
    paddingTop: 40,
  }
});

export const LoginForm = ({ classes, user, registerInWith, registerIn }) => (
  <Grid container justify="center" className={classes.gridContainer}>
    <Grid item xs={12} className={classes.grid}>
      <Card className={classes.card}>
        <AppBar position="static" color="default">
          <Tabs
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            value={0}
          >
            <Tab label={<FormattedMessage {...messages.register} />} />
          </Tabs>
        </AppBar>
        <CardContent className={classes.CardContent}>
          <TabContainer>
            <Grid container item justify="center" >
              <SignInWith login={registerInWith} />
            </Grid>
            <Divider variant="middle" className={classes.divider} />
            <Typography align="center" variant="caption"><FormattedMessage {...messages.or} /></Typography>
              <Register user={user} login={registerIn} />
          </TabContainer>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  registerInWith: PropTypes.func.isRequired,
  registerIn: PropTypes.func.isRequired,
};

export const enhance = compose(
  withStyles(styles),
);

export default enhance(LoginForm);
