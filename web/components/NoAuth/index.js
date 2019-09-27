import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { getToken } from '../../selectors/auth';

const NoAuth = ({ token, goHome, children }) => {
  if (token) {
    goHome();
    return false;
  }
  return children;
};

NoAuth.propTypes = {
  token: PropTypes.string,
  children: PropTypes.node.isRequired,
  goHome: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({ token: getToken });

const mapDispatchToProps = dispatch => ({
  goHome: () => dispatch(push('/')),
});

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
);

export default enhance(NoAuth);
