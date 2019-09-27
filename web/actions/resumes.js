import { compose, map, join, indexOf } from 'ramda';
import { request } from './utils';
import { fullname } from '../../lib/models/people';

import { getToken } from '../selectors/auth';
import { getSearchQuery } from '../selectors/resumes';
import { tokenize } from '../utils/tokenizer';
import { makeTaggedQuery } from '../utils/tags';
import { ADD_COMMENT, COMMENT_ADDED } from './comments';

export const ADD_RESUME = 'resumes/ADD_RESUME';
export const RESUME_ADDED = 'resumes/RESUME_ADDED';
export const UPDATE_RESUME = 'resumes/UPDATE_RESUME';
export const RESUME_UPDATED = 'resumes/RESUME_UPDATED';
export const RESUMES_LOADED = 'resumes/RESUMES_LOADED';
export const LOAD_FILE = 'resumes/LOAD_FILE';
export const FILE_LOADED = 'resumes/FILE_LOADED';
export const ADD_FORM = 'resumes/ADD_FORM';
export const ADD_QUERY_RESUMES = 'search/ADD_QUERY_RESUMES';
export const UPDATE_QUERY_RESUMES = 'search/UPDATE_QUERY_RESUMES';
export const RESET_QUERY_RESUMES = 'search/RESET_QUERY_RESUMES';
export const RESUMES_SORT = 'resumes/RESUMES_SORT';
export const RESUMES_STATUS_FILTER = 'resumes/RESUMES_STATUS_FILTER';
export const RESUMES_STATIC_FILTER = 'search/RESUMES_STATIC_FILTER';
export const RESUMES_SET_TABLE_VIEW = 'resumes/RESUMES_SET_TABLE_VIEW';
export const RESUMES_SET_SHOW_HIDDEN_RESUMES = 'resumes/RESUMES_SET_SHOW_HIDDEN_RESUMES';
export const DELETE_RESUME = 'resumes/RESUME_DELETE';
export const RESUME_DELETED = 'resumes/RESUME_DELETED';
export const RESUMES_SKILLS_FILTER = 'resumes/RESUMES_SKILLS_FILTER';
export const RESUMES_SKILL_CHIP_FILTER = 'resumes/RESUMES_SKILL_CHIP_FILTER';

export const addForm = formobject => ({ type: ADD_FORM, formobject });

export const add = resume => (dispatch, getState) => {
  dispatch({ type: ADD_RESUME, resume });
  const token = getToken(getState());
  return request(dispatch, { method: 'resumes:add', token, resume }).then(newResume => {
    dispatch({ type: RESUME_ADDED, resume: newResume });
    if (resume.comment || resume.what) {
      dispatch({ type: ADD_COMMENT });
      request(dispatch, {
        method: 'comments:add',
        token,
        comment: { entityId: newResume._id, entityType: 'resume', content: resume.comment, what:resume.what, when:resume.when, who:resume.who },
      }).then(comment => dispatch({ type: COMMENT_ADDED, comment }));
    }
  });
};

export const del = resume => (dispatch, getState) => {
  dispatch({ type: DELETE_RESUME, resume });
  const token = getToken(getState());
  return request(dispatch, { method: 'resumes:del', token, resume }).then(resume =>
    dispatch({ type: RESUME_DELETED, resume }),
  );
};

export const update = updates => (dispatch, getState) => {
  dispatch({ type: UPDATE_RESUME, updates });
  const token = getToken(getState());
  return request(dispatch, { method: 'resumes:update', token, updates }).then(updates =>
    dispatch({ type: RESUME_UPDATED, updates }),
  );
};

export const loadAll = () => (dispatch, getState) => {
  const token = getToken(getState());
  return request(dispatch, { method: 'resumes:loadAll', token }).then(resumes => {
    dispatch({ type: RESUMES_LOADED, resumes });
    return resumes;
    // const loadComments = ({ _id }) => dispatch(loadAllComments({ entityId: _id, entityType: 'resume' }));
    // Promise.all(map(resume => loadComments(resume), resumes));
  });
};

export const viewFile = resume => async dispatch => {
  const data = await dispatch(loadFile(resume));
  const fileURL = URL.createObjectURL(data);
  // window.open(fileURL, '_blank');
  const link = document.createElement('a');
  link.href = fileURL;
  link.setAttribute('download', `${fullname(resume)}.pdf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// export const viewFile = resume => (dispatch, getState) => {
//   const token = getToken(getState());
//   window.open(`/api/resumes/loadFile/${resume._id}?token=${token}`);
// };

export const loadFile = resume => (dispatch, getState) => {
  dispatch({ type: LOAD_FILE });
  const token = getToken(getState());
  return request(dispatch, { method: 'resumes:loadFile', resume, token });
};

export const addQueryResumes = tag => term => (dispatch, getState) => {
  const query = getSearchQuery(getState());
  const terms = tokenize(query);
  const newQuery = makeTaggedQuery(tag, term);
  const stringQuery = compose(
    join(' '),
    map(({ tag, term }) => makeTaggedQuery(tag, term)),
  )(terms);
  if (indexOf(newQuery, stringQuery) === -1) dispatch({ type: ADD_QUERY_RESUMES, query: newQuery });
};
export const updateQueryStatisticsResumes = tag => term => (dispatch) => {
  dispatch({ type: UPDATE_QUERY_RESUMES, query: makeTaggedQuery(tag, term) });
};
export const updateQueryResumes = query => ({ type: UPDATE_QUERY_RESUMES, query });
export const resetQueryResumes = () => ({ type: RESET_QUERY_RESUMES });

export const sortResumes = typeSort => ({ type: RESUMES_SORT, typeSort });
export const resumesStatusFilter = status => ({ type: RESUMES_STATUS_FILTER, status });
export const resumesSkillsFilter = skills => ({ type: RESUMES_SKILLS_FILTER, skills });
export const resumesChipSkillFilter = skill => ({ type: RESUMES_SKILL_CHIP_FILTER, skill });
export const setShowTableView = showTableView => ({ type: RESUMES_SET_TABLE_VIEW, showTableView });
export const setShowHiddenResumes = showHiddenResumes => ({
  type: RESUMES_SET_SHOW_HIDDEN_RESUMES,
  showHiddenResumes,
});
