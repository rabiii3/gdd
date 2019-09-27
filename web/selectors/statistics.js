import { reduce, sortWith, ascend, values, map, prop, propOr, compose, filter, contains, uniq, concat, toPairs, groupBy, last, mergeAll, sort, descend, pick, take } from 'ramda';
import { getYear, getMonth, getDate, isAfter, isEqual, isBefore } from 'date-fns';
import { createSelector } from 'reselect';
import { getResumes } from './resumes'
import { getPeople } from './people'
import { getSortedSkills, getSkills } from './skills'
import { fullname } from '../../lib/models/people';
import { getSkillsLabels } from '../../lib/models/skills';

const FROM = 'from';
const TO = 'to';
const STATUS_PROP = 'status';
const INITIAL_DATE = 'initialDates';
const SHOW_RESUME_BY_COLLAB_TABLE = 'showResumesByCollabTable';

export const root = prop('statistics');
export const getStatisticsDates = createSelector(root, propOr({}, INITIAL_DATE));
export const getShowResumesByCollabTable = createSelector(root, prop(SHOW_RESUME_BY_COLLAB_TABLE));
export const getSelectedFromDate = createSelector(getStatisticsDates, prop(FROM));
export const getSelectedToDate = createSelector(getStatisticsDates, prop(TO));
export const getSelectedStatus = createSelector(root, prop(STATUS_PROP));
export const getSortedPeople = createSelector(getPeople, people => compose(sortWith([ascend(prop('firstname'))]), values, )(people));
export const getResumesByDateForStatus = createSelector(
  getResumes,
  getStatisticsDates,
  (resumes, dates) => filter(resume => {
    const CREATE_AT_YEAR = getYear(new Date(resume.createdAt));
    const CREATE_AT_MONTH = getMonth(new Date(resume.createdAt));
    const CREATE_AT_DAY = getDate(new Date(resume.createdAt));
    const FROM_YEAR = getYear(new Date(dates.from));
    const FROM_MONTH = getMonth(new Date(dates.from));
    const FROM_DAY = getDate(new Date(dates.from));
    const TO_YEAR = getYear(new Date(dates.to));
    const TO_MONTH = getMonth(new Date(dates.to));
    const TO_DAY = getDate(new Date(dates.to));
    const CREAT_AT_DATE = new Date(CREATE_AT_YEAR, CREATE_AT_MONTH, CREATE_AT_DAY)
    const FROM_DATE = new Date(FROM_YEAR, FROM_MONTH, FROM_DAY)
    const TO_DATE = new Date(TO_YEAR, TO_MONTH, TO_DAY)

    return (
      (isAfter(CREAT_AT_DATE, FROM_DATE) || isEqual(CREAT_AT_DATE, FROM_DATE)) &&
      (isBefore(CREAT_AT_DATE, TO_DATE) || isEqual(CREAT_AT_DATE, TO_DATE))
    )
  }
  )(resumes)

);

export const getResumesByDate = createSelector(
  getSelectedStatus,
  getResumesByDateForStatus,
  (status, resumes) => status && status.length && status !== 'all' ?
    filter(resume => status && contains(prop(STATUS_PROP, resume))([status]))(resumes)
    : resumes

);

export const getPendingResumesByDate = createSelector(
  getResumesByDate,
  (resumes) =>
    filter(resume => contains(prop(STATUS_PROP, resume))(['pending']))(resumes)
);

export const getAcceptedResumesByDate = createSelector(
  getResumesByDate,
  (resumes) =>
    filter(resume => contains(prop(STATUS_PROP, resume))(['accepted']))(resumes)
);

export const getHiredResumesByDate = createSelector(
  getResumesByDate,
  (resumes) =>
    filter(resume => contains(prop(STATUS_PROP, resume))(['hired']))(resumes)
);

export const getConfirmedResumesByDate = createSelector(
  getResumesByDate,
  (resumes) =>
    filter(resume => contains(prop(STATUS_PROP, resume))(['confirmed']))(resumes)
);

