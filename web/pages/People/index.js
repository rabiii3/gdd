import React from 'react';
import { compose } from 'ramda';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import SearchBar from 'material-ui-search-bar';
import { getUser } from '../../selectors/auth';
import { Header, HeaderLeft, HeaderRight } from '../../components/Header';
import People from '../../components/People';
import { getSearchedPeople, getSearchQuery } from '../../selectors/people';
import { Container, Content, Spacer } from '../../widgets';
import ResumeIcon from '../../widgets/ResumeIcon';
import Title from '../../widgets/Title';
import * as peoplesActions from '../../actions/people';
import messages from './messages';


const styles = {
  root: {
    height: '100vh',
    backgroundImage: 'url(//www.gstatic.com/pantheon/images/marketplace/cameo_banner-1x.png)',
    backgroundRepeat: 'no-repeat',
  },
  boxShadow: {
    boxShadow: '0px 0px 0px 0px'
  },
};
export const Page = ({ classes, people, actions, intl, userLogged, query }) => {
  return (
    <Container className={classes.root}>
      <Header>
        <HeaderLeft>
          <ResumeIcon />
          <Spacer size="MEDIUM" />
          <Title text={intl.formatMessage(messages.title)} />
        </HeaderLeft>
        <HeaderRight>
          <Hidden xsDown>
            <SearchBar
              value={query}
              onChange={event => actions.updateQueryPeople(event)}
              onCancelSearch={() => actions.resetQueryPeople()}
              className={classes.boxShadow}

            />
          </Hidden>
        </HeaderRight>
      </Header>
      <Content>
        <People people={people} actions={actions} userLogged={userLogged} />
      </Content>
    </Container>
  );
};
Page.propTypes = {
  classes: PropTypes.object,
  people: PropTypes.array,
  actions: PropTypes.object,
  intl: intlShape,
  userLogged: PropTypes.object,
  query: PropTypes.string,
};

const actions = {
  handleSearchInPeoples: peoplesActions.handleSearchInPeoples,
  deletePerson: peoplesActions.del,
  updateQueryPeople: peoplesActions.updateQueryPeople,
  resetQueryPeople: peoplesActions.resetQueryPeople,
};
const mapStateToProps = createStructuredSelector({
  people: getSearchedPeople,
  userLogged: getUser,
  query: getSearchQuery,
});
const mapDispatchToProps = dispatch => ({
  actions: {
    ...bindActionCreators(actions, dispatch),
    addQueryPeople: tag => (...params) => dispatch(peoplesActions.addQueryPeople(tag)(...params)),
  },
});

export const enhance = compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  injectIntl,
);
export default enhance(Page);
