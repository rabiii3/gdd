import React from 'react';
import { compose } from 'ramda';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { withState, withHandlers } from 'recompose';
import { format } from 'date-fns';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import Chip from '@material-ui/core/Chip/Chip';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import IconButton from '@material-ui/core/IconButton';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { StarRating } from '../../widgets/StarRating'
import { UserAvatar, SMALL } from '../../widgets/Avatar';
import { fullname } from '../../../lib/models/people';
import { MailTo, TelTo } from '../../widgets';
import withRoutes from '../../hoc/routes';
import { getSkillsLabels } from '../../../lib/models/skills';
import LoadResume from '../../widgets/LoadResume';
import { statusLabel } from '../../../lib/models/resumes';
import SkillsChip from '../../widgets/SkillsChip';
import messages from './messages';
import { TAGS } from '../../utils/tags';
import Todo from '../../pages/UpdateResume/Todo';

const style = theme => ({
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  },
  tableEllipsisCellule: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    // textOverflow: 'ellipsis',
    // textDecoration: 'none',
  },
  tableLargeCellule: {
  },
  tableDefaultCellule: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textDecoration: 'none',
  },
  tableSmallCellule: {
  },
});

const View = ({ routes, classes, resume, author, actions, closeResumeDialog, openResumeDialog,
  isDialogOpened, skills, showMoreSkills, openMoreSkills, closeMoreSkills, fileUrl, people, lastTodo, ratingValue }) => {
  const SKILLS = getSkillsLabels(skills, resume);
  return (
    <TableRow className={classes.row} >
      <TableCell padding="checkbox">
        <Tooltip
          title={fullname(resume)}
        >
          <Grid item>
            <UserAvatar
              to={routes.getPathByName('editResume', resume._id)}
              user={resume}
              size={SMALL}
            />
          </Grid>
        </Tooltip> 
      </TableCell>

      <TableCell >
        <Typography className={classes.tableEllipsisCellule}> {fullname(resume)}</Typography>
      </TableCell>
      <TableCell> <Typography className={classes.tableDefaultCellule} ><TelTo person={resume} action={actions.addQueryResumes(TAGS.country)} /> </Typography></TableCell>
      <TableCell> <Typography className={classes.tableDefaultCellule}><MailTo person={resume} /></Typography></TableCell>
      <TableCell>
        <Grid container className={classes.tableLargeCellule} >
          {!showMoreSkills ?
            <React.Fragment >
              <Grid container direction="row" justify="flex-start" alignItems="center">
                <Grid item xs={SKILLS[2] ? 8 : 12}>
                  {SKILLS[0] && <Chip
                    onClick={() => { actions.addQueryResumes(TAGS.skill)(SKILLS[0].label) }}
                    label={SKILLS[0] && SKILLS[0].label}
                    color="primary"
                    variant="outlined"
                  />}
                  {SKILLS[1] && <Chip
                    onClick={() => { actions.addQueryResumes(TAGS.skill)(SKILLS[1].label) }}
                    label={SKILLS[1] && SKILLS[1].label}
                    color="primary"
                    variant="outlined"
                  />}
                </Grid>
                <Grid item xs={4}>
                  {SKILLS[2] &&
                    <Tooltip
                      title={<FormattedMessage {...messages.showMore} />}
                    >
                      <IconButton onClick={openMoreSkills}>
                        <ExpandMoreIcon />
                      </IconButton>
                    </Tooltip>
                  }
                </Grid>
              </Grid>
            </React.Fragment>
            :
            <React.Fragment >
              <Grid container direction="row" justify="flex-start" alignItems="center">
                <Grid item xs={8}>
                  <SkillsChip
                    skills={getSkillsLabels(skills, resume)}
                    action={actions.addQueryResumes}
                  />
                </Grid>
                <Grid item xs={4}>
                  {SKILLS[2] &&
                    <Tooltip
                      title={<FormattedMessage {...messages.showLess} />}
                    >
                      <IconButton onClick={closeMoreSkills}>
                        <ExpandLessIcon />
                      </IconButton>
                    </Tooltip>
                  }
                </Grid>
              </Grid>
            </React.Fragment>
          }
        </Grid>
      </TableCell>
      <TableCell >
        <Typography className={classes.tableSmallCellule}>{statusLabel(resume)}</Typography>
      </TableCell>
      <TableCell padding="none">
          <StarRating value={ratingValue} />
      </TableCell>
      <TableCell >
        <Todo todo comment={lastTodo} people={people} isShownInComment={false} isResumePage={false}/>
      </TableCell>
      <TableCell > <Typography className={classes.tableDefaultCellule}> {format(new Date(resume.createdAt), 'yyyy-MM-dd')}</Typography> </TableCell>
      <TableCell > <Typography className={classes.tableDefaultCellule}> {fullname(author)}</Typography> </TableCell>
      <TableCell >
        {resume.award && <FormattedNumber
          value={resume.award}
          currency="EUR"
          minimumFractionDigits={0} />
        }
      </TableCell>
      <TableCell padding="checkbox">
        <Tooltip title={`Voir ${fullname(resume)}.pdf`}>
          <IconButton onClick={openResumeDialog} aria-label="Resume.pdf">
            <RemoveRedEye />
          </IconButton>
        </Tooltip>
        <LoadResume
          open={isDialogOpened}
          close={closeResumeDialog}
          download={() => actions.loadFile(resume)}
          file={fileUrl}
        />
      </TableCell>
    </TableRow>
  );
};

View.propTypes = {
  classes: PropTypes.object,
  resume: PropTypes.object,
  author: PropTypes.object,
  routes: PropTypes.object.isRequired,
  actions: PropTypes.object,
  skills: PropTypes.object,
  openResumeDialog: PropTypes.func,
  closeResumeDialog: PropTypes.func,
  isDialogOpened: PropTypes.bool,
  fileUrl: PropTypes.object,
  showMoreSkills: PropTypes.bool,
  openMoreSkills: PropTypes.func,
  closeMoreSkills: PropTypes.func,
  lastTodo: PropTypes.object,
  people: PropTypes.object,
  ratingValue: PropTypes.number,
};

const withDialog = withState('isDialogOpened', 'toggleDialog', false);
const withDialogHandlers = withHandlers({
  openResumeDialog: ({ toggleDialog }) => () => toggleDialog(true),
  closeResumeDialog: ({ toggleDialog }) => () => toggleDialog(false),
});


const withMoreSkills = withState('showMoreSkills', 'toggleSkills', false);
const withMoreSkillsHandlers = withHandlers({
  openMoreSkills: ({ toggleSkills }) => () => toggleSkills(true),
  closeMoreSkills: ({ toggleSkills }) => () => toggleSkills(false),
});

export const enhance = compose(
  withStyles(style),
  withMoreSkills,
  withMoreSkillsHandlers,
  withDialog,
  withDialogHandlers,
  withRoutes,
);

export default enhance(View);