export const getHiredAndConfirmedResumesByDate = createSelector(
  getHiredResumesByDate, getConfirmedResumesByDate, (hired, confirmed) =>
    concat(hired, confirmed)
);

export const getCheckingResumesByDate = createSelector(
  getResumesByDate,
  (resumes) =>
    filter(resume => contains(prop(STATUS_PROP, resume))(['checking']))(resumes)
);

export const getCanceledResumesByDate = createSelector(
  getResumesByDate,
  (resumes) =>
    filter(resume => contains(prop(STATUS_PROP, resume))(['canceled']))(resumes)
);

export const getArchivedResumesByDate = createSelector(
  getResumesByDate,
  (resumes) =>
    filter(resume => contains(prop(STATUS_PROP, resume))(['archived']))(resumes)
);

export const getSkillsUsedByDate = createSelector(getSortedSkills, getResumesByDate, (skills, resumes) => {
  const counts = reduce((acc, r) => reduce((acc, skillId) => acc[skillId] ? { ...acc, [skillId]: acc[skillId] + 1 }
    : { ...acc, [skillId]: 1 }, acc, r.skills || []), {}, resumes);
  return map(skill => values({ id: skill.label, value: counts[skill._id] }), filter(skill => counts[skill._id])(skills));
})

export const getStatusUsedByDate = createSelector(getResumesByDateForStatus, resumes => {
  const counts = reduce((acc, r) => acc[r.status] ? { ...acc, [r.status]: acc[r.status] + 1 } : { ...acc, [r.status]: 1 }, {}, resumes);
  const status = [];
  return compose(uniq, map(resume => concat(status, values({ status: resume.status, value: counts[resume.status] }))))(resumes);
})
export const getResumesByAuthor = createSelector(getResumesByDate, getSortedPeople, (resumes, people) => {
  const counts = reduce((acc, r) => acc[r.createdBy] ? { ...acc, [r.createdBy]: acc[r.createdBy] + 1 } : { ...acc, [r.createdBy]: 1 }, {}, resumes);
  return map(author => ({ id: fullname(author), value: counts[author._id], profile: author._id }), filter(author => counts[author._id])(people));
});

export const getHiredAndConfirmedResumesByAuthor = createSelector(getHiredAndConfirmedResumesByDate, getSortedPeople, (resumes, people) => {
  const counts = reduce((acc, r) => acc[r.createdBy] ? { ...acc, [r.createdBy]: acc[r.createdBy] + 1 } : { ...acc, [r.createdBy]: 1 }, {}, resumes);
  return map(author => ({ id: fullname(author), value: counts[author._id], profile: author._id }), filter(author => counts[author._id])(people));
});

export const getResumesByAuthorForChart = createSelector(
  getResumesByAuthor, (resumes) => map(resume => values(resume))(resumes)
);
const numberOfResume = compose(
  take(3),
  map(values),
  sort(descend(prop('value'))),
  map(pick(['value'])),
);
const ProductiveAndActiveKoopter = (resumes, numbers) => {
  const importantNumbers = ([map(number => number[0])(numbers)]);
  return (
    compose(
      sort(descend(prop('value'))),
      filter(author => contains(prop('value', author))(importantNumbers[0]))
    )(resumes)
  )
}
export const getNumberResumeProductiveKoopter = createSelector(
  getHiredAndConfirmedResumesByAuthor, (hiredAndConfirmed) => numberOfResume(hiredAndConfirmed)
);

export const getProductiveKoopter = createSelector(
  getHiredAndConfirmedResumesByAuthor, getNumberResumeProductiveKoopter, (hiredAndConfirmed, numbers) => ProductiveAndActiveKoopter(hiredAndConfirmed, numbers)
);

export const getNumberResumeActiveKoopter = createSelector(
  getResumesByAuthor, (resumes) => numberOfResume(resumes)
);

export const getActiveKoopter = createSelector(
  getResumesByAuthor, getNumberResumeActiveKoopter, (resumes, numbers) => ProductiveAndActiveKoopter(resumes, numbers)
);

