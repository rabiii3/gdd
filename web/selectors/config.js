import { compose, path, equals } from 'ramda';
import MODE from '../utils/modes';

export const getTitle = path(['config', 'title']);
export const getTenant = path(['config', 'tenant', 'key']);
export const getUserToRegister = path(['config', 'user']);
export const getTenantLabel = path(['config', 'tenant', 'label']);
export const getLoginSiteUrl = path(['config', 'loginSiteUrl']);
export const getCountry = path(['config', 'country']);
export const getCountries = path(['config', 'allowcountries']);
export const getGoogleConfig = path(['config', 'google']);
export const getCaptchaSiteKey = path(['config', 'google', 'reCaptcha', 'sitekey']);
export const isLoginMode = compose(equals(MODE.LOGIN), path(['config', 'mode']));
export const getRedirectTo = path(['config', 'redirectTo']);
export const getFirebaseConfig = path(['config', 'firebase']);
export const getTenantSiteUrl = state => {
  if(window.location.hostname === 'localhost') {
    const tenant = getTenant(state);
    return `${window.location.origin}?tenant=${tenant}`;
  }
  return path(['config', 'tenant', 'siteUrl'])(state);
}
