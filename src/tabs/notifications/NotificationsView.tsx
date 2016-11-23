import * as React from 'react';
import *as ReactNative from 'react-native';
const { connect } = require('react-redux');
import * as Common from '../../base/common';

import { EmptySchedule } from '../schedule/EmptySchedule';
import { PushNUXModal } from './PushNUXModal';
import { NotificationCell } from './NotificationCell';
import { RateSessionsCell } from './RateSessionsCell';
import { allNotifications } from './allNotifications';
import { findSessionByURI } from './findSessionByURI';
import {
    turnOnPushNotifications,
    skipPushNotifications,
    TEST_MENU,
} from '../../actions';
import { env } from '../../base/env';
import { createSelector } from 'reselect';
import { Dispatch } from '../../actions/types';
import { Session } from '../../reducers/sessions';
import { Survey } from '../../reducers/surveys';
const data = createSelector(
    allNotifications,
    (store: any) => store.surveys,
    (store: any) => store.notifications.enabled,
    (notifications: any, surveys, enabled) => {
        const extra: Array<any> = [];
        if (surveys.length > 0) {
            extra.push({ surveysCount: surveys.length });
        }
        return [...extra, ...notifications];
    }
);
type Prop = {
    nux?: boolean;
    onTurnOnNotifications?: () => any;
    onSkipNotifications?: () => any;
    notifications?: any[];
    surveys?: Survey[]
    dispatch?: Dispatch
    sessions?: Session[];
    navigator: ReactNative.Navigator;
}
@connect(
    (state: any) => ({
        nux: state.notifications.enabled === null,
        notifications: data(state),
        sessions: state.sessions,
        surveys: state.surveys,
    }),
    dispatch => ({
        onTurnOnNotifications: () => dispatch(turnOnPushNotifications()),
        onSkipNotifications: () => dispatch(skipPushNotifications()),
        dispatch: dispatch,
    })
)
export class NotificationsView extends React.Component<Prop, any> {

    public render() {
        let modal;
        if (this.props.nux) {
            modal = (
                <PushNUXModal
                    onTurnOnNotifications={this.props.onTurnOnNotifications}
                    onSkipNotifications={this.props.onSkipNotifications}
                    />
            );
        }

        return (
            <ReactNative.View style={{ flex: 1 }}>
                <Common.ListContainer
                    title="Notifications"
                    backgroundImage={require('../../../asserts/tabs/notifications/notifications-background.png')}
                    backgroundColor={'#E78196'}
                    {...this.renderTestItems() }>
                    <Common.PureListView
                        data={this.props.notifications}
                        renderEmptyList={this.renderEmptyList.bind(this)}
                        renderRow={this.renderRow.bind(this)}
                        />
                </Common.ListContainer>
                {modal}
            </ReactNative.View>
        );
    }

    public renderRow(notification) {
        if (notification.surveysCount) {
            return (
                <RateSessionsCell
                    numberOfSessions={notification.surveysCount}
                    onPress={this.openReview.bind(this)}
                    />
            );
        }
        return (
            <NotificationCell
                key={notification.id}
                notification={notification}
                onPress={() => this.openNotification(notification)}
                />
        );
    }

    private renderEmptyList() {
        return (
            <EmptySchedule
                title="No Notifications Yet"
                text="Important updates and announcements will appear here"
                />
        );
    }

    private openNotification(notification) {
        if (notification.url) {
            let session = findSessionByURI(this.props.sessions, notification.url);
            if (session) {
                this.props.navigator.push({ session });
            } else {
                ReactNative.Linking.openURL(notification.url);
            }
        }
    }

    private openReview() {
        this.props.navigator.push({
            rate: 1,
            surveys: this.props.surveys,
        });
    }

    private renderTestItems() {
        if (!env.testMenuEnabled) {
            return {};
        }
        if (ReactNative.Platform.OS === 'ios') {
            return {
                rightItem: {
                    title: 'Test',
                    onPress: () => this.showTestMenu(),
                },
            };
        }
        if (ReactNative.Platform.OS === 'android') {
            return {
                extraItems: Object.keys(TEST_MENU).map((title) => ({
                    title,
                    onPress: () => this.props.dispatch(TEST_MENU[title]()),
                })),
            };
        }
    }

    private showTestMenu() {
        const itemTitles = Object.keys(TEST_MENU);
        ReactNative.ActionSheetIOS.showActionSheetWithOptions({
            title: 'Testing F8 app v' + env.version,
            options: ['Cancel', ...itemTitles],
            cancelButtonIndex: 0,
        }, (idx) => {
            if (idx === 0) {
                return;
            }

            const action: any = TEST_MENU[itemTitles[idx - 1]];
            this.props.dispatch(action());
        }
        );
    }
}

// function select(state) {
//     return {
//         nux: state.notifications.enabled === null,
//         notifications: data(state),
//         sessions: state.sessions,
//         surveys: state.surveys,
//     };
// }

// function actions(dispatch: Dispatch) {
//     return {
//         onTurnOnNotifications: () => dispatch(turnOnPushNotifications()),
//         onSkipNotifications: () => dispatch(skipPushNotifications()),
//         dispatch,
//     };
// }

// export let NotificationsView = connect(select, actions)(NotificationsViewImpl);
