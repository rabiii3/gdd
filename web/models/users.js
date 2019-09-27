import { join, take, split, compose, map, values, pick, toUpper } from 'ramda';

const ROLE_ADMIN = 'Admin';
export const fullname = compose(
  join(' '),
  values,
  pick(['firstname', 'lastname']),
);
export const initials = compose(
  join(''),
  map(take(1)),
  take(3),
  split(' '),
  toUpper,
  fullname,
);

export const isAdmin = roles => roles.includes(ROLE_ADMIN);
