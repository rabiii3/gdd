import { getUser, getToken, getIdUser } from '../auth';

describe('web | selectors | auth', () => {
  describe('getUser', () => {
    it('should select user', () => {
      const state = {
        auth: {
          user: {
            firstname: 'firstname',
            lastname: 'lastname',
          },
        },
      };
      expect(getUser(state).firstname).toEqual('firstname');
    });
  });
  describe('getToken', () => {
    it('should select token', () => {
      const state = {
        auth: {
          token: 'ehfuiwhiugh3247rjrg',
        },
      };
      expect(getToken(state)).toEqual('ehfuiwhiugh3247rjrg');
    });
  });
  describe('getIdUser', () => {
    it('should select Id', () => {
      const state = {
        auth: {
          user: {
            firstname: 'firstname',
            lastname: 'lastname',
            _id: '5bac98a9c14b2d001c6bad22',
          },
        },
      };
      expect(getIdUser(state)).toEqual('5bac98a9c14b2d001c6bad22');
    });
  });
});
