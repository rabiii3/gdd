import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { compose, withStateHandlers, lifecycle } from 'recompose';
import { FormattedMessage } from 'react-intl';
import { prop, equals } from 'ramda';
 
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import messages from './messages';
import { Header, HeaderLeft, HeaderRight } from '../../components/Header';
import { Container, ArrowBack, Spacer } from '../../widgets';
import SaveJob from '../../components/SaveJob';
import { getJobById } from '../../selectors/jobs';

const styles = {
 root:{
  backgroundImage: 'url(//www.gstatic.com/pantheon/images/marketplace/cameo_banner-1x.png)',
  backgroundRepeat: 'no-repeat',
 }
};

export const UpdateJob = ({ 
  classes, 
  job, 
  isEditMode, 
  setEditMode }) => (
  <Container className={classes.root}>
    <Header>
      <HeaderLeft>
        <ArrowBack />
        <Spacer size="SMALL" />
        <Typography variant="h6" noWrap>{isEditMode ? <FormattedMessage {...messages.editJD} /> : prop('title', job) }</Typography>
      </HeaderLeft>
      <HeaderRight>
        <Tooltip title={<FormattedMessage {...messages.editTooltip} />}>
          <IconButton onClick={() => setEditMode(true)} disabled={isEditMode}>
            <EditIcon className={classes.iconHeader} />
          </IconButton>
        </Tooltip>
      </HeaderRight>
    </Header>
      <SaveJob job={job} isEditMode={isEditMode} setEditMode={setEditMode}/>    
  </Container>
);

UpdateJob.propTypes = { 
  classes: PropTypes.object,
  isEditMode: PropTypes.bool,
  setEditMode: PropTypes.func,
  job: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  job: getJobById(ownProps.match.params.id)(state),
});

const withEdit = withStateHandlers(() => ({ isEditMode: false }), {
  setEditMode: () => value => ({ isEditMode: value }),
});

export const enhance = compose(
  withStyles(styles),
  withEdit,
  connect(mapStateToProps),
  lifecycle({
    componentDidMount() {
      const params = new URLSearchParams(prop('search', this.props.location));
      const mode =  params.get('mode');
      this.props.setEditMode(equals(mode, 'edit'))
    },
  }),
);

export default enhance(UpdateJob);