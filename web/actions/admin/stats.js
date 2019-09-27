import { request } from './utils';
import { getToken } from '../../selectors/auth';

export const TENANT_STATS_LOADED = 'TENANT_STATS_LOADED';

export const loadStats = () => (dispatch, getState) => {
  const token = getToken(getState());
  return request(dispatch, { method: 'tenants:stats', token }).then(stats =>
    dispatch({ type: TENANT_STATS_LOADED, stats }),
  );
};
