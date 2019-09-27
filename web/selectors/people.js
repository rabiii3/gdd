import { prop, propOr, values, indexOf, toUpper, filter, map, concat, uniq, all, split, join } from 'ramda';
import { createSelector } from 'reselect';
import { compose } from 'recompose';
import { getIdUser } from './auth';
import { fullname, isAdmin, isHeadHunter, isSales, getPersonDetails } from '../../lib/models/people';

export const root = prop('people');
export const getPeople = createSelector(root, propOr({}, 'data'));
export const getLoggedPerson = createSelector(getIdUser, getPeople, (id, people) => people[id]);
export const getPeopleValues = createSelector(getPeople, values);
export const getSearchQuery = createSelector(root, prop('query'));

const getRoles = compose(join(' '), values);
const getKeywords = person => ` ${getPersonDetails(person) && toUpper(getPersonDetails(person))}
 ${getRoles(person.roles) && toUpper(getRoles((person.roles)))}  ${fullname(person) && toUpper(fullname(person))} ${person.status && toUpper(person.status)}`;

const multiSearch = (searchTerm = "") => people => {
    const match = people => query => !query || indexOf(toUpper(query), getKeywords(people, searchTerm)) !== -1
    const query = split(' ', searchTerm)
    return filter(person => all(match(person), query))(people)
}
export const getSearchedPeople = createSelector(
    getPeopleValues,
    getSearchQuery,
    (people, searchTerm) => multiSearch(searchTerm)(people),
)

export const getFilterAdminsAndHeadHunters = createSelector(getPeople,
    filter(isAdmin),
);

export const getAdminsAndHeadHunters = createSelector(getPeople, people =>
    uniq(
        concat(
            compose(
                map(element => ({ value: element._id, label: element })),
                values(),
                filter(isHeadHunter)
            )(people),
            compose(
                map(element => ({ value: element._id, label: element })),
                values(),
                filter(isSales)
            )(people),
            compose(
                map(element => ({ value: element._id, label: element })),
                values(),
                filter(isAdmin)
            )(people)
        )),

);
