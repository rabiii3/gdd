import { compose, map, toPairs, prop } from 'ramda';
import { convertFromHTML } from 'draft-js';

export const STATUS = {
  pending: 'pending',
  accepted: 'accepted',
  rejected: 'rejected',
  hired: 'hired',
  fired: 'fired',
  archived: 'archived',
  canceled: 'canceled',
  checking: 'checking',

};
export const STATUS_TO_LABEL = {
  [STATUS.pending]: 'Pending',
  [STATUS.accepted]: 'Accepted',
  [STATUS.rejected]: 'Rejected',
  [STATUS.hired]: 'Hired',
  [STATUS.fired]: 'Fired',
  [STATUS.archived]: 'Archived',
  [STATUS.canceled]: 'Canceled',
  [STATUS.checking]: 'Checking',

};
export const statusToLabel = comment => comment.nextVersion && STATUS_TO_LABEL[comment.nextVersion.status];
export const statusKeyValue = compose(
  map(([key, value]) => ({ key, value })),
  toPairs,
)(STATUS_TO_LABEL);

export const EVENT = {
  updated: 'updated',
  created: 'created',
};
export const EVENT_TO_LABEL = {
  [EVENT.updated]: 'Updated',
  [EVENT.created]: 'Created',
};
export const eventToLabel = event => EVENT_TO_LABEL[event];
export const eventKeyValue = compose(
  map(([key, value]) => ({ key, value })),
  toPairs,
)(EVENT_TO_LABEL);

export const isCommentContent = comment => convertFromHTML(prop('content')(comment)).contentBlocks;

export const withoutHtmlTags = comment => comment.replace(/(<([^>]+)>)/ig, "");