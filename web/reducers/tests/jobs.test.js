import reducer from '../jobs';
import { USER_LOGOUT } from '../../actions/auth';
import { JOBS_LOADED, JOB_ADDED, JOB_DELETED, JOB_UPDATED, SORT_JOBS } from '../../actions/jobs';

describe('web | reducers | jobs', () => {

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
  
  it('should load jobs', () => {
    const jobs = [
      {_id:'1'},
      {_id:'2'},
      {_id:'3'},
    ];
    expect(reducer(state, {type:JOBS_LOADED, jobs})).toEqual(
      {...state, 
        data:{
          '1':{_id:'1'},
          '2':{_id:'2'},
          '3':{_id:'3'},
        }
      }
    );
  });

  it('should add job', () => {
    const job = {_id: '9'};
    expect(reducer(state, {type:JOB_ADDED, job})).toEqual({...state, data:{
      '1':{_id:'1'},
      '2':{_id:'2'},
      '9':{_id:'9'},
    }});
  });

  it('should update job', () => {
    const updates = {_id: '2', name: 'tester'};
    expect(reducer(state, {type:JOB_UPDATED, updates})).toEqual({...state, data:{
      '1':{_id:'1'},
      '2':{_id:'2', name:'tester'},
    }});
  });

  it('should delete job', () => {
    const job = {_id: '1'};
    expect(reducer(state, {type:JOB_DELETED, job})).toEqual({...state, data:{
      '2':{_id:'2'}}
    });
  });

  it('should sort jobs', () => {
    const typeSort = 'TITLE';
    expect(reducer(state, {type:SORT_JOBS, typeSort})).toEqual({...state, sort:{
      sortBy: 'TITLE', direction: 'desc'
    }});
  });

});