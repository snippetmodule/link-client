import { Action } from '../actions/types';

export type Question = {
    text: string;
    lowLabel: string;
    highLabel: string;
};

export type Survey = {
    id: string;
    sessionId: string;
    questions: Question[];
};

type State = Survey[];

export function surveys(state: State = [], action: Action): State {
    if (action.type === 'LOADED_SURVEYS') {
        return action.list;
    }
    if (action.type === 'SUBMITTED_SURVEY_ANSWERS') {
        const submittedSurveyId = action.id;
        return state.filter((survey) => survey.id !== submittedSurveyId);
    }
    if (action.type === 'LOGGED_OUT') {
        return [];
    }
    return state;
}
