import reducer from '../config';

describe('web | reducers | config', () => {

  const state = { 
    mode:'APP',
    google:{clientId:'123abc'},
    firebase:{messagingSenderId:'321cba'},
    env: 'development',
    isProduction: false,
    locale: 'fr',
    tenant:{key:'dev', label: 'Development',
    country:'FR'}  
  };

  it('should return the initial state', () => {
    expect(reducer(state, {})).toEqual(state);
  });
});