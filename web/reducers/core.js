import { pathOr } from 'ramda';
import { AUTH_ERROR, COMM_ERROR, START_REQUEST, END_REQUEST, REQUEST_ERROR, ACK_ERROR } from '../actions/core';

const getErrorType = ({ statusCode }) => {
  if (statusCode === 401 || statusCode === 403) return AUTH_ERROR;
  return COMM_ERROR;
};

const initialState = { pendingRequests: 0 };
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case START_REQUEST:
      return {
        ...state,
        pendingRequests: state.pendingRequests + 1,
      };
    case REQUEST_ERROR:
      return {
        ...state,
        error: { ...action.error, id: pathOr(0, ['error', 'id'], state) + 1, type: getErrorType(action.error) },
        pendingRequests: state.pendingRequests - 1,
      };
    case END_REQUEST:
      return {
        ...state,
        pendingRequests: state.pendingRequests - 1,
      };
    case ACK_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default reducer;
