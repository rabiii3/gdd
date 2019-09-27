import { defineMessages } from 'react-intl';

export default defineMessages({
  error: {
    id: 'pages.Error.error',
    defaultMessage: 'Oops!',
  },
  nodetail: {
    id: 'pages.Error.detailt',
    defaultMessage: 'Koopt cannot answer to your request, fix it and please try again.',
  },
  notenant: {
    id: 'pages.Error.notenant',
    defaultMessage: 'Koopt cannot answer your request, you must indicate a tenant value, fix it and please try again...',
  },
  outdatedtenant: {
    id: 'pages.Error.outdatedtenant',
    defaultMessage: 'Koopt cannot answer your request, tenant in use is outdated...',
  },
  cannot_proceed: {
    id: 'pages.Error.cannot_proceed',
    defaultMessage: 'Koopt do not understand your request...',
  },

});
