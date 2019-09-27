import { indexBy, prop, assoc, dissoc } from 'ramda';
import { USER_LOGOUT } from '../actions/auth';
import { TENANTS_LOADED, SORT_TENANTS, TENANT_ADDED, TENANT_UPDATED, TENANT_DELETED } from '../actions/admin/tenants';

export default (state = {
  data: {}, 
  sort: {sortBy: 'KEY', direction: 'asc'}}, 
  action) => {
  switch (action.type) {
    case USER_LOGOUT:
      return { ...state, data: {} };

    case TENANTS_LOADED:
      return { 
        ...state, 
        data: indexBy(prop('_id'),action.tenants)
      };

    case TENANT_ADDED:
      return {
        ...state, 
        data: assoc(action.tenant._id, action.tenant, state.data)
      }
    
    case TENANT_DELETED:
      return {
        ...state,
        data: dissoc(action.tenant._id, state.data)
      }

    case TENANT_UPDATED:
      return {
        ...state,
        data: assoc(action.updates._id, action.updates, state.data)
      };

    case SORT_TENANTS:
      return {
        ...state,
        sort:
          state.sort.direction === 'desc'
          ? { sortBy: action.typeSort, direction: 'asc' }
          : { sortBy: action.typeSort, direction: 'desc' },
      };

    default:
      return state;
  }
};
