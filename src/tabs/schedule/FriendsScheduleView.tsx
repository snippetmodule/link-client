import * as React from 'react';
import *as ReactNative from 'react-native';
import * as Common from '../../base/common';
const { connect } = require('react-redux');

import { EmptySchedule } from './EmptySchedule';
import * as FilterSessions from './filterSessions';
import { ScheduleListView } from './ScheduleListView';

import { Session } from '../../reducers/sessions';
import { FriendsSchedule } from '../../reducers/friendsSchedules';
import { createSelector } from 'reselect';

type Props = {
    sessions?: Array<Session>;
    friend: FriendsSchedule;
    navigator: ReactNative.Navigator;
};
@connect(
    (store, props) => ({
        sessions: data(store, props),
    })
)
export class FriendsScheduleView extends React.Component<Props, void> {

    public render() {
        const backItem = {
            icon: require('../../../asserts/base/common/back_white.png'),
            onPress: () => this.props.navigator.pop(),
        };
        const firstName = this.props.friend.name.split(' ')[0];
        return (
            <Common.ListContainer
                title={`${firstName}'s Schedule`}
                parallaxContent={<Common.ProfilePicture userID={this.props.friend.id} size={100} />}
                backgroundImage={require('../../../asserts/tabs/schedule/schedule-background.png')}
                backgroundColor={'#5597B8'}
                selectedSectionColor="#51CDDA"
                leftItem={backItem}>
                <ScheduleListView
                    title="Day 1"
                    day={1}
                    sessions={this.props.sessions}
                    renderEmptyList={this.renderEmptyList}
                    navigator={this.props.navigator}
                    />
                <ScheduleListView
                    title="Day 2"
                    day={2}
                    sessions={this.props.sessions}
                    renderEmptyList={this.renderEmptyList}
                    navigator={this.props.navigator}
                    />
            </Common.ListContainer>
        );
    }

    private renderEmptyList(day) {
        return (
            <EmptySchedule
                title="Nothing to show."
                text={`${this.props.friend.name} has not added any sessions for day ${day}`}
                />
        );
    }
}

const data = createSelector(
    (store: any) => store.sessions,
    (store, props) => props.friend.schedule,
    (sessions, schedule) => FilterSessions.bySchedule(sessions, schedule),
);

// function select(store, props) {
//     return {
//         sessions: data(store, props),
//     };
// }

// export let FriendsScheduleView = connect(select)(FriendsScheduleViewImpl);
