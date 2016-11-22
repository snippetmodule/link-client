
import * as React from 'react';
import *as ReactNative from 'react-native';
const { connect } = require('react-redux');
import * as Common from '../base/common';

import { switchTab, logOutWithPrompt } from '../actions';
import { UserState } from '../reducers/user';
import { Tab, Day } from '../reducers/navigation';
import { InfoView } from './info/InfoView';
import { NotificationsView } from './notifications/NotificationsView';
import { GeneralScheduleView } from './schedule/GeneralScheduleView';
import { MyScheduleView } from './schedule/MyScheduleView';
import { unseenNotificationsCount } from './notifications/unseenNotificationsCount';


type Prop = {
    tab?: Tab;
    day?: Day;
    onTabSelect?: (tab: Tab) => void;
    logOut?: () => void;
    navigator: ReactNative.Navigator;
    notificationsBadge?: any;
    user?: UserState;
};
@connect(
    (store: any) => ({
        tab: store.navigation.tab,
        day: store.navigation.day,
        user: store.user,
        notificationsBadge: unseenNotificationsCount(store) + store.surveys.length,
    }),
    dispatch => ({
        onTabSelect: (tab) => dispatch(switchTab(tab)),
        logOut: () => dispatch(logOutWithPrompt()),
    })
)
export class TabsViewIOS extends React.Component<Prop, any> {
    private onTabSelect(tab: Tab) {
        if (this.props.tab !== tab) {
            this.props.onTabSelect(tab);
        }
    }

    public render() {
        let scheduleIcon = this.props.day === 1
            ? require('./schedule/img/schedule-icon-1.png')
            : require('./schedule/img/schedule-icon-2.png');
        let scheduleIconSelected = this.props.day === 1
            ? require('./schedule/img/schedule-icon-1-active.png')
            : require('./schedule/img/schedule-icon-2-active.png');
        return (
            <ReactNative.TabBarIOS tintColor={Common.Colors.darkText}>
                <ReactNative.TabBarIOS.Item
                    title="Schedule"
                    selected={this.props.tab === 'schedule'}
                    onPress={this.onTabSelect.bind(this, 'schedule')}
                    icon={scheduleIcon}
                    selectedIcon={scheduleIconSelected}>
                    <GeneralScheduleView
                        navigator={this.props.navigator}
                        />
                </ReactNative.TabBarIOS.Item>
                <ReactNative.TabBarIOS.Item
                    title="My F8"
                    selected={this.props.tab === 'my-schedule'}
                    onPress={this.onTabSelect.bind(this, 'my-schedule')}
                    icon={require('./schedule/img/my-schedule-icon.png')}
                    selectedIcon={require('./schedule/img/my-schedule-icon-active.png')}>
                    <MyScheduleView
                        navigator={this.props.navigator}
                        />
                </ReactNative.TabBarIOS.Item>
                <ReactNative.TabBarIOS.Item
                    title="Maps"
                    selected={this.props.tab === 'map'}
                    onPress={this.onTabSelect.bind(this, 'map')}
                    icon={require('./maps/img/maps-icon.png')}
                    selectedIcon={require('./maps/img/maps-icon-active.png')}>
                    <Common.MapView />
                </ReactNative.TabBarIOS.Item>
                <ReactNative.TabBarIOS.Item
                    title="Notifications"
                    selected={this.props.tab === 'notifications'}
                    onPress={this.onTabSelect.bind(this, 'notifications')}
                    badge={this.props.notificationsBadge || null}
                    icon={require('./notifications/img/notifications-icon.png')}
                    selectedIcon={require('./notifications/img/notifications-icon-active.png')}>
                    <NotificationsView navigator={this.props.navigator} />
                </ReactNative.TabBarIOS.Item>
                <ReactNative.TabBarIOS.Item
                    title="Info"
                    selected={this.props.tab === 'info'}
                    onPress={this.onTabSelect.bind(this, 'info')}
                    icon={require('./info/img/info-icon.png')}
                    selectedIcon={require('./info/img/info-icon-active.png')}>
                    <InfoView />
                </ReactNative.TabBarIOS.Item>
            </ReactNative.TabBarIOS>
        );
    }

}

// function select(store) {
//     return {
//         tab: store.navigation.tab,
//         day: store.navigation.day,
//         notificationsBadge: unseenNotificationsCount(store) + store.surveys.length,
//     };
// }

// function actions(dispatch) {
//     return {
//         onTabSelect: (tab) => dispatch(switchTab(tab)),
//     };
// }

// export let TabsView = connect(select, actions)(TabsViewImpl);
