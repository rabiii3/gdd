import configureStore from '../../store/configureStore.test';
import { handleSearchInResumes, sortResumes, RESUMES_SORT, FILTER_RESUMES } from '../resumes';
import { getTerms } from '../../selectors/resumes';

const initialState = {
  resumes: {
    data: [
      {
        firstname: 'bbb',
        status: 'pending',
      },
      {
        firstname: 'aaa',
        status: 'accepted',
      },
    ],
    term: '',
    sort: { sortBy: 'status', direction: 'asc' },
  },
};

describe.skip('web | actions', () => {
  describe('filter', () => {
    it('should search term', done => {
      const term = 'bbb';
      const hook = {
        [FILTER_RESUMES]: getState => {
          const state = getState();
          expect(getTerms(state)).toEqual(initialState.resumes.data[0].firstname);
          done()
        },
      };
      const store = configureStore(initialState, hook);
      store.dispatch(handleSearchInResumes(term));
    });
  });

});
