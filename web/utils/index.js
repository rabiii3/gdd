import { join, map, take, split, compose, toUpper } from 'ramda';

const initials = compose(
  join(''),
  map(take(1)),
  take(3),
  split(' '),
  toUpper,
);
export default { initials };

export const makeResumeFileUrl = (tenant, token, resume) => ({ url: `/api/resumes/loadFile/${resume._id}`, httpHeaders: { 'x-secret': token, 'x-tenant': tenant } });
