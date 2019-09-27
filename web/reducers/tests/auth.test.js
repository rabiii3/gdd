import { USER_LOGGED, USER_LOGOUT, login, logout } from '../../actions/auth';
import { getUser, getToken } from '../../selectors/auth';
import configureStore from '../../store/configureStore.test';

jest.mock('axios', () => ({
  post: (endpoint, body) => Promise.resolve({ data: { user: body, token: 'TOKEN' } }),
}));

describe('server | reducers | auth', () => {
  describe('check login action', () => {
    it('should log user', done => {
      const initialState = { };
      const user = { email: 'EMAIL', password: 'PASSWORD' };
      const hook = {
        [USER_LOGGED]: getState => {
          const state = getState();
          expect(getUser(state)).toEqual(user);
          expect(getToken(state)).toEqual('TOKEN');
          done();
        },
      };
      const store = configureStore(initialState, hook);
      store.dispatch(login(user));
    });
  });
  describe('check logout action', () => {
    it('should logout user', () => {
      const initialState = {
        auth: {
          token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1N',
          user: {
            lastname: 'aaaa',
            firstname: 'bbbb',
          },
        },
      };
      const hook = {
        [USER_LOGOUT]: getState => {
          const state = getState();
          expect(getUser(state)).toEqual(undefined);
          expect(getToken(state)).toEqual(undefined);
        },
      };
      const store = configureStore(initialState, hook);
      store.dispatch(logout());
    });
  });
  /*
    describe('check register action', () => {
      it('should register user', () => {
        const initialState = {}
        const hook = {
          [USER_REGISTER]: getState => {
            const state = getState()
            expect((state).userRegistered).toMatchObject(userRegistered)
          }
        }
        const store = configureStore(initialState, hook)
        store.dispatch(register())
      })
    })
    */
});
