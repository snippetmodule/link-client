import { Action } from './types';

type Tab = 'schedule' | 'my-schedule' | 'map' | 'notifications' | 'info';

export type BackListener = () => boolean;

export type NavigationChildContextType = {
    addBackButtonListener: (listener: BackListener) => void;
    removeBackButtonListener: (listener: BackListener) => void;
};

export function switchTab(tab: Tab): Action {
    return {
        type: 'SWITCH_TAB',
        tab: tab,
    };
}

export function switchDay(day: 1 | 2): Action {
    return {
        type: 'SWITCH_DAY',
        day: day,
    };
}
