import { reduce, prop, add, equals } from 'ramda';

export const getRoles = Roles => Roles && reduce((acc, element) => [...acc, element.value], [])(Roles);

export const totalAwardAmount = resumes => reduce((acc, resume) => prop('award',resume) ? add(acc,prop('award',resume)) : acc , 0, resumes);

export const haveAward = resumes => equals(totalAwardAmount(resumes), 0);
