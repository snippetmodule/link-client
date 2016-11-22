import { combineReducers } from 'redux';

import { config } from './config';
import { notifications } from './notifications';
import { maps } from './maps';
import { sessions } from './sessions';
import { user } from './user';
import { schedule } from './schedule';
import { topics } from './topics';
import { filter } from './filter';
import { navigation } from './navigation';
import { friendsSchedules } from './friendsSchedules';
import { surveys } from './surveys';


export let reducers = combineReducers({
    config: config,
    notifications: notifications,
    maps: maps,
    sessions: sessions,
    user: user,
    schedule: schedule,
    topics: topics,
    filter: filter,
    navigation: navigation,
    friendsSchedules: friendsSchedules,
    surveys: surveys,
});
