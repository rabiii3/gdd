import { pathOr } from 'ramda';

const DEFAULT_LOCALE = 'en';
export const getLocale = pathOr(DEFAULT_LOCALE, ['language', 'locale']);
