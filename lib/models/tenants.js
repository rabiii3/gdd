import { propEq, } from 'ramda'; 

export const STATUS = {
  pending: 'pending',
  testing: 'testing',
  active: 'active',
  disabled: 'disabled',
};

const statusEq = status => propEq('status', status);
export const isPending = statusEq(STATUS.pending);
export const isTesting = statusEq(STATUS.testing);
export const isActive = statusEq(STATUS.active);
