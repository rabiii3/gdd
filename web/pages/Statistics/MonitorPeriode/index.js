import PropTypes from 'prop-types';
import { map } from 'ramda';
import React from 'react';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import messages from './messages';
import { SMALL } from '../../../widgets/Spacer';
import { UserAvatar } from '../../../widgets/Avatar/index';


export const MonitorPeriode = ({ people, classes, activeKoopter, productiveKoopter, routes }) => {
  return (
    <Grid container justify="center">
      <Grid item xs={12} >
        <Grid container direction="row" alignItems="center" justify="center" className={classes.paddingTop} >
          <Grid item xs={3}>
            <Icon className={classNames(classes.iconTrophy, 'fas fa-trophy')} />
          </Grid >
          <Grid item xs={9}>
            <Typography variant="body2"><FormattedMessage {...messages.productiveKoopter} /></Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {productiveKoopter.length ? map(koopter => 
        <Grid key={koopter.profile} container direction="row" alignItems="center" justify="space-around" className={classes.marginBottom}>
          <Grid item xs={4}>
            <UserAvatar
              user={koopter && koopter.profile && people && people[koopter.profile]}
              size={SMALL}
              to={people[koopter.profile] && routes.getPathByName('person', people[koopter.profile]._id)}
            />
          </Grid >
          <Grid item xs={6}>
            <Typography variant="caption">{koopter && koopter.id}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1">{koopter && koopter.value}</Typography>
          </Grid>
        </Grid>)(productiveKoopter)
          :
          <Grid container direction="row" alignItems="center" justify="space-around" >
            <Typography variant="caption" className={classes.grey}><FormattedMessage {...messages.noProductivity} /></Typography>
          </Grid>
        }
      </Grid>
      <Grid item xs={12}>
        <Grid container direction="row" alignItems="center" justify="center" className={classes.paddingTop}>
          <Grid item xs={3}>
            <Icon className={classNames(classes.iconTrophy, 'fas fa-award')} />
          </Grid >
          <Grid item xs={9}>
            <Typography variant="body2"><FormattedMessage {...messages.activeKoopter} /></Typography>
          </Grid>
        </Grid>
      </Grid>
      <br /><br /><br />
      <Grid item xs={12}>
        {activeKoopter.length ? map(koopter => 
        <Grid key={koopter.profile} container direction="row" alignItems="center" justify="space-around" className={classes.marginBottom} >
          <Grid item xs={4}>
            <UserAvatar
              user={koopter && people && people[koopter.profile]}
              size={SMALL}
              to={people[koopter.profile] && routes.getPathByName('person', people[koopter.profile]._id)}
            />
          </Grid >
          <Grid item xs={6}>
            <Typography variant="caption">{koopter && koopter.id}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1">{koopter && koopter.value}</Typography>
          </Grid>
        </Grid>
        )(activeKoopter)
          :
          <Grid container direction="row" alignItems="center" justify="space-around" >
            <Typography variant="caption" className={classes.grey}><FormattedMessage {...messages.noCooptation} /></Typography>
          </Grid>}
      </Grid>
    </Grid>

  );
};

MonitorPeriode.propTypes = {
  classes: PropTypes.object,
  activeKoopter: PropTypes.array,
  routes: PropTypes.object,
  productiveKoopter: PropTypes.array,
  people: PropTypes.object,
};

export default MonitorPeriode;
