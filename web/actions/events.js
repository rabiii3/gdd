import { prop } from 'ramda';
import api from '../../lib/api';
import { getToken, getIdUser } from '../selectors/auth';
import { requestError } from './core';
import { NOTIFICATIONS_OCCURED } from './notifications';
import { COMMENT_ADDED, COMMENT_UPDATED } from './comments';

export const LISTEN_EVENTS = 'events/LISTEN_EVENTS';
const DELETED = 'deleted';


export const listen = () => (dispatch, getState) => {
  dispatch({ type: LISTEN_EVENTS });
  const token = getToken(getState());
  const user = getIdUser(getState());

  const onError = err => {
    console.error(err); // eslint-disable-line no-console
    dispatch(requestError({ method: 'eventSource', type: 'commError' }));
  };
  const onMessage = data => {
    const comment = prop('comment')(data)
    if ((data.type === COMMENT_ADDED || data.type === COMMENT_UPDATED) && prop('event')(comment) !== DELETED && prop('createdBy')(comment) !== user) {
      dispatch({ type: NOTIFICATIONS_OCCURED, data })
    }
    dispatch(data);
  };
  api.events.listen({ token, onError, onMessage });
};
