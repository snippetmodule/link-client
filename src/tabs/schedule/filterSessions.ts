
import { Session } from '../../reducers/sessions';

type StringMap = { [key: string]: boolean };

export function byDay(sessions: Session[], day: number): Session[] {
    return sessions.filter((session) => session.day === day);
}

export function byTopics(sessions: Session[], topics: StringMap): Session[] {
    if (Object.keys(topics).length === 0) {
        return sessions;
    }
    return sessions.filter((session) => {
        let hasMatchingTag = false;
        session.tags.forEach((tag) => {
            hasMatchingTag = hasMatchingTag || topics[tag];
        });
        return hasMatchingTag;
    });
}

export function bySchedule(sessions: Session[], schedule: StringMap): Session[] {
    return sessions.filter(
        (session) => schedule[session.id]
    );
}

