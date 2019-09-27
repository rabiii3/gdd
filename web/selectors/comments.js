import { find, prop, propOr, filter, sort, ascend, compose, reverse, values, descend, } from 'ramda';
import { createSelector } from 'reselect';

export const root = prop('comments');
export const getComments = createSelector(root, comments => values(propOr({}, 'data')(comments)));

export const getCommentsByResumeId = resumeId =>
createSelector(
  getComments,
  compose(
    reverse,
    sort(ascend(prop('createdAt'))),
    filter(comment => comment.entityId === resumeId),
  ),
);

export const getLastTodo = resumeId => createSelector(
  getCommentsByResumeId(resumeId),
  compose(
    find(comment => {
      if (prop('what', comment)) {
        if (!prop('when', comment)) return true;
        return new Date(comment.when) >= Date.now();
      }
    }),
    sort(ascend(prop('when'))),
  )
);

export const getFutureTodo = createSelector(
  getComments,
  compose(
    filter(comment => new Date(comment.when) >= Date.now()),
    sort(ascend(prop('when'))),
    filter(comment => comment.what),
  ),
);


const filterFuturDate = resume => comment => {
  if (comment.entityId === resume._id && comment.what) {
    if (!comment.when)
    return true
    if (new Date(comment.when) >= Date.now())
    return true
  }
  return false
}

export const getTodoByDate = comments => resume =>
compose(
  (comment) => comment[0] ? comment[0].when ? prop('when', comment[0]) : "3000-12-30T23:00:00.000Z" : "4000-12-30T23:00:00.000Z",
  reverse,
  sort(descend(prop('when'))),
  filter(filterFuturDate(resume)),
) (comments)
