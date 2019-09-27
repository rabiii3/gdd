import reducer from '../tenantPeople';
import { USER_LOGOUT } from '../../actions/auth';
import { PEOPLE_LOADED, SORT_PEOPLE } from '../../actions/admin/people';

describe('web | reducers | tenantPeople', () => {

  const state = { 
    data:{
      '1':{_id:'1'},
      '2':{_id:'2'},
    },
    sort:{
      sortBy: 'KEY', direction: 'asc'
      }
    };

  it('should return the initial state', () => {
    expect(reducer(state, {})).toEqual(state);
  });

  it('should wipe data when user logout', () => {
    expect(reducer(state, {type:USER_LOGOUT})).toEqual({...state, data:{}});
  });
  
  it('should load tenant users', () => {
    const people = [
      {_id:'1'},
      {_id:'2'},
      {_id:'3'},
    ];
    expect(reducer(state, {type:PEOPLE_LOADED, people})).toEqual(
      {...state, 
        data:{
          '1':{_id:'1'},
          '2':{_id:'2'},
          '3':{_id:'3'},
        }
      }
    );
  });

  it('should sort tenant users', () => {
    const typeSort = 'TITLE';
    expect(reducer(state, {type:SORT_PEOPLE, typeSort})).toEqual({...state, sort:{
      sortBy: 'TITLE', direction: 'desc'
    }});
  });

});