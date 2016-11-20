import * as React from 'react';
import *as ReactNative from 'react-native';
import { connect } from 'react-redux';
import * as Common from '../../base/common';

import { Session } from '../../reducers/sessions';

export function findSessionByURI(sessions: Array<Session>, uri?: string): Session {
    if (!uri) {
        return null;
    }
    let slug = uri.replace('f8://', '');
    for (let i = 0; i < sessions.length; i++) {
        let session = sessions[i];
        if (session.slug === slug || session.id === slug) {
            return session;
        }
    }
    return null;
}
