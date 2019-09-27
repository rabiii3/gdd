import { defineMessages } from 'react-intl';

export default defineMessages({
  hello: {
    id: 'pages.EmailReset.hello',
    defaultMessage: 'Hello, {name}!',
  },
  text1: {
    id: 'pages.EmailReset.text1',
    defaultMessage: 'Someone, hopefully you, has requested to reset the password for your Koopt account on ',
  },
  text2: {
    id: 'pages.EmailReset.text2',
    defaultMessage: 'If you did not perform this request, you can safely ignore this email.',
  },
  text3: {
    id: 'pages.EmailReset.text3',
    defaultMessage: 'Otherwise, click the link below to complete the process',
  },
  reset: {
    id: 'pages.EmailReset.reset',
    defaultMessage: 'Reset password',
  },
});
