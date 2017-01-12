import { Session } from '../../reducers/sessions';

import { formatTime } from './formatTime';

export type SessionsListData = {
    [time: string]: {
        [sessionID: string]: Session;
    };
};

export function groupSessions(sessions: Session[]): SessionsListData {
    let data = {};
    sessions.forEach((session) => {
        let timeSectionKey = session.allDay ? 'All Day' : formatTime(session.startTime);
        data[timeSectionKey] = data[timeSectionKey] || {};
        data[timeSectionKey][session.id] = session;
    });

    return data;
}

