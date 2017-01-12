
import track from './track';
export let analytics = (store) => (next) => (action) => {
    track(action);
    return next(action);
};
