import configureStore from '../../store/configureStore.test';
import { USER_LOGGED, login } from '../auth';
import { getUser } from '../../selectors/auth';
import { ROLE } from '../../../lib/models/people';

const initialState = {};
describe('web | actions', () => {
  describe('login', () => {
    it('should dispatch login', () => {
      const user = {
        firstname: 'Eric',
        lastname: 'Basley',
        email: 'eric.basley@redpelicans.com',
        color: 'blue',
        roles: [ROLE.admin],
      };

      const hook = {
        [USER_LOGGED]: getState => {
          const state = getState();
          expect(getUser(state)).toEqual(user);
        },
      };
      const store = configureStore(initialState, hook);
      store.dispatch(login(user));
    });
  });
});
