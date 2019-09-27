import reducer from '../notifications';
import { USER_LOGOUT } from '../../actions/auth';
import { NOTIFICATIONS_OCCURED, NOTIFICATIONS_REMOVED, ALREADY_READ_NOTIFICATIONS } from '../../actions/notifications';

describe('web | reducers | notifications', () => {

  const state = { 
    data:[
      {_id:'1', message:'msg1', alreadyRead:false},
      {_id:'2', message:'msg2', alreadyRead:true}
    ]
  };

  it('should return the initial state', () => {
    expect(reducer(state, {})).toEqual(state);
  });

  it('should wipe notifications when user logout', () => {
    expect(reducer(state, {type:USER_LOGOUT})).toEqual({...state, data:[]});
  });

  it('should add notification', () => {
    const data = {comment:{_id:'3', message:'msg3', alreadyRead:false}};
    expect(reducer(state, {type:NOTIFICATIONS_OCCURED, data})).toEqual({data:[
      {_id:'1',message:'msg1', alreadyRead:false},
      {_id:'2',message:'msg2', alreadyRead:true},
      {_id:'3',message:'msg3', alreadyRead:false},
    ]});
  });

  it('should remove notifications', () => {
    expect(reducer(state, {type:NOTIFICATIONS_REMOVED})).toEqual({data:[]});
  });

  it('should mark notifications as readed', () => {
    const id = '1';
    expect(reducer(state, {type:ALREADY_READ_NOTIFICATIONS,id})).toEqual({data:[
      {_id:'1', message:'msg1', alreadyRead:true},
      {_id:'2', message:'msg2', alreadyRead:true}
    ]});
  });
});