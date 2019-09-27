import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'ramda';
import { FormattedMessage } from 'react-intl';
 
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import messages from './messages';
import { Header, HeaderLeft, HeaderRight } from '../../components/Header';
import { Container, ArrowBack, Spacer } from '../../widgets';
import SaveJob from '../../components/SaveJob';

const styles = {
 root:{
  backgroundImage: 'url(//www.gstatic.com/pantheon/images/marketplace/cameo_banner-1x.png)',
  backgroundRepeat: 'no-repeat',
 }
};

export const AddJob = ({ classes }) => (
  <Container className={classes.root}>
    <Header>
      <HeaderLeft>
        <ArrowBack />
        <Spacer size="SMALL" />
        <Typography variant="h6" noWrap><FormattedMessage {...messages.createJD} /></Typography>
      </HeaderLeft>
      <HeaderRight>
      </HeaderRight>
    </Header>
    <SaveJob isEditMode/>    
  </Container>
);

AddJob.propTypes = { 
  classes: PropTypes.object,
};

export const enhance = compose(
  withStyles(styles),
);

export default enhance(AddJob);