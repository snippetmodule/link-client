
import { Action } from '../actions/types';

export type ScheduleState = {
    [id: string]: boolean;
};

export function schedule(state: ScheduleState = {}, action: Action): ScheduleState {
    switch (action.type) {
        case 'SESSION_ADDED':
            let added = {};
            added[action.id] = true;
            return { ...state, ...added };

        case 'SESSION_REMOVED':
            let rest = { ...state };
            delete rest[action.id];
            return rest;

        case 'LOGGED_OUT':
            return {};

        case 'RESTORED_SCHEDULE':
            let all = {};
            action.list.forEach((session) => {
                all[session.id] = true;
            });
            return all;
        default:
            return state;
    }
}
