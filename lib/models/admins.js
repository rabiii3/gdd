import { propEq } from 'ramda';

export const STATUS = {
  pending: 'pending',
  active: 'active',
  disabled: 'disabled',
};
const statusEq = status => propEq('status', status);
export const isPending = statusEq(STATUS.pending);
export const isActive = statusEq(STATUS.active);
