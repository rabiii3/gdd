import { path, prop } from 'ramda';
import { createSelector } from 'reselect';

export const getUser = path(['auth', 'user']);
export const getToken = path(['auth', 'token']);
export const getIdUser = createSelector(getUser, prop('_id'));
