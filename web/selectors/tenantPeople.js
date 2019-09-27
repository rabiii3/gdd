import { createSelector } from 'reselect';
import { compose, prop, propOr, values, sortWith, ascend, descend } from 'ramda';

export const FIRST_NAME = 'FIRST_NAME';
export const LAST_NAME = 'LAST_NAME';
export const EMAIL = 'EMAIL';
export const PHONE = 'PHONE';
export const STATUS = 'STATUS';
export const ROLES = 'ROLES';
export const RESUMES = 'RESUMES';
export const CREATED_AT = 'CREATED_AT';

export const root = prop('people');
export const getPeople = createSelector(root, compose(values, prop('data')));

export const getSortMode = createSelector(root, propOr({sortBy: FIRST_NAME, direction: 'asc'},'sort'));

const getTerms = (sortBy, direction ) => {
    const dir = direction === 'asc' ? ascend : descend;
    switch (sortBy) {
      case FIRST_NAME:
        return [dir(prop('firstname'))];
      case LAST_NAME:
        return [dir(prop('lastname'))];
      case EMAIL:
        return [dir(prop('email'))];
      case PHONE:
        return [dir(prop('phoneNumber'))];
      case STATUS:
        return [dir(prop('status'))];
      case ROLES:
        return [dir(prop('roles'))];
      case RESUMES:
        return [dir(prop(''))];
      case CREATED_AT:
        return [dir(prop('createdAt'))];
      default:
    }
  };
  
const sortPeople = ( sortBy, direction) => people => sortWith(getTerms(sortBy, direction))(people)

export const getSortedPeople = createSelector(getPeople, getSortMode, (people, sort) => 
sortPeople( prop('sortBy',sort), prop('direction',sort))(people) 
);