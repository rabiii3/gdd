import React from 'react';
import { contains, compose } from 'ramda';
import Popover from '@material-ui/core/Popover';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Typography from '@material-ui/core/Typography';
import messages from './messages';

const styles = theme => ({
  badge: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit * 3,
  },
  menuItem: {
    textTransform: 'capitalize',
  },
});
const FilterMenu = ({ closeMenu, isOpen, data, action, statusFilter, allResumes, classes }) => (
  <Popover
    anchorEl={isOpen}
    open={Boolean(isOpen)}
    onClose={closeMenu}
    anchorOrigin={{
      vertical: 'center',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
  >
    <MenuItem onClick={() => action('')}>
      <Badge className={classes.badge} badgeContent={allResumes} color="secondary">
        {' '}
        <div />
      </Badge>
      <Typography className={classes.menuItem}>
        <FormattedMessage {...messages.all} />
      </Typography>
    </MenuItem>
    {data &&
      data.map(element => (
        <MenuItem key={element} onClick={() => action(element[0])} selected={contains(element[0], statusFilter)}>
          <Badge className={classes.badge} badgeContent={element.length} color="secondary">
            {' '}
            <div />
          </Badge>
          <Typography className={classes.menuItem}>{element[0]}</Typography>
        </MenuItem>
      ))}
  </Popover>
);
FilterMenu.propTypes = {
  classes: PropTypes.object,
  closeMenu: PropTypes.func,
  isOpen: PropTypes.object,
  data: PropTypes.array,
  action: PropTypes.func,
  statusFilter: PropTypes.string,
  allResumes: PropTypes.number,
};

export const enhance = compose(withStyles(styles));
export default enhance(FilterMenu);
