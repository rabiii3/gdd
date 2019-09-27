import { defineMessages } from 'react-intl';

export default defineMessages({
  or: {
    id: 'components.LoginForm.or',
    defaultMessage: 'OR set your password and update form bellow',
  },
  register: {
    id: 'components.LoginForm.register',
    defaultMessage: 'FInalize Registration',
  },
  errorRegister: {
    id: 'components.LoginForm.registerForm.errorRegister',
    defaultMessage: 'Cannot register user',
  },
  email: {
    id: 'components.LoginForm.signInForm.email',
    defaultMessage: 'Email',
  },
  password: {
    id: 'components.LoginForm.signInForm.password',
    defaultMessage: 'Password',
  },
  firstname: {
    id: 'components.LoginForm.registerForm.firstname',
    defaultMessage: 'First name',
  },
  lastname: {
    id: 'components.LoginForm.registerForm.lastname',
    defaultMessage: 'Last name',
  },
  requiredValidation: {
    id: 'components.LoginForm.required',
    defaultMessage: 'Required',
  },
  passwordValidation: {
    id: 'components.LoginForm.passwordLenght',
    defaultMessage: 'Minimum length is 8 characters',
  },
});
