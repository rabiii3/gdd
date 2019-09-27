import { createSelector } from 'reselect';
import { compose, map, join, prop, propOr, propEq, values, find, sortWith, ascend, descend, toUpper } from 'ramda';

import { getPeople } from './people';
import { getSkills } from './skills';
import { fullname } from '../../lib/models/people';


export const TITLE = 'TITLE';
export const AUTHOR = 'AUTHOR';
export const SKILLS = 'SKILLS';
export const CREATED_AT = 'CREATED_AT';

export const root = prop('jobs');
export const getJobs = createSelector(root, compose(values,prop('data')));

export const getJobById = jobId => createSelector(getJobs, find(propEq('_id', jobId)));
export const getSortMode = createSelector(root, propOr({sortBy: TITLE, direction: 'asc'},'sort'));

const getAuthor = people => ({ createdBy }) => people[createdBy];

const getAuthorTerm = people => job => compose(
  toUpper,
  fullname,
)(getAuthor(people)(job));

const getSkillsTerm = skills => job => compose(
  join(' '),
  map(id => propOr('', 'label', skills[id] || {})),
  propOr([], 'skills'),
)(job);

const getTerms = (people, skills, sortBy, direction ) => {
  const dir = direction === 'asc' ? ascend : descend;
  switch (sortBy) {
    case TITLE:
      return [dir(prop('title'))];
    case AUTHOR:
      return [dir(getAuthorTerm(people))];
    case SKILLS:
      return [dir(getSkillsTerm(skills))];
    case CREATED_AT:
      return [dir(prop('createdAt'))];
    default:
  }
};

const sortJobs = (people, skills, sortBy, direction) => jobs => sortWith(getTerms(people,skills, sortBy, direction))(jobs)

export const getSortedJobs = createSelector(getPeople, getSkills, getJobs, getSortMode, (people, skills, jobs, sort) => 
sortJobs(people, skills, prop('sortBy',sort), prop('direction',sort))(jobs) 
);