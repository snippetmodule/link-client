
import { Action } from '../actions/types';

type Convert<T> = (object: Object) => T;
type Reducer<T> = (state: Array<T>, action: Action) => Array<T>;

export function createParseReducer<T>(
    type: string,
    convert: Convert<T>
): Reducer<T> {
    return (state: Array<T>, action: Action): Array<T> => {
        if (action.type === type) {
            // Flow can't guarantee {type, list} is a valid action
            return (action as any).list.map(convert);
        }
        return state || [];
    };
}
