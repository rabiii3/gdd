import { pathEq, prop } from 'ramda';
import { createSelector } from 'reselect';

export const root = prop('core');
export const hasSignInError = createSelector(root, pathEq(['error', 'method'], 'auth:signIn'));
export const hasRegisterError = createSelector(root, pathEq(['error', 'method'], 'auth:register'));
export const hasRegisterInError = createSelector(root, pathEq(['error', 'method'], 'auth:registerIn'));
export const getError = createSelector(root, prop('error'));
