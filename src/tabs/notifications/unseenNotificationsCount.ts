import { Notification, SeenNotifications } from '../../reducers/notifications';
import { allNotifications } from './allNotifications';
let { createSelector } = require('reselect');


function unseenNotificationsCountImpl(notifications: Notification[], seen: SeenNotifications): number {
    return notifications.filter((notification) => !seen[notification.id]).length;
}

export let unseenNotificationsCount = createSelector(
    allNotifications,
    (store) => store.notifications.seen,
    unseenNotificationsCountImpl,
);