export const getPendingResumesByAuthor = createSelector(getPendingResumesByDate, getSortedPeople, (resumes, people) => {
  const counts = reduce((acc, r) => acc[r.createdBy] ? { ...acc, [r.createdBy]: acc[r.createdBy] + 1 } : { ...acc, [r.createdBy]: 1 }, {}, resumes);
  return map(author =>
    values({ id: fullname(author), value: counts[author._id], profile: author._id }),
    filter(author => counts[author._id])(people)
  );
})


export const getResumesWithStatusCount = createSelector(getResumesByDate, getPendingResumesByDate, getAcceptedResumesByDate,
  getHiredResumesByDate, getCheckingResumesByDate, getConfirmedResumesByDate, getCanceledResumesByDate, getArchivedResumesByDate, getSortedPeople, getSkills,
  (resumes, pendingResume, acceptedResume, hiredResume, checkingResume, confirmedResume,canceledResume, archivedResume, people, allSkills) => {
    const application = (acc, r) => acc[r.createdBy] ? { ...acc, [r.createdBy]: acc[r.createdBy] + 1 } : { ...acc, [r.createdBy]: 1 }
    const counts = reduce(application, {}, resumes);
    const countsPending = reduce(application, {}, pendingResume);
    const countsAccepted = reduce(application, {}, acceptedResume);
    const countsHired = reduce(application, {}, hiredResume);
    const countsChecking = reduce(application, {}, checkingResume);
    const countsConfirmed = reduce(application, {}, confirmedResume);
    const countsCanceled = reduce(application, {}, canceledResume);
    const countsArchived = reduce(application, {}, archivedResume);
    const concatAll = reduce(concat, []);

    return concatAll([
      map(author =>
        [{ id: author._id, name: fullname(author), all: counts[author._id], skills: getSkillsLabels(allSkills, resumes) }],
        filter(author => counts[author._id])(people)
      ),
      map(author =>
        [{ id: author._id, name: fullname(author), pending: countsPending[author._id], skills: getSkillsLabels(allSkills, resumes) }],
        filter(author => countsPending[author._id])(people)
      ),
      map(author =>
        [{ id: author._id, name: fullname(author), accepted: countsAccepted[author._id], skills: getSkillsLabels(allSkills, resumes) }],
        filter(author => countsAccepted[author._id])(people)
      ),
      map(author =>
        [{ id: author._id, name: fullname(author), hired: countsHired[author._id], skills: getSkillsLabels(allSkills, resumes) }],
        filter(author => countsHired[author._id])(people)
      ),
      map(author =>
        [{ id: author._id, name: fullname(author), checking: countsChecking[author._id], skills: getSkillsLabels(allSkills, resumes) }],
        filter(author => countsChecking[author._id])(people)
      ),
      map(author =>
        [{ id: author._id, name: fullname(author), confirmed: countsConfirmed[author._id], skills: getSkillsLabels(allSkills, resumes) }],
        filter(author => countsConfirmed[author._id])(people)
      ),
      map(author =>
        [{ id: author._id, name: fullname(author), canceled: countsCanceled[author._id], skills: getSkillsLabels(allSkills, resumes) }],
        filter(author => countsCanceled[author._id])(people)
      ),
      map(author =>
        [{ id: author._id, name: fullname(author), archived: countsArchived[author._id], skills: getSkillsLabels(allSkills, resumes) }],
        filter(author => countsArchived[author._id])(people)
      )
    ]);
  });

export const getResumesWithStatus = createSelector(getResumesWithStatusCount, resumes => {
  return compose(
    toPairs,
    map(mergeAll()),
    groupBy(prop('id')),
    map(last)
  )(resumes);
});

export const getDailyResumes = createSelector(
  getResumes, (resumes) => filter(resume => new Date(resume.createdAt).toDateString() === new Date().toDateString() &&
    !contains(prop(STATUS_PROP, resume))(['archived', 'canceled', 'fired']))(resumes)
);
