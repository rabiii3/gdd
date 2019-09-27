import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router'
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Header, HeaderLeft, HeaderRight } from '../../components/Header';
import { ArrowBack, Spacer, Container } from '../../widgets';
import Title from '../../widgets/Title';
import SaveResume from '../../components/SaveResume';
import messages from './messages';
import * as resumesActions from '../../actions/resumes';
import { getUser } from '../../selectors/auth';
import { getFile } from '../../selectors/router';
import withRoutes from '../../hoc/routes';


const style = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    backgroundColor: 'rgba(0,0,0,0)',
    height: '100%',
  },
  root: {
    height: '100%',
    backgroundImage: 'url(//www.gstatic.com/pantheon/images/marketplace/cameo_banner-1x.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% auto',
  },
});

export const Page = ({ file, classes, actions, intl, user }) => {
 
  return (
    <Container className={classes.root}>
      <Header>
        <HeaderLeft>
          <ArrowBack />
          <Spacer size="SMALL" />
          <Title text={intl.formatMessage(messages.title)} />
        </HeaderLeft>
        <HeaderRight />
      </Header>
      <Paper className={classes.paper} elevation={2}>
        <SaveResume resume={{ file }} isEditable user={user} actions={actions} />
      </Paper>
    </Container>
  );
};

Page.propTypes = {
  classes: PropTypes.object,
  actions: PropTypes.object,
  file: PropTypes.object,
  intl: intlShape,
  user: PropTypes.object,
};

const actions = {
  addResume: resumesActions.add,
  goHome: push
};
const mapStateToProps = () =>
  createStructuredSelector({
    user: getUser,
    file: getFile,
  });

const mapDispatchToProps = (dispatch, { routes }) => ({
  actions: bindActionCreators({ ...actions, goHome: () => push(routes.getDefaultRoute().path) }, dispatch),
});

export const enhance = compose(
  withStyles(style),
  withRoutes,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  injectIntl,
);

export default enhance(Page);
