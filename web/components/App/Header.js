import React from 'react';
import PropTypes from 'prop-types';
import { compose, prop } from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import classNames from 'classnames';
import Popover from '@material-ui/core/Popover';
import { withState, withHandlers } from 'recompose';
import { FormattedMessage } from 'react-intl';
import { withRouter, Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import Badge from '@material-ui/core/Badge/Badge';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Group from '@material-ui/icons/Group';
import Work from '@material-ui/icons/Work';
import Icon from '@material-ui/core/Icon';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { UserAvatar, MEDIUM } from '../../widgets/Avatar';
import UserCard from './UserCard';
import messages from './messages';
import { isAdmin } from '../../../lib/models/people';
import withRoutes from '../../hoc/routes';
import Notifications from '../Notifications';
import { getNotifications, getFiltredNotifications } from '../../selectors/notifications';

const drawerWidth = 200;

const styles = theme => ({
  root: {
    gridArea: 'header',
    flexGrow: 1,
  },
  popover: {
    marginTop: '16px',
  },

  logo: {
    margin: theme.spacing.unit * 2,
    marginLeft: '0.65em',
    color: '#cd4436',
    fontSize: '1.2em',
  },
  icon: {
    fontSize: '1em',
    width: '100%',
    color: 'white',
  },
  appBar: {
    position: 'static',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  appBarShift: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
    },
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
  },
  menuIcon: {
    width: 'unset',
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'content-left': {
    // marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: drawerWidth,
  },
  iconStyle: {
    fontSize: '2.5rem',
  },
  title: {
    fontSize: '1.3em',
    fontWeight: 'bold',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.2em',
    },
    textDecoration: 'none',
  },
  noWrap:{
    whiteSpace: 'nowrap',
  }
});

