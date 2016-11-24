

import { Parse } from 'parse/react-native';
// const {AppEventsLogger} = require('react-native-fbsdk');

import { Action } from '../actions/types';
function log(type: string, typeNumber: number, params?: any) {
    console.log('type:' + type);
}
export default function track(action: Action): void {
    switch (action.type) {
        case 'LOGGED_IN':
            log('Login', 1, { source: action.source || '' });
            break;

        case 'LOGGED_OUT':
            log('Logout', 1);
            break;

        case 'SKIPPED_LOGIN':
            log('Skip login', 1);
            break;

        case 'SESSION_ADDED':
            Parse.Analytics.track('addToSchedule', { id: action.id });
            log('Added To Schedule', 1, { id: action.id });
            break;

        case 'SESSION_REMOVED':
            Parse.Analytics.track('removeFromSchedule', { id: action.id });
            log('Removed From Schedule', 1, { id: action.id });
            break;

        case 'TURNED_ON_PUSH_NOTIFICATIONS':
            log('Enabled Push', 1);
            break;

        case 'SKIPPED_PUSH_NOTIFICATIONS':
            log('Disabled Push', 1);
            break;

        case 'SET_SHARING':
            log(action.enabled ? 'Enabled Sharing' : 'Disabled Sharing', 1);
            break;

        case 'APPLY_TOPICS_FILTER':
            log('Filtered', 1);
            break;
        default:
            break;
    }
}
