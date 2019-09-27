import { request } from './utils';
import { getToken } from '../../selectors/auth';

export const LOAD_PEOPLE = 'LOAD_PEOPLE'
export const PEOPLE_LOADED = 'PEOPLE_LOADED';
export const SORT_PEOPLE = 'SORT_PEOPLE';

export const loadAll = tenantId => (dispatch, getState) => {
  dispatch({ type: LOAD_PEOPLE, tenantId});
  const token = getToken(getState());
  return request(dispatch, { method: 'people:loadAll',tenantId, token }).then(people =>
    dispatch({ type: PEOPLE_LOADED, people }),
  );
};

export const sortPeople = typeSort => ({ type: SORT_PEOPLE, typeSort });
