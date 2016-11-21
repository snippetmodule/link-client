
import *as ReactNative from 'react-native';
const Parse = require('parse/react-native');
const Share = require('react-native-share');
const Agenda = Parse.Object.extend('Agenda');
const {currentInstallation, updateInstallation} = require('./installation');

import { ThunkAction, PromiseAction, Dispatch } from './types';
import { Session } from '../reducers/sessions';

function addToSchedule(id: string): ThunkAction {
    return (dispatch: Dispatch) => {
        if (Parse.User.current()) {
            Parse.User.current().relation('mySchedule').add(new Agenda({ id }));
            Parse.User.current().save();
            currentInstallation().then((installation) => {
                installation.addUnique('channels', `session_${id}`);
                return installation.save();
            });
        }
        dispatch({
            type: 'SESSION_ADDED',
            id,
        });
    };
}

function removeFromSchedule(id: string): ThunkAction {
    return (dispatch: Dispatch) => {
        if (Parse.User.current()) {
            Parse.User.current().relation('mySchedule').remove(new Agenda({ id }));
            Parse.User.current().save();
            currentInstallation().then((installation) => {
                installation.remove('channels', `session_${id}`);
                return installation.save();
            });
        }
        dispatch({
            type: 'SESSION_REMOVED',
            id,
        });
    };
}

function removeFromScheduleWithPrompt(session: Session): ThunkAction {
    return (dispatch) => {
        if (ReactNative.Platform.OS === 'ios') {
            ReactNative.ActionSheetIOS.showActionSheetWithOptions({
                options: ['Remove From Schedule', 'Cancel'],
                destructiveButtonIndex: 0,
                cancelButtonIndex: 1,
            }, (buttonIndex) => {
                if (buttonIndex === 0) {
                    dispatch(removeFromSchedule(session.id));
                }
            });
        } else {
            ReactNative.Alert.alert(
                'Remove From Your Schedule',
                `Would you like to remove "${session.title}" from your schedule?`,
                [
                    { text: 'Cancel' },
                    {
                        text: 'Remove',
                        onPress: () => dispatch(removeFromSchedule(session.id))
                    },
                ]
            );
        }
    };
}

async function restoreSchedule(): PromiseAction {
    const list = await Parse.User.current().relation('mySchedule').query().find();
    const channels = list.map(({id}) => `session_${id}`);
    updateInstallation({ channels });

    return {
        type: 'RESTORED_SCHEDULE',
        list,
    };
}

async function loadFriendsSchedules(): PromiseAction {
    const list = await Parse.Cloud.run('friends');
    await ReactNative.InteractionManager.runAfterInteractions();
    return {
        type: 'LOADED_FRIENDS_SCHEDULES',
        list,
    };
}

function setSharingEnabled(enabled: boolean): ThunkAction {
    return (dispatch) => {
        dispatch({
            type: 'SET_SHARING',
            enabled,
        });
        Parse.User.current().set('sharedSchedule', enabled);
        Parse.User.current().save();
    };
}

function shareSession(session: Session): ThunkAction {
    return (dispatch, getState) => {
        const {sessionURLTemplate} = getState().config;
        const url = sessionURLTemplate
            .replace('{slug}', session.slug)
            .replace('{id}', session.id);

        if (ReactNative.Platform.OS === 'ios') {
            ReactNative.ActionSheetIOS.showShareActionSheetWithOptions({
                message: session.title,
                url,
            }, (e) => console.error(e), logShare.bind(null, session.id));
        } else {
            Share.open({
                share_text: session.title,
                share_URL: url,
                title: 'Share Link to ' + session.title,
            }, (e) => logShare(session.id, true, null));
        }
    };
}

function logShare(id, completed, activity) {
    // AppEventsLogger.logEvent('Share Session', 1, { id });
    Parse.Analytics.track('share', {
        id,
        completed: completed ? 'yes' : 'no',
        activity: activity || '?',
    });
}

export {
    shareSession,
    addToSchedule,
    removeFromSchedule,
    restoreSchedule,
    loadFriendsSchedules,
    setSharingEnabled,
    removeFromScheduleWithPrompt,
};
