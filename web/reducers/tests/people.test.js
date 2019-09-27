import reducer from '../people';
import { PERSON_UPDATED } from '../../actions/people';

describe('web | reducers | people', () => {
  it('should reduce edited people', () => {
    const state = {
      data: {
        2: { _id: 2, firstname: 'slim' },
        3: { _id: 3, firstname: 'eric' },
      },
    };

    const action = { type: PERSON_UPDATED, person: { _id: 2, firstname: 'david' } };
    expect(reducer(state, action).data[2].firstname).toEqual('david');
  });
});
