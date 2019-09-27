import { root, getPeople, getLoggedPerson, getPeopleValues, getSearchedPeople, getSearchQuery } from '../people';

describe('web | selectors | people', () => {
  describe('root', () => {
    it('should select root', () => {
      const state = {
        people: 'toto',
      };
      expect(root(state)).toEqual('toto');
    });
  });
  describe('getPeople', () => {
    it('should select data', () => {
      const state = {
        people: {
          data: 'coco',
        },
      };
      expect(getPeople(state)).toEqual('coco');
    });
  });
  describe('getLoggedPerson', () => {
    it('should select getLoggedPerson', () => {
      const state = {
        people: {
          data: {
            bac98a9c14b2d001c6bad22: {
              person: 'mari',
              _id: 'bac98a9c14b2d001c6bad22',
            },
          },
        },

        auth: {
          user: {
            _id: 'bac98a9c14b2d001c6bad22',
          },
        },
      };
      expect(getLoggedPerson(state)).toEqual({ _id: 'bac98a9c14b2d001c6bad22', person: 'mari' });
    });
  });
  describe('getPeopleValues', () => {
    it('should select getPeopleValues', () => {
      const state = {
        people: {
          data: {
            bac98a9c14b2d001c6bad22: {
              person: 'mari',
              _id: 'bac98a9c14b2d001c6bad22',
            },
          },
        },
      };
      expect(getPeopleValues(state)[0].person).toEqual('mari');
    });
  });
  describe('getSearchQuery', () => {
    it('should select term', () => {
      const state = { people: { query: 'test' } };
      expect(getSearchQuery(state)).toEqual('test');
    });
  });

  describe('getSearchedPeople', () => {
    it('should search in people', () => {
      const state = {
        people: {
          data: {
            bac98a9c14b2d001c6bad22: {
              firstname: 'test',
              lastname: 'abc',
              _id: 'bac98a9c14b2d001c6bad22',
            },
            bac98a9c14b2d001c6bad23: {
              person: 'mari',
              lastname: 'abc',
              _id: 'bac98a9c14b2d001c6bad23',
            },
          },
          query: 'test',
        },
      };
      expect(getSearchedPeople(state, getSearchQuery(state))).toHaveLength(1);

    });
  });
});
