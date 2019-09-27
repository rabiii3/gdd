import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import { compose } from 'ramda';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withStateHandlers, lifecycle } from 'recompose';
import { bindActionCreators } from 'redux';
import { isAdmin, isLoggedPerson } from '../../../lib/models/people';
import * as peopleActions from '../../actions/people';
import * as resumesActions from '../../actions/resumes';
import { Header, HeaderLeft, HeaderRight } from '../../components/Header';
import PersonDetails from '../../components/Person';
import withRoutes from '../../hoc/routes';
import { getUser } from '../../selectors/auth';
import { getPeople } from '../../selectors/people';
import { getResumesByPersonId } from '../../selectors/resumes';
import { ArrowBack, Container, Content, Menu, MenuUserList, Spacer, UserName } from '../../widgets';
import { UserAvatar } from '../../widgets/Avatar';
import { SMALL } from '../../widgets/ChipStatus';
import { MEDIUM } from '../../widgets/Spacer';

const styles = {
  root: {
    height: '100vh',
    backgroundImage: 'url(//www.gstatic.com/pantheon/images/marketplace/storefront_header_bg_v6.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
  },
};

export const Page = ({
  people,
  resumes,
  match: {
    params: { id },
  },
  routes,
  classes,
  disableEditMode,
  isFormDisabled,
  actions,
  userLogged,
}) => {
  const person = people[id];
  if (!person) return <Redirect to={routes.getDefaultRoute().path} />;
  return (
    <Container className={classes.root}>
      <Header>
        <HeaderLeft>
          <ArrowBack />
          <Spacer size={SMALL} />
          <UserAvatar user={person} size={MEDIUM} />
          <Spacer size={SMALL} />
          <UserName user={person} withEllipsis />
        </HeaderLeft>
        <HeaderRight>
          {(isLoggedPerson(person, userLogged) || isAdmin(userLogged)) && (
            <IconButton onClick={() => disableEditMode(false)} disabled={!isFormDisabled}>
              <EditIcon />
            </IconButton>
          )}
          {isAdmin(userLogged) && (
            <Menu>
              <MenuUserList actions={actions} person={person} />
            </Menu>
          )}
        </HeaderRight>
      </Header>
      <Content>
        <PersonDetails
          disableEditMode={disableEditMode}
          isFormDisabled={isFormDisabled}
          person={person}
          resumes={resumes}
          actions={actions}
          isLoggedPerson={isLoggedPerson(person, userLogged)}
          isAdmin={isAdmin(userLogged)}
        />
      </Content>
    </Container>
  );
};

Page.propTypes = {
  match: PropTypes.object,
  people: PropTypes.object,
  resumes: PropTypes.array,
  classes: PropTypes.object,
  disableEditMode: PropTypes.func.isRequired,
  isFormDisabled: PropTypes.bool,
  actions: PropTypes.object,
  userLogged: PropTypes.object,
  routes: PropTypes.object,
};

const actions = {
  editPeople: peopleActions.update,
  loadFile: resumesActions.viewFile,
  deletePerson: peopleActions.del,
};

const mapStateToProps = (state, ownProps) => {
  return {
    resumes: getResumesByPersonId(state, ownProps),
    people: getPeople(state),
    userLogged: getUser(state),
  };
}

const mapDispatchToProps = dispatch => ({
  actions: {
    ...bindActionCreators(actions, dispatch),
    addQueryResumes: tag => (...params) => dispatch(resumesActions.addQueryResumes(tag)(...params)),
  },
});

const withEdit = withStateHandlers(() => ({ isFormDisabled: true }), {
  disableEditMode: () => value => ({ isFormDisabled: value }),
});

export const enhance = compose(
  withStyles(styles),
  withRoutes,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withEdit,
  lifecycle({
    componentWillReceiveProps(nextProps) {
      if (nextProps.match.params.id !== this.props.match.params.id) {
        this.props.disableEditMode(true);
      }
    }
  }),
);

export default enhance(Page);
