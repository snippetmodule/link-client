
import *as ReactNative from 'react-native';
const Parse = require('parse/react-native');

import { restoreSchedule, loadFriendsSchedules } from './schedule';
import { updateInstallation } from './installation';
import { loadSurveys } from './surveys';

// const FacebookSDK = require('FacebookSDK');
import { Action, ThunkAction } from './types';

async function ParseFacebookLogin(scope): Promise<any> {
    return new Promise((resolve, reject) => {
        Parse.FacebookUtils.logIn(scope, {
            success: resolve,
            error: (user, error) => reject(error && error.error || error),
        });
    });
}

async function queryFacebookAPI(path, ...args): Promise<any> {
    return new Promise((resolve, reject) => {
        // FacebookSDK.api(path, ...args, (response) => {
        //     if (response && !response.error) {
        //         resolve(response);
        //     } else {
        //         reject(response && response.error);
        //     }
        // });
        // TODO resolve sucess
        resolve();
    });
}

async function _logInWithFacebook(source?: string): Promise<any> {
    await ParseFacebookLogin('public_profile,email,user_friends');
    const profile = await queryFacebookAPI('/me', { fields: 'name,email' });

    const user = await Parse.User.currentAsync();
    user.set('facebook_id', profile.id);
    user.set('name', profile.name);
    user.set('email', profile.email);
    await user.save();
    await updateInstallation({ user });

    const action = {
        type: 'LOGGED_IN',
        source,
        data: {
            id: profile.id,
            name: profile.name,
            sharedSchedule: user.get('sharedSchedule'),
        },
    };

    return Promise.all([
        Promise.resolve(action),
        restoreSchedule(),
    ]);
}

export function logInWithFacebook(source?: string): ThunkAction {
    return (dispatch) => {
        const login = _logInWithFacebook(source);

        // Loading friends schedules shouldn't block the login process
        login.then(
            (result) => {
                dispatch(result);
                dispatch(loadFriendsSchedules());
                dispatch(loadSurveys());
            }
        );
        return login;
    };
}

export function skipLogin(): Action {
    return {
        type: 'SKIPPED_LOGIN',
    };
}

export function logOut(): ThunkAction {
    return (dispatch) => {
        Parse.User.logOut();
        // FacebookSDK.logout();
        updateInstallation({ user: null, channels: [] });

        // TODO: Make sure reducers clear their state
        return dispatch({
            type: 'LOGGED_OUT',
        });
    };
}

export function logOutWithPrompt(): ThunkAction {
    return (dispatch, getState) => {
        let name = getState().user.name || 'there';

        if (ReactNative.Platform.OS === 'ios') {
            ReactNative.ActionSheetIOS.showActionSheetWithOptions(
                {
                    title: `Hi, ${name}`,
                    options: ['Log out', 'Cancel'],
                    destructiveButtonIndex: 0,
                    cancelButtonIndex: 1,
                },
                (buttonIndex) => {
                    if (buttonIndex === 0) {
                        dispatch(logOut());
                    }
                }
            );
        } else {
            ReactNative.Alert.alert(
                `Hi, ${name}`,
                'Log out from F8?',
                [
                    { text: 'Cancel' },
                    { text: 'Log out', onPress: () => dispatch(logOut()) },
                ]
            );
        }
    };
}

// module.exports = {logInWithFacebook, skipLogin, logOut, logOutWithPrompt};
