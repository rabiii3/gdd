import reducer from '../skills';
import { USER_LOGOUT } from '../../actions/auth';
import { SKILL_ADDED, SKILL_DELETED, SKILLS_LOADED, SKILL_UPDATED } from '../../actions/skills';

describe('web | reducers | skills', () => {

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
  
  it('should load skills', () => {
    const skills = [
      {_id:'1'},
      {_id:'2'},
      {_id:'3'},
    ];
    expect(reducer(state, {type:SKILLS_LOADED, skills})).toEqual(
      {...state, 
        data:{
          '1':{_id:'1'},
          '2':{_id:'2'},
          '3':{_id:'3'},
        }
      }
    );
  });

  it('should add skill', () => {
    const skill = {_id: '9'};
    expect(reducer(state, {type:SKILL_ADDED, skill})).toEqual({...state, data:{
      '1':{_id:'1'},
      '2':{_id:'2'},
      '9':{_id:'9'},
    }});
  });

  it('should update skill', () => {
    const skill = {_id: '2', name: 'tester'};
    expect(reducer(state, {type:SKILL_UPDATED, skill})).toEqual({...state, data:{
      '1':{_id:'1'},
      '2':{_id:'2', name:'tester'},
    }});
  });

  it('should delete skill', () => {
    const skill = {_id: '1'};
    expect(reducer(state, {type:SKILL_DELETED, skill})).toEqual({...state, data:{
      '2':{_id:'2'}}
    });
  });

});