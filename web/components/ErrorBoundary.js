import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bomb: {
    fontSize: '2em',
  },
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error(error, info); // eslint-disable-line no-console
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={this.props.classes.container}>
          <Typography variant="display1" gutterBottom>
            <Icon className={classNames(`fas fa-bomb`, this.props.classes.bomb)} />
            Something went wrong
          </Typography>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
};

export default withStyles(styles)(ErrorBoundary);
