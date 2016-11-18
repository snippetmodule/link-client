import * as React from 'react';
import *as ReactNative from 'react-native';

import * as Common from '../../base/common';

import { Session } from '../../model/Session';

import { SessionsListData, groupSessions } from './groupSessions';
import { SessionsSectionHeader } from './SessionsSectionHeader';
import { SessionCell } from './SessionCell';
// var F8SessionCell = require('F8SessionCell');
// var FilterSessions = require('./filterSessions');
// var SessionsSectionHeader = require('./SessionsSectionHeader');
// var groupSessions = require('./groupSessions');

// import type {Session } from '../../reducers/sessions';
// import type {SessionsListData } from './groupSessions';

type Props = {
    day: number;
    sessions: Array<Session>;
    navigator: ReactNative.Navigator;
    renderEmptyList?: (day: number) => JSX.Element;
};

type State = {
    todaySessions: SessionsListData;
};

class ScheduleListView extends React.Component<Props, State> {
    private _innerRef?: Common.PureListView;

    constructor(props: Props) {
        super(props);
        this.state = {
            todaySessions: groupSessions(FilterSessions.byDay(props.sessions, props.day)),
        };
        this._innerRef = null;
    }

    public componentWillReceiveProps(nextProps: Props) {
        if (nextProps.sessions !== this.props.sessions ||
            nextProps.day !== this.props.day) {
            this.setState({
                todaySessions: groupSessions(FilterSessions.byDay(nextProps.sessions, nextProps.day)),
            });
        }
    }

    public render() {
        return (
            <Common.PureListView
                ref={(ref) => this._innerRef = ref}
                data={this.state.todaySessions}
                renderRow={this.renderRow}
                renderSectionHeader={this.renderSectionHeader}
                {...this.props}
                renderEmptyList={this.renderEmptyList}
                />
        );
    }

    private renderSectionHeader(sectionData: any, sectionID: string) {
        return <SessionsSectionHeader title={sectionID} />;
    }

    private renderRow(session: Session, day: number) {
        return (
            <SessionCell
                onPress={() => this.openSession(session, day)}
                session={session}
                />
        );
    }

    private renderEmptyList(): JSX.Element {
        const {renderEmptyList } = this.props;
        return renderEmptyList && renderEmptyList(this.props.day);
    }

    private openSession(session: Session, day: number) {
        this.props.navigator.push({
            day,
            session,
            allSessions: this.state.todaySessions,
        });
    }

    private scrollTo(...args: Array<any>) {
        this._innerRef && this._innerRef.scrollTo(...args);
    }
}

export { ScheduleListView }
