import { getLocation } from '../router';

describe('web | selectors | router', () => {
  describe('getLocation', () => {
    it('should select location', () => {
      const state = {
        router: {
          location: {
            pathname: '/resumes',
          },
        },
      };
      expect(getLocation(state)).toEqual({ pathname: '/resumes' });
    });
  });
});
