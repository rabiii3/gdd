import { getSkills, getSortedSkills } from '../skills';

describe('web | selectors | skills', () => {
  describe('root', () => {
    it('should select the skills ', () => {
      const state = {
        skills: {
          data: {
            'java': { _id: 'java', label: 'JAVA'},
            'php': { _id: 'php', label: 'PHP'},
            'angular': { _id: 'angular', label: 'ANGULAR'},
          }
        },
      };
      expect(getSkills(state)).toEqual(state.skills.data);
    });
  });
  describe('root', () => {
    it('should select the skills ordred in an array of object ', () => {
      const state = {
        skills: {
          data: {
            'java': { _id: 'java', label: 'JAVA'},
            'php': { _id: 'php', label: 'PHP'},
            'angular': { _id: 'angular', label: 'ANGULAR'},
          }
        },
      };
      expect(getSortedSkills(state)).toEqual([
            { _id: 'angular', label: 'ANGULAR'},
            { _id: 'java', label: 'JAVA'},
            { _id: 'php', label: 'PHP'},
        ]);
    });
  });
});
