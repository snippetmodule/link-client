import * as React from 'react';

export function assignProperty(object, key, value) {
    if (typeof object === 'object') {
        object[key] = value;
    }
    return object;
}