export const NOTIFICATIONS_OCCURED = 'notifications/NOTIFICATIONS_OCCURED';
export const NOTIFICATIONS_REMOVED = 'notifications/NOTIFICATIONS_REMOVED';
export const ALREADY_READ_NOTIFICATIONS = 'notifications/ALREADY_READ_NOTIFICATIONS';


export const removeNotifications = () => ({ type: NOTIFICATIONS_REMOVED });
export const alreadyRead = id => ({ type: ALREADY_READ_NOTIFICATIONS, id });
