

import * as ReactNative from 'react-native';
import { Parse } from 'parse/react-native';
import { env } from '../base/env';

import { Action, ThunkAction } from './types';

function testPlainPush(): ThunkAction {
    return () => Parse.Cloud.run('test_push');
}

function testLinkPush(): ThunkAction {
    return () => Parse.Cloud.run('test_push', { url: 'link' });
}

function testSessionPush(): ThunkAction {
    return () => Parse.Cloud.run('test_push', { url: 'session' });
}

function testSurveyPush(): ThunkAction {
    return () => Parse.Cloud.run('test_survey');
}

function testResetNuxes(): Action {
    return {
        type: 'RESET_NUXES',
    };
}

function testExportAppState(): ThunkAction {
    return (dispatch, getState) => {
        const subject = `App v${env.version} state`;
        const message = JSON.stringify(getState(), undefined, 2);
        if (ReactNative.Platform.OS === 'ios') {
            ReactNative.ActionSheetIOS.showShareActionSheetWithOptions({
                subject: subject,
                message: message,
            }, () => { }, () => { });
        } else {
            const SendIntentAndroid = require('react-native-send-intent');
            SendIntentAndroid.sendText({
                title: subject,
                text: message,
                type: SendIntentAndroid.TEXT_PLAIN
            });
        }
    };
}

export const TEST_MENU = {
    'Request a push notification': testPlainPush,
    'Push with link': testLinkPush,
    'Push with session': testSessionPush,
    'Request a survey': testSurveyPush,
    'Reset NUXes': testResetNuxes,
    'Get app state': testExportAppState,
};
