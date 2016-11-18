
import { Action } from '../actions/types';

export type FriendFilter = {
    id: string;
    name: string;
    schedule: { [key: string]: boolean };
};

export type TopicsFilter = {
    [key: string]: boolean;
};

type State = TopicsFilter;

export function filter(state: State = {}, action: Action): State {
    if (action.type === 'APPLY_TOPICS_FILTER') {
        return action.topics;
    }
    if (action.type === 'CLEAR_FILTER') {
        return {};
    }
    return state;
}