export const Header = ({
  classes,
  logout,
  user,
  tenant,
  userMenuAnchor,
  openUserMenu,
  closeUserMenu,
  closeDrawer,
  openDrawer,
  isDrawerOpen,
  routes,
  openNotification,
  isNotificationOpen,
  closeNotification,
  notifications,
  filtredNotification,
}) => {
  const entries = [
    { id:1, name: 'resumes', icon: <Icon className="far fa-file-pdf" />, path: routes.getPathByName('resumes') },
    { id:2, name: 'people', icon: <Group />, path: routes.getPathByName('people') },
    { id:3, name: 'jobs', icon: <Work />, path: routes.getPathByName('jobs') },
    { id:4, name: 'skills', icon: <Icon className="fas fa-medal" />, path: routes.getPathByName('skills') },
    { id:5, name: 'agenda', icon: <Icon className="far fa-calendar-alt" />, path: routes.getPathByName('agenda') },
    { id:6, name: 'statistics', icon: <Icon className="fas fa-chart-bar" />, path: routes.getPathByName('statistics') },

  ];
  const MenuListItems = (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <Icon className={classNames(classes.logo, 'fas fa-users')} />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <List>
        {entries.map((entry) => (
          <ListItem key={entry.id} button component={Link} to={entry.path}>
            <ListItemIcon className={classes.iconStyle}>{entry.icon}</ListItemIcon>
            <ListItemText primary={<FormattedMessage {...prop(entry.name, messages) }/>} className={classes.noWrap}/>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const drawer = (
    <Drawer
      variant="temporary"
      anchor="left"
      open={isDrawerOpen}
      onClose={closeDrawer}
      classes={{ paper: classes.drawerPaper }}
    >
      <div tabIndex={0} role="button" onClick={closeDrawer} onKeyDown={closeDrawer} className={classes.drawerHeader}>
        <Divider />
        {MenuListItems}
      </div>
    </Drawer>
  );
  const isUserMenuOpen = Boolean(userMenuAnchor);
  return (
    <div className={classes.XappFrame}>
      <AppBar
        className={classNames(classes.appBar, {
          [classes.appBarShift]: isDrawerOpen,
        })}
      >
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Grid container justify="center" alignItems="center">
                <Grid item>
                  {isAdmin(user) && (
                    <IconButton color="inherit" aria-label="Open drawer" onClick={openDrawer}>
                      <MenuIcon />
                    </IconButton>
                  )}
                  <Hidden xsDown>
                    <IconButton component={Link} to={routes.getPathByName('resumes')} variant="flat">
                      <Icon className={classNames(classes.icon, 'fas fa-users')} />
                    </IconButton>
                  </Hidden>
                </Grid>
                <Grid item>
                  <Hidden xsDown>
                    <Typography className={classes.title} color="inherit" noWrap>
                      <FormattedMessage {...messages.title } values={{tenant}} />
                    </Typography>
                  </Hidden>
                  <Hidden smUp>
                    <Typography
                      className={classes.title}
                      component={Link}
                      to={routes.getPathByName('resumes')}
                      color="inherit"
                      noWrap
                    >
                      <FormattedMessage {...messages.phoneTitle} />
                    </Typography>
                  </Hidden>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              {user && (
                <React.Fragment>
                  <IconButton
                    aria-owns={isNotificationOpen ? 'menu-list-grow' : null}
                    aria-haspopup="true"
                    onClick={openNotification}
                    color="inherit"
                    className={classes.menuIcon}
                    disabled={!notifications.length}
                  >
                    {!filtredNotification.length ? (
                      <Icon className={classNames(classes.icon, 'fas fa-bell')} />
                    ) : (
                        <Badge badgeContent={filtredNotification.length} color="secondary">
                          <Icon className={classNames(classes.icon, 'fas fa-bell')} />
                        </Badge>
                      )}
                  </IconButton>
                  <Drawer
                    className={classes.popover}
                    onClose={closeNotification}
                    open={isNotificationOpen}
                    anchor="right"
                  >
                    <Notifications notifications={notifications} onClose={closeNotification} />
                  </Drawer>

                  <IconButton
                    aria-owns={isUserMenuOpen ? 'menu-appbar' : null}
                    aria-haspopup="true"
                    onClick={openUserMenu}
                    color="inherit"
                    className={classes.menuIcon}
                  >
                    <UserAvatar user={user} size={MEDIUM} showTooltip />
                  </IconButton>
                  <Popover
                    id="menu-appbar"
                    anchorEl={userMenuAnchor}
                    open={isUserMenuOpen}
                    onClose={closeUserMenu}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <UserCard user={user} handleClose={closeUserMenu} logout={logout} />
                  </Popover>
                </React.Fragment>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {drawer}
    </div>
  );
};
Header.propTypes = {
  classes: PropTypes.object.isRequired,
  logout: PropTypes.func,
  user: PropTypes.object,
  tenant: PropTypes.string.isRequired,
  userMenuAnchor: PropTypes.object,
  openUserMenu: PropTypes.func.isRequired,
  closeUserMenu: PropTypes.func.isRequired,
  openDrawer: PropTypes.func.isRequired,
  openNotification: PropTypes.func.isRequired,
  closeNotification: PropTypes.func.isRequired,
  closeDrawer: PropTypes.func.isRequired,
  isDrawerOpen: PropTypes.bool.isRequired,
  routes: PropTypes.object.isRequired,
  isNotificationOpen: PropTypes.bool.isRequired,
  filtredNotification: PropTypes.array.isRequired,
  notifications: PropTypes.array,
};

const mapStateToProps = () =>
  createStructuredSelector({
    notifications: getNotifications,
    filtredNotification: getFiltredNotifications,
  });

const withMenu = withState('userMenuAnchor', 'toggleMenu', null);
const withMenuHandlers = withHandlers({
  openUserMenu: ({ toggleMenu }) => event => toggleMenu(event.currentTarget),
  closeUserMenu: ({ toggleMenu }) => () => toggleMenu(null),
});

const withDrawer = withState('isDrawerOpen', 'toggleDrawer', false);
const withDrawerHandlers = withHandlers({
  openDrawer: ({ toggleDrawer }) => () => toggleDrawer(true),
  closeDrawer: ({ toggleDrawer }) => () => toggleDrawer(false),
});

const withNotification = withState('isNotificationOpen', 'notificationMenu', false);
const withNotificationsHandlers = withHandlers({
  openNotification: ({ notificationMenu }) => () => notificationMenu(true),
  closeNotification: ({ notificationMenu }) => () => notificationMenu(false),
});

export const enhance = compose(
  withStyles(styles),
  withRouter,
  withRoutes,
  connect(
    mapStateToProps,
    null,
  ),
  withNotification,
  withDrawer,
  withMenu,
  withMenuHandlers,
  withNotificationsHandlers,
  withDrawerHandlers,
);
export default enhance(Header);
