import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = () => ({
  root: {
    fontSize: '1.3em',
    width: 'unset',
    color: 'grey',
  },
});

const ResumeIcon = ({ classes }) => <Icon className={classNames(classes.root, `fa fa-address-card`)} />;
ResumeIcon.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const enhance = withStyles(styles);
export default enhance(ResumeIcon);
