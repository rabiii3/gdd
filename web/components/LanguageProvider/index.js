import { compose } from 'recompose';
import { connect } from 'react-redux';
import component from './component';
import { getLocale } from '../../selectors/language';

const mapStateToProps = state => ({
  locale: getLocale(state),
});

export const enhance = compose(connect(mapStateToProps));

export default enhance(component);
