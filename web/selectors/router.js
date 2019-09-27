import { path, prop } from 'ramda';
import { createSelector } from 'reselect';

const root = prop('router');
export const getLocation = createSelector(root, prop('location'));
export const getFile = createSelector(getLocation, path(['state', 'file']));
