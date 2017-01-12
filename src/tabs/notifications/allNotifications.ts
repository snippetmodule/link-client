
import { Notification } from '../../reducers/notifications';
let { createSelector } = require('reselect');

// Merges lists of notifications from server and notifications
// received via push and makes sure there is no duplicates.
function mergeAndSortByTime(server: Notification[], push: Notification[]): Notification[] {
  let uniquePush = push.filter((pushNotification) => {
    let existsOnServer = server.find(
      (serverNotification) => serverNotification.text === pushNotification.text
    );
    return !existsOnServer;
  });

  let all = [].concat(server, uniquePush);
  return all.sort((a, b) => b.time - a.time);
}

export let allNotifications = createSelector(
  (store) => store.notifications.server,
  (store) => store.notifications.push,
  mergeAndSortByTime
);
