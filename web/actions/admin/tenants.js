import { request } from './utils';
import { getToken } from '../../selectors/auth';

export const ADD_TENANT = 'ADD_TENANT';
export const UPDATE_TENANT = 'UPDATE_TENANT';
export const DELETE_TENANT = 'DELETE_TENANT';
export const TENANTS_LOADED = 'TENANTS_LOADED';
export const SORT_TENANTS = 'SORT_TENANTS';
export const TENANT_ADDED = 'TENANT_ADDED';
export const TENANT_UPDATED = 'TENANT_UPDATED';
export const TENANT_DELETED = 'TENANT_DELETED';

export const loadAll = () => (dispatch, getState) => {
  const token = getToken(getState());
  return request(dispatch, { method: 'tenants:loadAll', token }).then(tenants =>
    dispatch({ type: TENANTS_LOADED, tenants }),
  );
};

export const sortTenants = typeSort => ({ type: SORT_TENANTS, typeSort });

export const add = tenant => (dispatch, getState) => {
  dispatch({type: ADD_TENANT, tenant});
  const token = getToken(getState());
  return request(dispatch, { method: 'tenants:add', token, tenant }).then(newTenant => {
    dispatch({ type: TENANT_ADDED, tenant: newTenant });
  });
};

export const update = updates => (dispatch, getState) => {
  dispatch({type: UPDATE_TENANT, updates});
  const token = getToken(getState());
  return request(dispatch, { method: 'tenants:update', token, updates }).then(updates => {
    dispatch({ type: TENANT_UPDATED, updates });
  });
};

export const del = tenant => (dispatch, getState) => {
  dispatch({type: DELETE_TENANT, tenant});
  const token = getToken(getState());
  return request(dispatch, { method: 'tenants:del', token, tenant }).then(tenant => {
    dispatch({ type: TENANT_DELETED, tenant });
  });
};
