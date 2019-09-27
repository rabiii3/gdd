import { propEq, compose, toPairs, map } from 'ramda';

export const STATUS = {
  pending: 'pending',
  checking: 'checking',
  accepted: 'accepted',
  rejected: 'rejected',
  hired: 'hired',
  fired: 'fired',
  archived: 'archived',
  canceled: 'canceled',
  confirmed: 'confirmed',
};

export const STATUS_TO_LABEL = {
  [STATUS.pending]: 'Pending',
  [STATUS.checking]: 'Checking',
  [STATUS.accepted]: 'Accepted',
  [STATUS.rejected]: 'Rejected',
  [STATUS.hired]: 'Hired',
  [STATUS.confirmed]: 'Confirmed',
  [STATUS.fired]: 'Fired',
  [STATUS.archived]: 'Archived',
  [STATUS.canceled]: 'Canceled',
};
export const COLOR = {
  [STATUS.pending]: 'yellow',
  [STATUS.accepted]: 'green',
  [STATUS.rejected]: 'red',
};
export const STATUS_WEIGHT = {
  [STATUS.pending]: 1,
  [STATUS.checking]: 2,
  [STATUS.accepted]: 3,
  [STATUS.rejected]: 4,
  [STATUS.hired]: 5,
  [STATUS.confirmed]: 6,
  [STATUS.fired]: 7,
  [STATUS.archived]: 8,
  [STATUS.canceled]: 9,
};

export const statusWeight = resume => STATUS_WEIGHT[resume.status];
export const statusColor = resume => COLOR[resume.status] || 'grey';
export const isAuthor = (people, resume) => resume.createdBy.toString() === people._id.toString();

const statusEq = status => propEq('status', status);
export const isConfirmed = statusEq(STATUS.confirmed);

export const statusLabel = resume => STATUS_TO_LABEL[resume.status];
export const statusKeyValue = compose(
  map(([key, value]) => ({ key, value })),
  toPairs,
)(STATUS_TO_LABEL);
