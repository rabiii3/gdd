import configureStore from '../../store/configureStore.test';
import { update, PERSON_UPDATED } from '../people';
import { getLoggedPerson } from '../../selectors/people';

const initialState = {
  people: { data: { 2: { _id: 2, firstname: 'slim' }, 3: { _id: 3, firstname: 'eric' } } },
  auth: { user: { _id: '2' } },
};
const updates = {
  _id: 2,
  firstname: 'david',
  lastname: 'Beckham',
  email: 'eric.basley@redpelicans.com',
  color: 'blue',
};
describe('web | actions | people', () => {
  describe('update person', () => {
    it('should dispatch update person', () => {
      const hook = {
        [PERSON_UPDATED]: getState => {
          const state = getState();
          expect(getLoggedPerson(state).firstname).toEqual('david');
        },
      };
      const store = configureStore(initialState, hook);
      store.dispatch(update(updates));
    });
  });
});
