import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedRelative } from 'react-intl';
import classNames from 'classnames';
import { prop, propEq, compose, map, isNil } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Call from '@material-ui/icons/Call';
import Forward from '@material-ui/icons/Forward';
import Face from '@material-ui/icons/Face';
import { Spacer, UserName } from '../../widgets';
import { UserAvatar } from '../../widgets/Avatar';
import { SMALL } from '../../widgets/ResumeStatus';
import messages from './messages';
import withRoutes from '../../hoc/routes';
import { eventToLabel } from '../../../lib/models/comments';
import { isTodoCall, isTodoForward, isTodoMeet } from '../../../lib/models/todo';


const style = theme => ({
  grey: {
    color: 'grey',
  },
  comment: {
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 1,
    paddingLeft: theme.spacing.unit * 1,
    display: 'flex',
    flexDirection: 'column',
  },
  small: {
    fontSize: 'small',
  },
  smaller: {
    fontSize: 'x-small',
  },
  bold: {
    fontWeight: 'bold',
  },content: { 
    marginTop: '-8px', 
    marginBottom: '-20px', 
    fontWeight: '300',
    margin: theme.spacing.unit,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  iconFontSize: { 
    fontSize: 22 
  },
});

export const Todo = ({ classes, todo, comment, people, routes, isShownInComment, isResumePage }) => (
  
  todo ? 
  (
    <Grid item>
      { comment && ( isShownInComment  ||  ((new Date(prop('when',comment)) >= Date.now()) || isNil(prop('when', comment))) ) &&(
        <Grid container direction={propEq('forward','what',comment) ? 'row-reverse' : 'row'} justify="center" alignItems="center" spacing={1} wrap="nowrap">
          <Grid item>
            <Grid container direction="row">
              { !(prop('who', comment)) ?
                ( (!isResumePage && prop('what',comment)) &&
                  (
                    <Grid item key={prop('createdBy',comment)} className={classes.margin}>
                      <UserAvatar
                        classes={classes.avatar}
                        user={people[prop('createdBy',comment)]}
                        size="XSMALL"
                      />
                    </Grid>
                  )
                )
                :
                (
                  map(user => 
                  <Grid item key={user} className={classes.margin}>
                    <UserAvatar
                      classes={classes.avatar}
                      user={people[user]}
                      size="XSMALL"
                    />
                  </Grid>)(prop('who',comment))
                )
              }   
            </Grid>
          </Grid>
          <Grid item>
            {isTodoCall(comment) && <Call color="action" className={classes.iconFontSize} />}
            {isTodoForward(comment) && <Forward color="action" className={classes.iconFontSize} />}
            {isTodoMeet(comment) && <Face color="action" className={classes.iconFontSize} />}
          </Grid>
          <Grid item>
            <Typography className={classNames(classes.grey, classes.when, classes.smaller)} variant="caption" noWrap>
              {prop('when',comment) ? <FormattedRelative value={prop('when', comment)} /> : ''}
            </Typography>
          </Grid>       
        </Grid>
        )
      }
    </Grid>
  )
  :
  (
    <Grid container direction="column"> 
      {(comment && !isShownInComment) && (
      <Grid item container alignItems="center">
        <Grid item>
          <UserAvatar
            classes={classes.avatar}
            user={people[prop('createdBy',comment)]}
            size={SMALL}
            to={people[prop('createdBy',comment)] && routes.getPathByName('person',prop('_id', people[prop('createdBy',comment)]))}
          />
        </Grid>
        <Grid item xs className={classNames(classes.margin, classes.comment)}>
          <Grid container direction="row" justify="flex-start" alignItems="center">
            <Typography
              className={classNames(classes.grey, classes.small)}
              variant="subtitle1"
            >
              {eventToLabel(prop('event',comment))}
              {(prop('event', comment)) && <FormattedMessage {...messages.by} />}
            </Typography>
            <Spacer size={SMALL} />
              <Grid className={classNames(classes.grey, classes.small, classes.bold)}>
                <UserName user={people[prop('createdBy',comment)]} />   
              </Grid>
            <Spacer size={SMALL} />
            <Typography className={classNames(classes.grey, classes.smaller)} variant="caption" align="right">
              <FormattedRelative value={prop('createdAt',comment)} />
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.content} dangerouslySetInnerHTML={{ __html: comment.content }} />
          </Grid>
        </Grid>
      </Grid>
      )}
    </Grid>
  )
);

Todo.propTypes = {
  classes: PropTypes.object,
  todo: PropTypes.bool,
  comment: PropTypes.object,
  routes: PropTypes.object,
  people: PropTypes.object,
  isShownInComment: PropTypes.bool,
  isResumePage: PropTypes.bool,
}

const enhance = compose(
  withStyles(style),
  withRoutes,
);

export default enhance(Todo);
