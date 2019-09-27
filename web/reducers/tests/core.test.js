import reducer from '../core';
import { AUTH_ERROR, START_REQUEST, END_REQUEST, REQUEST_ERROR, ACK_ERROR } from '../../actions/core';

describe('web | reducers | core', () => {

  const state = { pendingRequests: 1 };

  it('should return the initial state', () => {
    expect(reducer(state, {})).toEqual(state);
  });
  
  it('should start request', () => {
    expect(reducer(state, {type:START_REQUEST})).toEqual({...state, pendingRequests: 2});
  });

  it('should request error', () => {
    const error = { method:'/core', type:AUTH_ERROR, statusCode:403};
    expect(reducer(state,{type:REQUEST_ERROR, error})).toEqual({
      ...state,
      error:{ id:1, method:'/core', statusCode:403, type:AUTH_ERROR},
      pendingRequests: 0
    })
  });

  it('should end request', () => {
    expect(reducer(state, {type:END_REQUEST})).toEqual({...state, pendingRequests: 0});
  });

  it('should wipe errors', () => {
    expect(reducer(state, {type:ACK_ERROR})).toEqual({...state, error: null});
  });

});