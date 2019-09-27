import React from 'react';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { FormattedMessage } from 'react-intl';
import messages from '../components/App/messages';

const Styles = theme => ({
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  primary: {},
});

const MenuUserList = ({ classes, actions, person }) => (
  <Paper>
    <MenuList>
      <MenuItem className={classes.menuItem}>
        <ListItemIcon onClick={() => actions.deletePerson(person)}  >
          <DeleteIcon />
          <ListItemText
            primary={<FormattedMessage {...messages.delete} />}
          />
        </ListItemIcon>

      </MenuItem>
    </MenuList>
  </Paper>
);

MenuUserList.propTypes = {
  classes: PropTypes.object.isRequired,
  actions: PropTypes.object,
  person: PropTypes.object,
};

const enhance = compose(withStyles(Styles));
export default enhance(MenuUserList);
