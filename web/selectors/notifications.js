import { prop, propOr, sort, ascend, compose, reverse, propEq, reject } from 'ramda';
import { createSelector } from 'reselect';

export const root = prop('notifications');
export const getNotifications = createSelector(root, propOr([], 'data'));

export const getSortedNotifications = createSelector(
  getNotifications,
  compose(
    reverse,
    sort(ascend(prop('createdAt'))),
  ),
);
export const getFiltredNotifications = createSelector(getNotifications,
  compose(
    reject(propEq('alreadyRead', true))
  )
);
