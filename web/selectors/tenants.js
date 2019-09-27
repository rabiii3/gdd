import { prop, map, merge, compose, sortWith, ascend, descend, path, find, propEq, values } from 'ramda';
import { createSelector } from 'reselect';
import { getStats } from './stats';

export const KEY = 'KEY';
export const COUNT = 'COUNT';
export const STATUS = 'STATUS';
export const SIZE = 'SIZE';
export const DATE = 'DATE';
export const SITE = 'SITE';
export const ACTIVE_USERS = 'ACTIVE_USERS';
export const DECLARED_USERS = 'DECLARED_USERS';

export const root = prop('tenants');
export const getTenants = createSelector(root, compose(values, prop('data')));

export const getTenantById = tenantId => createSelector(getTenants, getStats, (tenants, stats ) => 
compose(find(propEq('_id', tenantId)), map(tenant => merge(tenant, prop(tenant._id, stats))))(tenants));

export const getSortMode = createSelector(root, prop('sort'));

export const getTerms = ( sortBy, direction ) => {
  const dir = direction === 'asc' ? ascend : descend;
  switch (sortBy) {
    case KEY:
      return [dir(prop('key'))];
    case COUNT:
      return [dir(path(['resumes','count']))];
    case STATUS:
      return [dir(prop('status'))];
    case SIZE:
      return [dir(path(['resumes','size']))];
    case SITE:
      return [dir(prop(['siteUrl']))]
    case ACTIVE_USERS:
      return [dir(path(['users','active']))];
    case DECLARED_USERS:
      return [dir(path(['users','declared']))];
    default:
  }
};

const sortData = (sortBy, direction) => tenants => sortWith(getTerms(sortBy, direction))(tenants)

export const getSortedTenants = createSelector(getTenants, getStats, getSortMode, (tenants, stats, {sortBy, direction}) => 
  compose(sortData(sortBy, direction), map(tenant => merge(tenant, prop(tenant._id, stats))))(tenants)
);
