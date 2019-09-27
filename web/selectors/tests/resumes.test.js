import {
  getResumes,
  getResumeById,
  getSortMode,
  getFilteredAndSortedResumes,
  getSearchQuery,
  getResumesCountByPersonId,
  getSkillsFilter,
  getResumesSkills,
  getSortedResumesSkills,
} from '../resumes';

describe('web | selectors | comments', () => {
  describe('getResumes', () => {
    it('should select resumes', () => {
      const state = { resumes: { data: [{ _id: 1 }] } };
      expect(getResumes(state)[0]._id).toEqual(1);
    });
  });
  describe('getResumeById', () => {
    it('should select resumes by id', () => {
      const state = {
        resumes: { data: [{ _id: 1 }, { _id: 2 }] },
      };
      expect(getResumeById(2)(state)._id).toEqual(2);
    });
  });
  describe('getResumesByPersonId', () => {
    it('should select resumes by id person', () => {
      const state = {
        resumes: { data: [{ _id: 1 }, { _id: 2 }, { _id: 2 }] },
      };
      expect(getResumeById(2)(state)._id).toEqual(2);
    });
  });

  describe('getSearchQuery', () => {
    it('should select term', () => {
      const state = { resumes: { query: 'test' } };
      expect(getSearchQuery(state)).toEqual('test');
    });
  });

  describe('getSortMode', () => {
    it('should select sorts', () => {
      const state = { resumes: { sort: { sortBy: 'status', direction: 'asc' } }, data: [] };
      expect(getSortMode(state).sortBy).toEqual('status');
      expect(getSortMode(state).direction).toEqual('asc');
    });
  });

  describe('getFilteredAndSortedResumes', () => {
    it("should get Resumes sorted by status'scardinality", () => {
      const state = {
        resumes: {
          data: [
            { firstname: 'test', status: 'b' },
            { firstname: 'test', status: 'b' },
            { firstname: 'test', status: 'c' },
            { status: 'c' },
            { status: 'c' },
            { status: 'c' },
          ],
          query: 'test',
        },
      };
      expect(getFilteredAndSortedResumes(state)).toHaveLength(3);
    });
  });

  describe('getResumesCountByPersonId', () => {
    it('should get Resumes count for a person', () => {
      const state = {
        resumes: {
          data: [
            { createdBy: '1', firstname: 'test', status: 'a' },
            { createdBy: '2', firstname: 'test', status: 'b' },
            { createdBy: '1', firstname: 'test', status: 'c' },
            { createdBy: '1', firstname: 'test', status: 'd' },
            { createdBy: '3', firstname: 'test', status: 'e' },
            { createdBy: '1', firstname: 'test', status: 'f' },
          ],
        },
      };
      expect(getResumesCountByPersonId('1')(state)).toEqual(4);
    });
  });
  describe('getSkillsFilter', () => {
    it('should select skillsFilter', () => {
      const state = { resumes: { skillsFilter: 'a' } };
      expect(getSkillsFilter(state)).toEqual('a');
    });
  });
});
