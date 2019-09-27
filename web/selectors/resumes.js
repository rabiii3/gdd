import {
  path,
  indexOf,
  toUpper,
  prop,
  propOr,
  filter,
  propEq,
  ascend,
  descend,
  sortWith,
  find,
  compose,
  map,
  length,
  values,
  join,
  all,
  reject,
  innerJoin,
  toString,
} from 'ramda';

import { parsePhoneNumber } from 'libphonenumber-js'
import { createSelector } from 'reselect';
import { fullname, getPersonDetails } from '../../lib/models/people';
import { getPeople } from './people';
import { getTodoByDate, getComments } from './comments';
import { getSkills } from './skills';
import { statusWeight } from '../../lib/models/resumes';
import { getCountryCode } from '../forms/utils';
import { TAGS } from '../utils/tags';
import { tokenize } from '../utils/tokenizer';

export const root = prop('resumes');
export const getResumes = createSelector(
  root,
  compose(
    values,
    propOr({}, 'data'),
  ),
);

export const getSkillsFilter = createSelector(
  root,
  prop('skillsFilter'),
);
export const getChipSkillFilter = createSelector(
  root,
  prop('chipSkillFilter'),
);
export const getSearchQuery = createSelector(
  root,
  prop('query'),
);
export const getShowTableView = createSelector(
  root,
  prop('showTableView'),
);
export const getShowHiddenResumes = createSelector(
  root,
  prop('showHiddenResumes'),
);

export const getResumeById = resumeId =>
  createSelector(
    getResumes,
    find(propEq('_id', resumeId)),
  );
export const getPersonId = (state, props) => path(['match', 'params', 'id'], props);

export const getChanges = createSelector(
  root,
  prop('changes'),
);
export const getUpdateBy = createSelector(
  getChanges,
  prop('updatedBy'),
);
export const getCreatedBy = createSelector(
  getChanges,
  prop('createdBy'),
);
const ASC = 'asc';

const getAuthor = people => ({ createdBy }) => people[createdBy];

const getAuthorTerm = people => resume =>
  compose(
    toUpper,
    fullname,
  )(getAuthor(people)(resume));

const getCandidateTerm = compose(
  toUpper,
  fullname,
);

const getDateTerm = compose(
  d => new Date(d),
  prop('createdAt'),
);

const getRating = propOr(0, 'rating');

const getPhoneNumber = compose(
  getCountryCode,
  propOr('0', 'phoneNumber'),
);

const getAwardTerm = compose(
  propOr('0', 'award'),
);

const getSkillsFromResume = compose(
  skills => (skills ? skills.length : 0),
  propOr([], 'skills'),
);

const getStatusWeightedTerm = resume => compose(statusWeight)(resume);

const getEmail = compose(
  email => email.toLowerCase(),
  propOr('zzzzzz@zzzzz.fr', 'email'),
);

export const getTerms = (people, query, direction, comments) => {
  const dir = direction === ASC ? ascend : descend;
  switch (query) {
    case 'author':
      return [dir(getAuthorTerm(people))];
    case 'email':
      return [dir(getEmail)];
    case 'createdAt':
      return [dir(getDateTerm)];
    case 'status':
      return [dir(getStatusWeightedTerm), dir(getCandidateTerm)];
    case 'candidate':
      return [dir(getCandidateTerm)];
    case 'rating':
      return [dir(getRating)];
    case 'skills':
      return [dir(getSkillsFromResume)];
    case 'phoneNumber':
      return [dir(getPhoneNumber)];
    case 'award':
      return [dir(getAwardTerm)];
    case 'toDo':
      return [dir(getTodoByDate(comments))];
    default:
      return '';
  }
};

export const getResumeSkills = (skills, resume) =>
  compose(
    join(' '),
    map(id => propOr('', 'label', skills[id] || {})),
    propOr([], 'skills'),
  )(resume);

const getKeywords = (people, resume, skills, tag) => {
  const DEFAULT_COUNTRY = 'FR';
  const phoneNumber = !!resume.phoneNumber && parsePhoneNumber(toString(resume.phoneNumber), DEFAULT_COUNTRY);
  if (tag === TAGS.skill) return toUpper(getResumeSkills(skills, resume));
  if (tag === TAGS.status) return toUpper(resume.status);
  if (tag === TAGS.author) return toUpper(fullname(getAuthor(people)(resume)));
  if (tag === TAGS.country) return phoneNumber && phoneNumber.country;
  return `${toUpper(getPersonDetails(resume))} ${toUpper(getResumeSkills(skills, resume))} ${toUpper(
    fullname(getAuthor(people)(resume)),
  )}`;
};

const multiSearch = (people, skills, query) => resumes => {
  const test = (exclude, term, values) => (exclude ? indexOf(term, values) === -1 : indexOf(term, values) !== -1);
  const match = (people, resume, skills) => ({ exclude, tag, term }) =>
    !query || test(exclude, toUpper(term), getKeywords(people, resume, skills, tag));
  const terms = tokenize(query);
  return filter(resume => all(match(people, resume, skills), terms))(resumes);
};

const sortResumes = (people, { sortBy: term, direction }, comments) => resumes =>
  sortWith(getTerms(people, term, direction, comments))(resumes);

export const getSortMode = createSelector(
  root,
  propOr({ direction: ASC, sortBy: 'status' }, 'sort'),
);
export const getResumesFiltredByStatus = createSelector(
  getResumes,
  getShowHiddenResumes,
  (resumes, isHidden) =>
    isHidden
      ? innerJoin((resume, status) => resume.status === status, resumes, ['canceled', 'archived', 'rejected'])
      : compose(
        reject(propEq('status', 'archived')),
        reject(propEq('status', 'canceled')),
        reject(propEq('status', 'rejected')),
      )(resumes),
);

export const getFilteredAndSortedResumes = createSelector(
  getPeople,
  getComments,
  getResumesFiltredByStatus,
  getSkills,
  getSortMode,
  getSearchQuery,
  (people, comments, resumes, skills, sort, query) =>
    compose(
      sortResumes(people, sort, comments),
      multiSearch(people, skills, query),
    )(resumes),
);

export const getResumesByPersonId = createSelector(
  getPeople,
  getResumes,
  getSortMode,
  getPersonId,
  (people, resumes, sort, personId) =>
    compose(
      sortResumes(people, sort),
      filter(propEq('createdBy', personId)),
    )(resumes),
);

export const getResumesCountByPersonId = personId =>
  createSelector(
    getResumes,
    resumes =>
      compose(
        length(),
        filter(propEq('createdBy', personId)),
      )(resumes),
  );

export const getCountAwardAmountByPersonId = personId =>
  createSelector(
    getResumes,
    resumes =>
      compose(
        map(resume => prop("award", resume)),
        filter(propEq('status', 'confirmed')),
        filter(propEq('createdBy', personId)),
      )(resumes),
  );