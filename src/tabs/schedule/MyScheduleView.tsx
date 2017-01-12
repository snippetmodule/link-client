import * as React from 'react';
import * as ReactNative from 'react-native';
const { connect } = require('react-redux');
import * as Common from '../../base/common';

import { EmptySchedule } from './EmptySchedule';
import * as  FilterSessions from './filterSessions';
import { ScheduleListView } from './ScheduleListView';
import { FriendsListView } from './FriendsListView';
import {
    logOutWithPrompt,
    switchTab,
    switchDay,
    loadFriendsSchedules,
} from '../../actions';

import { Session } from '../../reducers/sessions';
import { FriendsSchedule } from '../../reducers/friendsSchedules';
import { UserState as User } from '../../reducers/user';
import { ScheduleState as Schedule } from '../../reducers/schedule';

import { createSelector } from 'reselect';


type Props = {
    user?: User;
    sessions?: Session[];
    friends?: FriendsSchedule[];
    schedule?: Schedule;
    navigator: ReactNative.Navigator;
    logOut?: () => void;
    jumpToSchedule?: (day: number) => void;
    loadFriendsSchedules?: () => void;
};
// TODO: Rename to MyF8View
@connect(
    (store: any) => ({
        user: store.user,
        sessions: data(store),
        schedule: store.schedule,
        // Only show friends who have something in their schedule
        friends: store.friendsSchedules.filter(
            (friend) => Object.keys(friend.schedule).length > 0,
        ),
    }),
    (dispatch) => ({
        logOut: () => dispatch(logOutWithPrompt()),
        jumpToSchedule: (day) => dispatch([
            switchTab('schedule'),
            switchDay(day),
        ]),
        loadFriendsSchedules: () => dispatch(loadFriendsSchedules()),
    }),
)
export class MyScheduleView extends React.Component<Props, void> {
    public render() {
        let rightItem;
        if (this.props.user.isLoggedIn) {
            rightItem = {
                title: 'Settings',
                icon: require('../../../asserts/tabs/schedule/settings.png'),
                onPress: this.openSharingSettings,
            };
        }

        const { id, isLoggedIn } = this.props.user;
        const profilePicture = isLoggedIn && id
            ? <Common.ProfilePicture userID={id} size={100} />
            : null;

        return (
            <Common.ListContainer
                title="My F8"
                parallaxContent={profilePicture}
                backgroundImage={require('../../../asserts/tabs/schedule/my-f8-background.png')}
                backgroundColor={'#A8D769'}
                onSegmentChange={this.handleSegmentChanged}
                rightItem={rightItem}>
                {this.renderContent()}
            </Common.ListContainer>
        );
    }

    private renderContent() {
        if (!this.props.user.isLoggedIn) {
            return this.renderNotLoggedIn();
        }

        return [
            <ScheduleListView
                title="Day 1"
                day={1}
                sessions={this.props.sessions}
                renderEmptyList={this.renderEmptySessionsList}
                navigator={this.props.navigator}
            />,
            <ScheduleListView
                title="Day 2"
                day={2}
                sessions={this.props.sessions}
                renderEmptyList={this.renderEmptySessionsList}
                navigator={this.props.navigator}
            />,
            <FriendsListView
                title="Friends"
                friends={this.props.friends}
                navigator={this.props.navigator}
            />,
        ];
    }

    private renderNotLoggedIn() {
        return (
            <EmptySchedule
                key="login"
                title="Log in to make a schedule."
                text="You’ll be able to save sessions to your schedule to view or share later.">
                <Common.LoginButton source="My F8" />
            </EmptySchedule>
        );
    }

    private renderEmptySessionsList(day) {
        return (
            <EmptySchedule
                key="schedule"
                image={require('../../../asserts/tabs/schedule/no-sessions-added.png')}
                text={'Sessions you save will\nappear here.'}>
                <Common.Button
                    caption={`See the day ${day} schedule`}
                    onPress={() => this.props.jumpToSchedule(day)}
                />
            </EmptySchedule>
        );
    }

    private openSharingSettings() {
        this.props.navigator.push({ shareSettings: 1 });
    }

    private handleSegmentChanged(segment) {
        if (segment === 2 /* friends */) {
            this.props.loadFriendsSchedules();
        }
    }
}

const data = createSelector(
    (store: any) => store.sessions,
    (store) => store.schedule,
    (sessions, schedule) => FilterSessions.bySchedule(sessions, schedule),
);

// function select(store) {
//     return {
//         user: store.user,
//         sessions: data(store),
//         schedule: store.schedule,
//         // Only show friends who have something in their schedule
//         friends: store.friendsSchedules.filter(
//             (friend) => Object.keys(friend.schedule).length > 0
//         ),
//     };
// }

// function actions(dispatch) {
//     return {
//         logOut: () => dispatch(logOutWithPrompt()),
//         jumpToSchedule: (day) => dispatch([
//             switchTab('schedule'),
//             switchDay(day),
//         ]),
//         loadFriendsSchedules: () => dispatch(loadFriendsSchedules()),
//     };
// }

// export let MyScheduleView = connect(select, actions)(MyScheduleViewImpl);
