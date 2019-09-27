import React from 'react';
import PropTypes from 'prop-types';
import { compose, withStateHandlers } from 'recompose';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import messages from './messages';
import Getstarted from '../Getstarted';

const styles = theme => ({
  appbarColor:{
    backgroundColor:"white",
  },
  title: {
    fontSize: '1.3em',
    fontWeight: 'bold',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.2em',
    },
    textDecoration: 'none',
  },
  icon: {
    fontSize: '1em',
    width: '100%',
    color: 'black'
  },
  page:{
    height: '100vh',
    paddingTop: '20vh'
  },
  content:{
    height: '50vh',
  },
  firstSectionContainer:{
    marginTop: 'inherit',
    maxWidth: '60vw',
  },
  firstSectionTitleFont:{
    fontSize: 'calc(1em + 4vw)',
  },
  firstSectionDescription:{
    fontSize: 'calc(0.5em + 1vw)',
    width: '70%',
    margin: '5% auto'
  },
  '@media(max-width:1100px)':{
    bg:{
      backgroundImage: 'url(//google.com/chrome/static/images/hero-back-mobile-2x.jpg)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    }, 
  },
  '@media(min-width:1100px)':{
    bg:{
      backgroundImage: 'url(//google.com/chrome/static/images/hero-back-large-desktop-2x.jpg)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    }, 
  },
  img:{
    width: '30vw',
    minWidth: '320px'
  },
  paragraph:{
    width: '20vw',
    minWidth: '320px',
  },
  tryKoopttoday:{
    color: 'white',
    margin:'0% 20%',
  },
  margin:{
    margin: '10vh'
  },
  bottomBarTitle:{
    margin: '2vh',
    color: '#fff',
  },
  bottomBar:{
    backgroundColor: '#578FEF',
    padding: '10px'
  },
});

export const Page = ({ open, handleOpen, classes }) => (
  
  <Grid container direction="column">
    <Grid item>
      <AppBar id="header" position="fixed" className={classes.appbarColor}>
        <Toolbar>
          <Grid container direction="row" justify="space-between" wrap="nowrap">
            <Grid item container wrap="nowrap" alignItems="center" xs={6}>
              <IconButton variant="flat">
                <Icon className={classNames(classes.icon, 'fas fa-users')} />
              </IconButton>
              <Typography color="textPrimary" className={classes.title} noWrap>
                <FormattedMessage {...messages.title } />
              </Typography>
            </Grid>
            <Hidden smDown>
            <Grid item container justify="flex-end" alignItems="center" spacing={2} wrap="nowrap" xs={6}>
              <Grid item >
                <Button size="small" color="inherit">
                  <Typography color="textPrimary" noWrap>
                    <FormattedMessage {...messages.pricing} /> 
                  </Typography>
                </Button>
              </Grid>
              <Grid item >
                <Button size="small" color="inherit">
                  <Typography color="textPrimary" noWrap>
                    <FormattedMessage {...messages.contact} />  
                  </Typography>
                </Button>
              </Grid>
              <Grid item >
                <Button size="small" color="inherit">
                  <Typography color="textPrimary" noWrap>
                    <FormattedMessage {...messages.signIn} /> 
                  </Typography>
                </Button>
              </Grid>
              <Grid item >
                <Button size="medium" variant="contained" color="primary" onClick={() => handleOpen()}>
                  <Typography color="inherit" noWrap>
                    <FormattedMessage {...messages.getStarted} /> 
                  </Typography>
                </Button>
              </Grid>
            </Grid>
            </Hidden>
          </Grid>
        </Toolbar>      
      </AppBar>
    </Grid>
    
    <Grid item container direction="column" justify="center" alignItems="center" className={classNames(classes.page, classes.bg)}>
      <Grid item className={classes.firstSectionContainer}>
        <Typography variant="h1" align="center" gutterBottom className={classes.firstSectionTitleFont}>
          <FormattedMessage {...messages.firstSectionTitle} /> 
        </Typography>
        <Typography variant="subtitle1" align="center" paragraph className={classes.firstSectionDescription}> 
          <FormattedMessage {...messages.firstSectionDescription} /> 
        </Typography>
      </Grid>
      <Grid item>
        <Button size="large" variant="contained" color="primary" onClick={() => handleOpen()}>
          <Typography color="inherit" noWrap>
            <FormattedMessage {...messages.getStarted} />
          </Typography>
        </Button> 
      </Grid>
      <Grid item>
        <Fab color="primary" onClick={() =>window.scroll(0, document.getElementById("sectionTow").offsetTop - document.getElementById("header").offsetHeight)} className={classes.margin}>
          <Icon><ExpandMoreIcon /></Icon>
        </Fab>
      </Grid>
    </Grid>

    <Grid id="sectionTow" item container direction="row" justify="space-around" alignItems="center" className={classes.content}>
      <Grid item className={classes.paragraph}>
        <Typography variant="h6" align="center" gutterBottom>
          <FormattedMessage {...messages.descriptionTitle} /> 
        </Typography>
        <Typography variant="body2">
          <FormattedMessage {...messages.description} /> 
        </Typography>
      </Grid>
      <Grid item>
        <img src='https://i.imgur.com/0fNXgvQ.png' alt="koopt resumes" className={classes.img} />
      </Grid>
    </Grid>

    <Grid item container direction="row-reverse" justify="space-around" alignItems="center" className={classes.content}>
      <Grid item className={classes.paragraph}>
        <Typography variant="h6" align="center" gutterBottom>
          <FormattedMessage {...messages.descriptionTitle} /> 
        </Typography>
        <Typography variant="body2">
          <FormattedMessage {...messages.description} /> 
        </Typography>
      </Grid>
      <Grid item>
        <img src='https://i.imgur.com/bFOKEyf.png' alt="koopt statics" className={classes.img}/>
      </Grid>
    </Grid>

    <Grid item container direction="row" justify="space-around" alignItems="center" className={classes.content}>
      <Grid item className={classes.paragraph}>
        <Typography variant="h6" align="center" gutterBottom>
          <FormattedMessage {...messages.descriptionTitle} /> 
        </Typography>
        <Typography variant="body2">
          <FormattedMessage {...messages.description} /> 
        </Typography>
      </Grid>
      <Grid item>
        <img src='https://i.imgur.com/bFOKEyf.png' alt="koopt resumes table" className={classes.img}/>
      </Grid>
    </Grid>

    <Grid item container direction="column" justify="center" alignItems="center" className={classes.bottomBar}>
      <Grid item>
        <Typography variant="h4" align="center" gutterBottom className={classes.bottomBarTitle}>
          <FormattedMessage {...messages.tryKoopttoday} /> 
        </Typography>
      </Grid>
      <Grid item>
        <Button size="large" variant="contained" color="primary" onClick={() => handleOpen()}>
          <Typography color="inherit" noWrap>
            <FormattedMessage {...messages.getStarted} />
          </Typography>
        </Button>
      </Grid>
    </Grid>
    <Getstarted open={open} onClose={handleOpen}/>
  </Grid>

)

Page.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool,
  handleOpen: PropTypes.func,
};

const withDialogOpen = withStateHandlers(() => ({open: false}), {
  handleOpen : ({open}) => () => ({ open: !open }),
});

export const enhance = compose(
  withDialogOpen,
  withStyles(styles),
);

export default enhance(Page);