import { prop } from 'ramda';
import { createSelector } from 'reselect';

export const root = prop('stats');

export const getStats = createSelector(root, prop('data'));

