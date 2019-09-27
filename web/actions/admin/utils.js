import api from '../../../lib/admin';
import { startRequest, endRequest, requestError } from '../core';

export const request = (dispatch, ctx, { errorCode } = {}) => {
  const { method } = ctx;
  dispatch(startRequest());
  return api(ctx)
    .then(res => {
      dispatch(endRequest());
      return res;
    })
    .catch(err => {
      if (err.response) {
        const {
          data: { type },
          status,
        } = err.response;
        if (status === 403 || status === 401) dispatch({ type: 'auth/USER_LOGOUT' });
        else
          dispatch(
            requestError({
              method,
              type: errorCode || type,
              statusCode: status,
            }),
          );
      } else {
        dispatch(requestError({ method: ctx.method, errorCode }));
      }
      throw err;
    });
};
