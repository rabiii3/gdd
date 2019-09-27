import React from 'react';
import { compose, map } from 'ramda';
import PropTypes from 'prop-types';
import { FormattedDate, FormattedTime } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Call from '@material-ui/icons/Call';
import Forward from '@material-ui/icons/Forward';
import Face from '@material-ui/icons/Face';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import { UserAvatar, SMALL, XSMALL } from '../../widgets/Avatar';
import { fullname } from '../../../lib/models/people';
import withRoutes from '../../hoc/routes';
import { isTodoCall, isTodoForward, isTodoMeet } from '../../../lib/models/todo';
import { Spacer } from '../../widgets/Spacer';
import { withoutHtmlTags } from '../../../lib/models/comments';

const style = theme => ({
    row: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.background.default
        }
    },
    tableCellule: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        textDecoration: 'none',
        width: 100,
        [theme.breakpoints.down('xs')]: {
            width: 40,
        },
    },
    grey: {
        color: '#73757a',
    },
    darkGrey: { color: '#3c4043' },

});

const View = ({ classes, routes, todo, people, candidate }) => {
    const day = <FormattedDate value={todo.when} day='numeric' />;
    const month = <FormattedDate value={todo.when} month='long' />;
    const weekday = <FormattedDate value={todo.when} weekday='long' />;
    const time = <FormattedTime value={todo.when} />
    return (
        <TableRow className={classes.row} >
            <TableCell >
                {todo.when && (
                    <Grid container direction="row" alignItems="center" justify="space-around" >
                        <Grid item >
                            <Typography variant="h6" className={classes.darkGrey}>
                                {day}
                            </Typography>
                        </Grid>
                        <Spacer size={SMALL} />
                        <Grid item>
                            <Grid container direction="row" alignItems="center">
                                <Grid item>
                                    <Typography variant="caption" className={classes.grey}>
                                        {month}{","}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="caption" className={classes.grey}>
                                        {weekday}
                                    </Typography>
                                </Grid>
                                <Spacer size="SMALL" />
                                <Grid item >
                                    <Typography variant="caption" className={classes.grey}>
                                        {time}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </TableCell>
            <TableCell>
                {todo && todo.what &&
                    <Grid container direction="row" justify="flex-start" alignItems="center">
                        <Grid item>
                            {isTodoCall(todo) && <Call color="action" className={classes.iconFontSize} />}
                            {isTodoForward(todo) && <Forward color="action" className={classes.iconFontSize} />}
                            {isTodoMeet(todo) && <Face color="action" className={classes.iconFontSize} />}
                        </Grid>

                        {todo.who && (
                            <Grid item>
                                <Grid container >
                                    {map(user =>
                                        <UserAvatar
                                            key={people[user]._id}
                                            user={people[user]}
                                            size={XSMALL}

                                        />
                                    )(todo.who)}
                                </Grid>
                            </Grid>
                        )}
                        <Grid item >
                            <Typography variant="caption" className={classes.tableCellule} >
                                {withoutHtmlTags(todo.content)}
                            </Typography>

                        </Grid>
                    </Grid>}
            </TableCell>

            <TableCell >
                <Grid container direction="row" justify="flex-start" alignItems="center" >
                    <Grid item>
                        <UserAvatar user={candidate}
                            to={routes.getPathByName('editResume', candidate._id)}
                        />
                    </Grid>
                    <Spacer size={SMALL} />
                    <Grid item>
                        <Typography variant="caption" className={classes.tableCellule}>
                            {fullname(candidate)}
                        </Typography>
                    </Grid>
                </Grid>
            </TableCell>
        </TableRow>
    );
};

View.propTypes = {
    classes: PropTypes.object,
    todo: PropTypes.object,
    people: PropTypes.object,
    candidate: PropTypes.object,
    routes: PropTypes.object.isRequired,

};

export const enhance = compose(
    withStyles(style),
    withRoutes,

);

export default enhance(View);
