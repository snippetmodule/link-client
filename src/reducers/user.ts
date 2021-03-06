
import { Action } from '../actions/types';

export type UserState = {
    isLoggedIn: boolean;
    hasSkippedLogin: boolean;
    sharedSchedule?: boolean;
    id?: string;
    name?: string;
};

const initialState = {
    isLoggedIn: false,
    hasSkippedLogin: false,
    sharedSchedule: null,
    id: null,
    name: null,
};

export function user(state: UserState = initialState, action: Action): UserState {
    if (action.type === 'LOGGED_IN') {
        let {id, name, sharedSchedule} = action.data;
        if (sharedSchedule === undefined) {
            sharedSchedule = null;
        }
        return {
            isLoggedIn: true,
            hasSkippedLogin: false,
            sharedSchedule,
            id,
            name,
        };
    }
    if (action.type === 'SKIPPED_LOGIN') {
        return {
            isLoggedIn: false,
            hasSkippedLogin: true,
            sharedSchedule: null,
            id: null,
            name: null,
        };
    }
    if (action.type === 'LOGGED_OUT') {
        return initialState;
    }
    if (action.type === 'SET_SHARING') {
        return {
            ...state,
            sharedSchedule: action.enabled,
        };
    }
    if (action.type === 'RESET_NUXES') {
        return { ...state, sharedSchedule: null };
    }
    return state;
}
