import { reduce, sortWith, ascend, values, map, prop, propOr, compose } from 'ramda';
import { createSelector } from 'reselect';

export const root = prop('skills');
export const getSkills = createSelector(root, propOr({}, 'data'));
const getResumes = createSelector(prop('resumes'), compose(values, propOr({}, 'data')));

export const getSortedSkills = createSelector(getSkills, skills => compose( sortWith([ascend(prop('label'))]), values,)(skills));

export const getUsedSortedSkills = createSelector(getSortedSkills, getResumes, (skills, resumes) => {
  const counts = reduce((acc, r) => reduce((acc, skillId) => acc[skillId] ? {...acc, [skillId]: acc[skillId] + 1} : {...acc, [skillId]: 1}, acc, r.skills || []), {}, resumes);
  return map(skill => ({ ...skill, counts: counts[skill._id] || 0 }), skills);
  })
