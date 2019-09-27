import { any, test, reduce, toLower, indexOf } from 'ramda';
import { parsePhoneNumber } from 'libphonenumber-js';
import isValidDomain from 'is-valid-domain';
import api from '../../lib/api';
import adminApi from '../../lib/admin';

export const required = (message = 'required') => value => !value && message;
export const requiredSkills = (message = 'required') => value => !value || value && !value.length && message;
export const requiredSelect = message => value => value && !value[0] && message;
export const emailFormat = message => value => value && !test(/\S+@\S+\.\S+/, value) && message;
export const emailConfirmation = message => (email, values) => email !== values.email && message;
export const passwordConfirmation = message => (password, values) => password !== values.password && message;

export const skillSize = message => value => value && value.length > 30 && message

export const isValidKey = message => value => ((value !== toLower(value)) || (indexOf(' ', value) > -1) || !isValidDomain(`${value}.koopt.fr`))  && message

export const isPhoneNumber = (message, country) => value => {
  if (!value) return;
  try {
    return !parsePhoneNumber(value, country).isValid() && message;
  } catch (error) {
    return message
  }
}

export const minLength = (message, size) => value => value && value.length < size && message;

export const getCountryCode = phoneNumber => {
  try {
    const retPhone = parsePhoneNumber(phoneNumber)
    return (retPhone.countryCallingCode)
  }
  catch (error) {
    return (999)
  }
}

export const checkEmailUniqueness = message => async value => {
  try {
    await api.auth.checkEmailUniqueness({ email: value });
  } catch (err) {
    return message;
  }
};

export const isSkillExists = (message, skills) => value => any(({ label = '' }) => value.toLowerCase() === label.toLowerCase(), skills) && message;

export const composeValidators = (...validators) => (value, values) =>
  reduce((error, validator) => error || validator(value, values), undefined)(validators);

export const checkKeyValidity = message => async value => {
  try {
    await adminApi.tenants.checkKeyValidity({ key: value });
  } catch (err) {
    return message;
  }
};
  