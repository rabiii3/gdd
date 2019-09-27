import reducer from '../tenants';
import { USER_LOGOUT } from '../../actions/auth';
import { TENANTS_LOADED, TENANT_ADDED, TENANT_UPDATED, TENANT_DELETED, SORT_TENANTS } from '../../actions/admin/tenants';

describe('web | reducers | tenants', () => {

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
  
  it('should load tenants', () => {
    const tenants = [
      {_id:'1'},
      {_id:'2'},
      {_id:'3'},
    ];
    expect(reducer(state, {type:TENANTS_LOADED, tenants})).toEqual(
      {...state, 
        data:{
          '1':{_id:'1'},
          '2':{_id:'2'},
          '3':{_id:'3'},
        }
      }
    );
  });

  it('should add tenant', () => {
    const tenant = {_id: '9'};
    expect(reducer(state, {type:TENANT_ADDED, tenant})).toEqual({...state, data:{
      '1':{_id:'1'},
      '2':{_id:'2'},
      '9':{_id:'9'},
    }});
  });

  it('should update tenant', () => {
    const updates = {_id: '2', name: 'tester'};
    expect(reducer(state, {type:TENANT_UPDATED, updates})).toEqual({...state, data:{
      '1':{_id:'1'},
      '2':{_id:'2', name:'tester'},
    }});
  });

  it('should delete tenant', () => {
    const tenant = {_id: '1'};
    expect(reducer(state, {type:TENANT_DELETED, tenant})).toEqual({...state, data:{
      '2':{_id:'2'}}
    });
  });

  it('should sort tenants', () => {
    const typeSort = 'TITLE';
    expect(reducer(state, {type:SORT_TENANTS, typeSort})).toEqual({...state, sort:{
      sortBy: 'TITLE', direction: 'desc'
    }});
  });

});