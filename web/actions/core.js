export const START_REQUEST = 'core/START_REQUEST';
export const END_REQUEST = 'core/END_REQUEST';
export const REQUEST_ERROR = 'core/REQUEST_ERROR';
export const ACK_ERROR = 'core/ACK_ERROR';
export const COMM_ERROR = 'commError';
export const AUTH_ERROR = 'authError';

export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });

export const requestError = ({ method, type, statusCode }) => ({
  type: REQUEST_ERROR,
  error: { method, type, statusCode },
});

export const ackError = () => ({ type: ACK_ERROR });
