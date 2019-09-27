import { map, prop, propOr, compose, sortWith, ascend, reject, isNil } from 'ramda';

export const getSkillsValues = map(prop('value'));
export const getSkillsLabels = (skills = {}, resume) => compose(sortWith([ascend(prop('label'))]), reject(isNil), map(id => skills[id]), propOr([], 'skills'))(resume);
