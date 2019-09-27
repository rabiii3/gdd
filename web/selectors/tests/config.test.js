import { getTitle, getCountry, getCountries } from '../config';

describe('web | selectors | config', () => {
  describe('getTitle', () => {
    it('should select title', () => {
      const state = {
        config: {
          title: 'Koopt by redpelicans',
        },
      };
      expect(getTitle(state)).toEqual('Koopt by redpelicans');
    });
  });
  describe('getCountry', () => {
    it('should select country', () => {
      const state = {
        config: {
          country: 'FR',
        },
      };
      expect(getCountry(state)).toEqual('FR');
    });
  });
  describe('getCountries', () => {
    it('should select getCountries', () => {
      const state = {
        config: {
          allowcountries: ['FR', 'DE', 'MA'],
        },
      };
      expect(getCountries(state)).toEqual(['FR', 'DE', 'MA']);
    });
  });
});
