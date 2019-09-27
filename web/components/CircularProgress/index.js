import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import component from './component';

const styles = {
  root: {
    position: 'absolute',
    top: 'calc(50% - 25px)',
    left: 'calc(50% - 25px)',
  },
  circularProgress: {
    top: '50%',
    left: '50%',
    '& svg circle': {
      stroke: '#c5281c',
    },
  },
};

export const enhance = compose(withStyles(styles));

export default enhance(component);
