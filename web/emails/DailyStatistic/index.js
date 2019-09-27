
import React from 'react';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Typography from '@material-ui/core/Typography';
import messages from './message';
import { fullname } from '../../models/users';
import Table from '@material-ui/core/Table/Table';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableBody from '@material-ui/core/TableBody/TableBody';
import { getSkillsLabels } from '../../../lib/models/skills';

export const DailyStatistic = ({ resumeByDate, people, allSkills, resume }) => {
    return (<div>
        <Grid container>
            <Grid item xs={3}>
                <Typography variant="h6" color="textPrimary">
                    <FormattedMessage {...messages.hello} />
                </Typography>
            </Grid>
        </Grid>
        <p />
        <Typography align="left" variant="body1" color="textPrimary">
            <FormattedMessage {...messages.latestResume} />
        </Typography>
        <p />
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell ><FormattedMessage {...messages.name} /></TableCell>
                    <TableCell ><FormattedMessage {...messages.skills} /></TableCell>
                    <TableCell ><FormattedMessage {...messages.author} /></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {resumeByDate && resumeByDate.length > 0 && resumeByDate.map(resume => {
                    const skills = allSkills && getSkillsLabels(allSkills, resume);
                    const author = resume && people && people[resume.createdBy]
                    return (
                        <TableRow key={resume._id} >
                            <TableCell >
                                {resume && fullname(resume)}
                            </TableCell>
                            <TableCell >
                                {skills && skills.map(skill => skill.label + '   ')}
                            </TableCell>
                            <TableCell >
                                {author && fullname(author)}
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
        <p />
        <Typography align="left" variant="body1" color="textPrimary">
            <FormattedMessage {...messages.findResumes} />
            <a href={`http://koopt.harington.fr/resumes`}>
                {`http://koopt.harington.fr/resumes`}
            </a>
        </Typography>
        <p />
    </div>
    )
};

DailyStatistic.propTypes = {
    resumeByDate: PropTypes.array,
    allSkills: PropTypes.object,
    people: PropTypes.object,
};

export default DailyStatistic;
