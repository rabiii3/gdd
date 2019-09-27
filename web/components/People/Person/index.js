import React from 'react';
import { compose, sum, equals } from 'ramda';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { withState, withHandlers } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Hidden from '@material-ui/core/Hidden';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import messages from '../../App/messages'
import { UserAvatar, LARGE } from '../../../widgets/Avatar';
import { fullname, rolesHaveLabel, statusColor, statusLabel, isAdmin } from '../../../../lib/models/people';
import withRoutes from '../../../hoc/routes';
import { RoleChip } from '../../../widgets';
import { getResumesCountByPersonId, getCountAwardAmountByPersonId } from '../../../selectors/resumes';

const styles = theme => ({
  container: {
    display: 'flex',
  },
  card: {
    width: 400,
    margin: theme.spacing.unit,
  },
  status: {
    fontWeight: 600,
    fontSize: '1rem',
  },
  badge: {
    left: '2.5rem',
    top: '0.3rem',
  },
  subheader: {
    color: ' rgba(0, 0, 0, 0.54)',
    fontWeight: 500,
  },
  cardHeader: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textDecoration: 'none',
    width: 220,
  },
  popover: {
    minWidth: '6rem',
  },
});
export const Component = ({ classes, people, actions, routes, resumesCount, setShowPopover, setClosePopover, boolMenuIcon, userLogged,
  confrmedStatusCount }) => (
    <Grid item className={classes.container}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Grid container direction="column">
              <UserAvatar
                to={routes.getPathByName('person', people._id)}
                user={people}
                size={LARGE}
                className={classes.avatar}
              />
              <Grid container justify="center">
                <Typography className={classes.status} style={{ color: statusColor(people) }}>
                  {statusLabel(people)}
                </Typography>
              </Grid>
            </Grid>
          }
          title={<Typography className={classes.cardHeader}>{fullname(people)}</Typography>}
          action={
            <Hidden xsUp={!isAdmin(userLogged)}>
              <IconButton
                onClick={setShowPopover}
              >
                <MoreVertIcon />
              </IconButton>
              <Popover
                anchorEl={boolMenuIcon}
                open={Boolean(boolMenuIcon)}
                onClose={setClosePopover}
                anchorOrigin={{
                  vertical: 'center',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={() => { setClosePopover(); actions.deletePerson(people) }} className={classes.popover}>
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  <ListItemText
                    classes={{ primary: classes.primary }}
                    variant="inset"
                    primary={<FormattedMessage {...messages.delete} />}
                  />
                </MenuItem>
              </Popover>
            </Hidden>
          }
          subheader={
            <Typography className={classNames(classes.subheader, classes.cardHeader)}>
              {people.email}
              <br />
              {people.phoneNumber}
              {confrmedStatusCount && !equals(confrmedStatusCount.length, 0) && <FormattedNumber
                value={sum(confrmedStatusCount)}
                currency="EUR"
                minimumFractionDigits={0} />
              }
            </Typography>
          }
        />
        <CardContent>
          <Grid item xs={12}>
            <Grid container justify="center">
              <Grid item xs={4}>
                <Tooltip title="Number of Resumes" placement="left">
                  <Badge className={classes.badge} badgeContent={resumesCount} color="primary">
                    <div />
                  </Badge>
                </Tooltip>
              </Grid>
              <Grid item xs={8}>
                <RoleChip
                  size="MEDIUM"
                  data={rolesHaveLabel(people.roles)}
                  action={actions.addQueryPeople()}
                />
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );

Component.propTypes = {
  actions: PropTypes.object,
  setShowPopover: PropTypes.func,
  setClosePopover: PropTypes.func,
  boolMenuIcon: PropTypes.object,
  classes: PropTypes.object,
  people: PropTypes.object,
  routes: PropTypes.object,
  resumesCount: PropTypes.number,
  confrmedStatusCount: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number
  ]),
  userLogged: PropTypes.object,
};
const mapStateToProps = (state, ownProps) =>
  createStructuredSelector({
    resumesCount: getResumesCountByPersonId(ownProps.people._id),
    confrmedStatusCount: getCountAwardAmountByPersonId(ownProps.people._id)
  });

const withOpen = withState('boolMenuIcon', 'handlePopover', null);
const withOpenHandlers = withHandlers({
  setShowPopover: ({ handlePopover }) => event => handlePopover(event.currentTarget),
  setClosePopover: ({ handlePopover }) => () => handlePopover(null),
});

export const enhance = compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    null,
  ),
  withOpen,
  withOpenHandlers,
  withRoutes,
);
export default enhance(Component);
