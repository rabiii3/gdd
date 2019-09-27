import { compose } from 'redux';
import { join, indexOf, map } from 'ramda';
import { request } from './utils';
import { getToken } from '../selectors/auth';
import { tokenize } from '../utils/tokenizer';
import { getSearchQuery } from '../selectors/people';
import { makeTaggedQuery } from '../utils/tags';

export const ADD_PERSON = 'people/ADD_PERSON';
export const UPDATE_PERSON = 'people/UPDATE_PERSON';
export const PERSON_ADDED = 'people/PERSON_ADDED';
export const PERSON_UPDATED = 'people/PERSON_UPDATED';
export const PEOPLE_LOADED = 'people/PEOPLE_LOADED';
export const PERSON_DELETED = 'people/PERSON_DELETED';
export const DELETE_PERSON = 'people/DELETE_PERSON';
export const FILTER_PEOPLES = 'search/FILTER_PEOPLES';
export const ADD_QUERY_PEOPLE = 'search/ADD_QUERY_PEOPLE';
export const UPDATE_QUERY_PEOPLE = 'search/UPDATE_QUERY_PEOPLE';
export const RESET_QUERY_PEOPLE = 'search/RESET_QUERY_PEOPLE';


export const add = person => (dispatch, getState) => {
  dispatch({ type: ADD_PERSON, person });
  const token = getToken(getState());
  return request(dispatch, { method: 'people:add', token, person }).then(person =>
    dispatch({ type: PERSON_ADDED, person }),
  );
};

export const update = updates => (dispatch, getState) => {
  dispatch({ type: UPDATE_PERSON, updates });
  const token = getToken(getState());
  return request(dispatch, { method: 'people:update', token, updates }).then(person =>
    dispatch({ type: PERSON_UPDATED, person }),
  );
};

export const loadAll = () => (dispatch, getState) => {
  const token = getToken(getState());
  return request(dispatch, { method: 'people:loadAll', token }).then(people =>
    dispatch({ type: PEOPLE_LOADED, people }),
  );
};
export const handleSearchInPeoples = term => ({ type: FILTER_PEOPLES, term });

export const del = person => (dispatch, getState) => {
  dispatch({ type: DELETE_PERSON, person });
  const token = getToken(getState());
  return request(dispatch, { method: 'people:del', token, person }).then(person =>
    dispatch({ type: PERSON_DELETED, person }),
  );
};

export const addQueryPeople = () => term => (dispatch, getState) => {
  const query = getSearchQuery(getState());
  const terms = tokenize(query);
  const stringQuery = compose(
    join(' '),
    map(({term}) => makeTaggedQuery(term)),
  )(terms);
  if (indexOf(term, stringQuery) === -1) dispatch({ type: ADD_QUERY_PEOPLE, query: term });
};
export const updateQueryPeople = query => ({ type: UPDATE_QUERY_PEOPLE, query });
export const resetQueryPeople = () => ({ type: RESET_QUERY_PEOPLE });