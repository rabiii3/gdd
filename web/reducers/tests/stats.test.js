import reducer from '../stats';
import { USER_LOGOUT } from '../../actions/auth';
import { TENANT_STATS_LOADED } from '../../actions/admin/stats';

describe('web | reducers | stats', () => {

  const state = { 
    data:{
      '1':{_id:'1'},
      '2':{_id:'2'},
    }
  };

  it('should return the initial state', () => {
    expect(reducer(state, {})).toEqual(state);
  });

  it('should wipe data when user logout', () => {
    expect(reducer(state, {type:USER_LOGOUT})).toEqual({...state, data:{}});
  });
  
  it('should load stats', () => {
    const stats = [
      {_id:'1'},
      {_id:'2'},
      {_id:'3'},
    ];
    expect(reducer(state, {type:TENANT_STATS_LOADED, stats})).toEqual(
      {...state, 
        data:{
          '1':{_id:'1'},
          '2':{_id:'2'},
          '3':{_id:'3'},
        }
      }
    );
  });

});