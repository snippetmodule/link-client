
import *as ReactNative from 'react-native';
import { Parse } from 'parse/react-native';
const logError = require('logError');

import { ThunkAction, Dispatch, DispatchAction } from './types';

const Maps = Parse.Object.extend('Maps');
const Notification = Parse.Object.extend('Notification');

function loadParseQuery(type: string, query: Parse.Query): ThunkAction {
    return (dispatch: Dispatch) => {
        return query.find({
            success: (list: any) => {
                // We don't want data loading to interfere with smooth animations
                ReactNative.InteractionManager.runAfterInteractions(() => {
                    // Flow can't guarantee {type, list} is a valid action
                    dispatch({ type, list } as DispatchAction);
                });
            },
            error: logError,
        });
    };
}

let Parses = {
    loadSessions: (): ThunkAction =>
        loadParseQuery(
            'LOADED_SESSIONS',
            new Parse.Query('Agenda')
                .include('speakers')
                .ascending('startTime')
        ),

    loadMaps: (): ThunkAction =>
        loadParseQuery('LOADED_MAPS', new Parse.Query(Maps)),

    loadNotifications: (): ThunkAction =>
        loadParseQuery('LOADED_NOTIFICATIONS', new Parse.Query(Notification)),
};
export {Parses}  