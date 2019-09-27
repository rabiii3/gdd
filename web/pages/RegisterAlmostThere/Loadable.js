import Loadable from 'react-loadable';

import CircularProgress from '../../components/CircularProgress';

export default Loadable({
  loader: () => import('./index'),
  loading: CircularProgress,
});
