import React from 'react';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import { map, compose } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import withRoutes from '../hoc/routes';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    minWidth: 330,
  },
  chip: {
    margin: theme.spacing.unit / 2,
    flexGrow: 0,
  },
});
const SkillsChip = ({ skills, classes, action, isClickable }) => {

  return skills.length ? (
    <Grid container direction="row" justify="center" alignItems="center">
      {map(skill => (
        <Grid key={skill._id} item xs className={classes.chip}>
          {isClickable ? (
            <Chip
              onClick={() => {
                action(skill.label);
              }}
              label={skill.label}
              color="primary"
              variant="outlined"
            />
          ) : (
              <Chip label={skill.label} color="primary" variant="outlined" />
            )}
        </Grid>
      ))(skills)}
    </Grid>
  ) : null;
};

SkillsChip.propTypes = {
  skills: PropTypes.array,
  classes: PropTypes.object,
  action: PropTypes.func,
  isClickable: PropTypes.bool,
};
export const enhance = compose(
  withStyles(styles),
  withRoutes,
);
export default enhance(SkillsChip);
