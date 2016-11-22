
import * as React from 'react';
import *as ReactNative from 'react-native';
const { connect } = require('react-redux');
import * as Common from '../base/common';

import { switchTab, logOutWithPrompt } from '../actions';
import { UserState } from '../reducers/user';
import { Tab, Day } from '../reducers/navigation';
import { MenuItem } from './MenuItem';
import { InfoView } from './info/InfoView';
import { NotificationsView } from './notifications/NotificationsView';
import { GeneralScheduleView } from './schedule/GeneralScheduleView';
import { MyScheduleView } from './schedule/MyScheduleView';
import { unseenNotificationsCount } from './notifications/unseenNotificationsCount';

type Prop = {
    navigator: ReactNative.Navigator;
    tab?: Tab;
    day?: Day;
    onTabSelect?: (tab: Tab) => void;
    logOut?: () => void;
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
export class TabsViewAndroid extends React.Component<Prop, any> {
    private drawer: Common.DrawerLayout;

    public static contextTypes = {
        addBackButtonListener: React.PropTypes.func,
        removeBackButtonListener: React.PropTypes.func,
    };
    public static childContextTypes = {
        openDrawer: React.PropTypes.func,
        hasUnreadNotifications: React.PropTypes.bool,
    };
    public getChildContext() {
        return {
            openDrawer: this.openDrawer.bind(this),
            hasUnreadNotifications: this.props.notificationsBadge > 0,
        };
    }

    public openDrawer() {
        this.drawer.openDrawer();
    }

    public onTabSelect(tab: Tab) {
        if (this.props.tab !== tab) {
            this.props.onTabSelect(tab);
        }
        this.drawer.closeDrawer();
    }

    public openProfileSettings() {
        this.drawer.closeDrawer();
        this.props.navigator.push({ shareSettings: true });
    }

    private renderNavigationView() {
        let scheduleIcon = this.props.day === 1
            ? require('../../asserts/tabs/schedule/schedule-icon-1.png')
            : require('../../asserts/tabs/schedule/schedule-icon-2.png');
        let scheduleIconSelected = this.props.day === 1
            ? require('../../asserts/tabs/schedule/schedule-icon-1-active.png')
            : require('../../asserts/tabs/schedule/schedule-icon-2-active.png');
        let accountItem, myF8Item, loginItem;

        if (this.props.user.isLoggedIn) {
            let name = this.props.user.name || '';
            accountItem = (
                <ReactNative.View>
                    <ReactNative.TouchableOpacity onPress={this.openProfileSettings}>
                        <Common.ProfilePicture userID={this.props.user.id} size={80} />
                    </ReactNative.TouchableOpacity>
                    <Common.Texts.Text style={styles.name}>
                        {name.toUpperCase()}
                    </Common.Texts.Text>
                </ReactNative.View>
            );
            myF8Item = (
                <MenuItem
                    title="My F8"
                    selected={this.props.tab === 'my-schedule'}
                    onPress={this.onTabSelect.bind(this, 'my-schedule')}
                    icon={require('../../asserts/tabs/schedule/my-schedule-icon.png')}
                    selectedIcon={require('../../asserts/tabs/schedule/my-schedule-icon-active.png')}
                    />
            );
        } else {
            accountItem = (
                <ReactNative.View>
                    <ReactNative.Image source={require('../../asserts/tabs/logo.png')} />
                    <Common.Texts.Text style={styles.name}>
                        APRIL 12 + 13 / SAN FRANCISCO
                    </Common.Texts.Text>
                </ReactNative.View>
            );
            loginItem = (
                <ReactNative.View style={styles.loginPrompt as React.ViewStyle}>
                    <Common.Texts.Text style={styles.loginText}>
                        Log in to find your friends at F8.
                    </Common.Texts.Text>
                    <Common.LoginButton source="Drawer" />
                </ReactNative.View>
            );
        }
        return (
            <ReactNative.View style={styles.drawer}>
                <ReactNative.Image
                    style={styles.header as React.ImageStyle}
                    source={require('../../asserts/tabs/drawer-header.png')}>
                    {accountItem}
                </ReactNative.Image>
                <MenuItem
                    title="Schedule"
                    selected={this.props.tab === 'schedule'}
                    onPress={this.onTabSelect.bind(this, 'schedule')}
                    icon={scheduleIcon}
                    selectedIcon={scheduleIconSelected}
                    />
                {myF8Item}
                <MenuItem
                    title="Maps"
                    selected={this.props.tab === 'map'}
                    onPress={this.onTabSelect.bind(this, 'map')}
                    icon={require('../../asserts/tabs/maps/maps-icon.png')}
                    selectedIcon={require('../../asserts/tabs/maps/maps-icon-active.png')}
                    />
                <MenuItem
                    title="Notifications"
                    selected={this.props.tab === 'notifications'}
                    onPress={this.onTabSelect.bind(this, 'notifications')}
                    badge={this.props.notificationsBadge}
                    icon={require('../../asserts/tabs/notifications/notifications-icon.png')}
                    selectedIcon={require('../../asserts/tabs/notifications/notifications-icon-active.png')}
                    />
                <MenuItem
                    title="Info"
                    selected={this.props.tab === 'info'}
                    onPress={this.onTabSelect.bind(this, 'info')}
                    icon={require('../../asserts/tabs/info/info-icon.png')}
                    selectedIcon={require('../../asserts/tabs/info/info-icon-active.png')}
                    />
                {loginItem}
            </ReactNative.View>
        );
    }

    private renderContent() {
        switch (this.props.tab) {
            case 'schedule':
                return (
                    <GeneralScheduleView
                        navigator={this.props.navigator} {...this.props}
                        />
                );

            case 'my-schedule':
                return (
                    <MyScheduleView
                        navigator={this.props.navigator}
                        // onJumpToSchedule={() => this.props.onTabSelect('schedule')}
                        {...this.props}
                        />
                );

            case 'map':
                return <Common.MapView />;

            case 'notifications':
                return <NotificationsView navigator={this.props.navigator} />;

            case 'info':
                return <InfoView />;
            default:
                throw new Error(`Unknown tab ${this.props.tab}`);
        }

    }

    public render() {
        return (
            <Common.DrawerLayout
                ref={ref => this.drawer = ref}
                drawerWidth={290}
                drawerPosition="left"
                renderNavigationView={this.renderNavigationView.bind(this)}
                {...this.props}>
                <ReactNative.View style={styles.content} key={this.props.tab}>
                    {this.renderContent()}
                </ReactNative.View>
            </Common.DrawerLayout>
        );
    }
}
let styles = ReactNative.StyleSheet.create({
    drawer: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
    },
    header: {
        padding: 20,
        justifyContent: 'flex-end',
    },
    name: {
        marginTop: 10,
        color: 'white',
        fontSize: 12,
    },
    loginPrompt: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 10,
    },
    loginText: {
        fontSize: 12,
        color: Common.Colors.lightText,
        textAlign: 'center',
        marginBottom: 10,
    },
});

// export let TabsView = connect(select, actions)(TabsViewImpl);
