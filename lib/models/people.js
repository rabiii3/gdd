import {
  intersection,
  join,
  take,
  split,
  compose,
  map,
  values,
  pick,
  toUpper,
  propOr,
  contains,
  propEq,
  equals,
  toPairs,
  filter,
  reject,
} from 'ramda';

export const STATUS = {
  pending: 'pending',
  active: 'active',
  disabled: 'disabled',
};

export const STATUS_COLOR = {
  [STATUS.pending]: 'yellow',
  [STATUS.accepted]: 'green',
  [STATUS.disable]: 'red',
};

export const STATUS_TO_LABEL = {
  [STATUS.active]: 'Active',
  [STATUS.pending]: 'Pending',
  [STATUS.disabled]: 'Disabled',
};

export const ROLE = {
  worker: 'worker',
  sales: 'sales',
  headHunter: 'headhunter',
  admin: 'admin',
};

export const COLOR = {
  [STATUS.pending]: 'blue',
  [STATUS.active]: 'green',
  [STATUS.disabled]: 'red',
};

export const ROLES = [
  { value: ROLE.worker, label: 'Worker' },
  { value: ROLE.admin, label: 'Admin' },
  { value: ROLE.headHunter, label: 'Head Hunter' },
  { value: ROLE.sales, label: 'Sales' },
];
export const fullname = compose(
  join(' '),
  values,
  pick(['firstname', 'lastname']),
  x => x || {},
);
export const getPersonDetails = compose(
  join(' '),
  values,
  pick(['firstname', 'lastname', 'email', 'phoneNumber', 'status']),
  x => x || {},
);

export const initials = compose(
  join(''),
  map(take(1)),
  take(3),
  split(' '),
  toUpper,
  fullname,
);

const statusEq = status => propEq('status', status);
export const isPending = statusEq(STATUS.pending);
export const isActive = statusEq(STATUS.active);
export const isAdmin = user => contains(ROLE.admin, propOr([], 'roles', user));
export const isHeadHunter = user => contains(ROLE.headHunter, propOr([], 'roles', user));
export const isSales = user => contains(ROLE.sales, propOr([], 'roles', user));
export const isLoggedPerson = (person, user) => equals(person._id, user._id);
export const hasSomeRoles = (roles = [], user) => {
  if (!roles.length) return true;
  if (!user.roles || !user.roles.length) return false;
  return intersection(roles, user.roles).length !== 0;
};

export const statusLabel = person => STATUS_TO_LABEL[person.status];
export const statusKeyValue = compose(
  map(([key, value]) => ({ key, value })),
  toPairs,
)(STATUS_TO_LABEL);

export const rolesHaveLabel = Roles =>
  Roles &&
  compose(
    map(element => element[0]),
    map(role => filter(propEq('value', role))(ROLES)),
  )(Roles);

export const statusColor = person => COLOR[person.status] || 'primary';
export const rejectWorkerFromRoles = reject(propEq('value', 'worker'));
