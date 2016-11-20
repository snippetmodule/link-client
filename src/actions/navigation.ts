

import { Action } from './types';

type Tab = 'schedule' | 'my-schedule' | 'map' | 'notifications' | 'info';

export function switchTab(tab: Tab): Action {
    return {
        type: 'SWITCH_TAB',
        tab: tab,
    };
}

export function switchDa(day: 1 | 2): Action {
    return {
        type: 'SWITCH_DAY',
        day: day,
    };
}
