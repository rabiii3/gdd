import { defineMessages } from 'react-intl';

export default defineMessages({
  hello: {
    id: 'pages.ResumeUpdated.hello',
    defaultMessage: 'Hello, {name}!',
  },
  update: {
    id: 'pages.ResumeUpdated.update',
    defaultMessage: "{candidate}'s resume has been updated by {author}.",
  },
  status: {
    id: 'pages.ResumeUpdated.status',
    defaultMessage: 'Status changed to "{status}".',
  },
  view: {
    id: 'pages.ResumeUpdated.view',
    defaultMessage: 'Click to view Resume.',
  },
});
