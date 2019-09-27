import { root, getError, hasSignInError, hasRegisterError } from '../core';

describe('web | selectors | core', () => {
  describe('root', () => {
    it('should select the value of core', () => {
      const state = {
        core: {
          error: {
            method: 'auth:signIn',
          },
        },
      };
      expect(root(state)).toEqual({ error: { method: 'auth:signIn' } });
    });
  });
  describe('getError', () => {
    it('should select the error value in comments', () => {
      const state = {
        core: {
          error: {
            method: 'auth:signIn',
          },
        },
      };
      expect(getError(state)).toEqual({ method: 'auth:signIn' });
    });
  });
  describe('hasSignInError', () => {
    it('should select auth:signIn', () => {
      const state = {
        core: {
          error: {
            method: 'auth:signIn',
          },
        },
      };
      expect(hasSignInError(state)).toEqual(true);
    });
  });
  describe('hasRegisterError', () => {
    it('should select auth:register', () => {
      const state = {
        core: {
          error: {
            method: 'auth:register',
          },
        },
      };
      expect(hasRegisterError(state)).toEqual(true);
    });
  });
});
