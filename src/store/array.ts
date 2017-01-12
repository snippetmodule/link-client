
export let array = (store) => (next) => (action) =>
    Array.isArray(action)
        ? action.map(next)
        : next(action);
