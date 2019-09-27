import Loadable from 'react-loadable';

import CircularProgress from '../CircularProgress';

export default Loadable({
  loader: () => import('./index'),
  loading: CircularProgress,
});
