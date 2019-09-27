import reducer from '../language';

describe('web | reducers | language', () => {

  const state = { 
    locale: 'en',
  };

  it('should return the initial state', () => {
    expect(reducer(state, {})).toEqual(state);
  });
});