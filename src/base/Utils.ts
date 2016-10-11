// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
export function isArray(arg) { return Array.isArray(arg); }

export function isBoolean(arg) {
    return typeof arg === 'boolean';
}

export function isNull(arg) {
    return arg === null;
}

export function isNullOrUndefined(arg) {
    return arg === null || arg === undefined;
}

export function isNumber(arg) {
    return typeof arg === 'number';
}

export function isString(arg) {
    return typeof arg === 'string';
}

export function isSymbol(arg) {
    return typeof arg === 'symbol';
}

export function isUndefined(arg) {
    return arg === undefined;
}

export function isRegExp(re) {
    return re !== null && typeof re === 'object' &&
        objectToString(re) === '[object RegExp]';
}

export function isObject(arg) {
    return arg !== null && typeof arg === 'object';
}

export function isDate(d) {
    return d !== null && typeof d === 'object' &&
        objectToString(d) === '[object Date]';
}

export function isError(e) {
    return e !== null && typeof e === 'object' &&
        (objectToString(e) === '[object Error]' || e instanceof Error);
}

export function isFunction(arg) {
    return typeof arg === 'function';
}

export function isPrimitive(arg) {
    return arg === null ||
        typeof arg !== 'object' && typeof arg !== 'function';
}

export function objectToString(o) {
    return Object.prototype.toString.call(o);
}