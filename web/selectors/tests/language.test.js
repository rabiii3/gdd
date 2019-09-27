import { getLocale } from '../language';

describe('web | selectors | language', () => {
  describe('getLocale', () => {
    it('should select locale language', () => {
      const state = {
        language: {},
      };

      expect(getLocale(state)).toEqual('en');
    });
  });
});

