import { indexBy, prop } from 'ramda';
import { USER_LOGOUT } from '../actions/auth';
import { TENANT_STATS_LOADED } from '../actions/admin/stats';

export default (state ={}, 
  action) => {
  switch (action.type) {
    case USER_LOGOUT:
      return { ...state, data:{}};
    case TENANT_STATS_LOADED: 
      return { ...state, data: indexBy(prop('_id'),action.stats)};
    default:
      return state;
  }
};
