import reducer from '../comments';
import { USER_LOGOUT } from '../../actions/auth';
import { COMMENTS_LOADED, COMMENT_ADDED, COMMENT_DELETED, COMMENT_UPDATED } from '../../actions/comments';

describe('web | reducers | comments', () => {

  const state = { 
    data:{
      '1':{_id:'1'},
      '2':{_id:'2'},
    },
  };

  it('should return the initial state', () => {
    expect(reducer(state, {})).toEqual(state);
  });

  it('should wipe data when user logout', () => {
    expect(reducer(state, {type:USER_LOGOUT})).toEqual({...state, data:{}});
  });
  
  it('should load comments', () => {
    const comments = [
      {_id:'1'},
      {_id:'2'},
      {_id:'3'},
    ];
    expect(reducer(state, {type:COMMENTS_LOADED, comments})).toEqual(
      {...state, 
        data:{
          '1':{_id:'1'},
          '2':{_id:'2'},
          '3':{_id:'3'},
        }
      }
    );
  });

  it('should add comment', () => {
    const comment = {_id: '9'};
    expect(reducer(state, {type:COMMENT_ADDED, comment})).toEqual({...state, data:{
      '1':{_id:'1'},
      '2':{_id:'2'},
      '9':{_id:'9'},
    }});
  });

  it('should update comment', () => {
    const comment = {_id: '2', name: 'tester'};
    expect(reducer(state, {type:COMMENT_UPDATED, comment})).toEqual({...state, data:{
      '1':{_id:'1'},
      '2':{_id:'2', name:'tester'},
    }});
  });

  it('should delete comment', () => {
    const comment = {_id: '1'};
    expect(reducer(state, {type:COMMENT_DELETED, comment})).toEqual({...state, data:{
      '2':{_id:'2'}}
    });
  });

});