import reducer from '../resumes';
import { RESUME_UPDATED, RESUMES_SORT} from '../../actions/resumes';

jest.mock('axios', () => ({
  post: (endpoint, body) => Promise.resolve({ data: { user: body, token: 'TOKEN' } }),
}));

describe('web | reducers | resumes', () => {
  it('should reduce edited resume', () => {
    const state = { data: [{ _id: 0, firstname: 'a' }] };
    const updates = { _id: 0, firstname: 'b' };
    const action = { type: RESUME_UPDATED, updates };
    expect(reducer(state, action).data[0].firstname).toEqual('b');
  });

  it('should edite sort', () => {
    const type='status';
    const state = { data: [],sort:{sortBy:type, direction:'asc'} };
    const action = { type: RESUMES_SORT };
    expect(reducer(state, action).sort.direction).toEqual('desc') && expect(reducer(state, action).sort.sortBy).toEqual(type) ;
  });


});
