import * as React from 'react';
import *as ReactNative from 'react-native';

import { connect } from 'react-redux';

import { Dispatch } from './actions/types';
import { PushNotificationIOS, PushNotification } from 'react-native-push-notification';
import { unseenNotificationsCount } from './tabs/notifications/unseenNotificationsCount';

import {
    storeDeviceToken,
    receivePushNotification,
    updateInstallation,
    markAllNotificationsAsSeen,
} from './actions';

const PARSE_CLOUD_GCD_SENDER_ID = '1076345567071';

type Prop = {
    tab: string;
    enabled: boolean;
    badge: number;
    dispatch: Dispatch;
};
class PushNotificationsControllerImpl extends React.Component<Prop, any> {

    private handleAppStateChange(appState) {
        if (appState === 'active') {
            this.updateAppBadge();
            if (this.props.tab === 'notifications') {
                this.eventuallyMarkNotificationsAsSeen();
            }
        }
    }

    public componentDidMount() {
        ReactNative.AppState.addEventListener('change', this.handleAppStateChange);

        const {dispatch} = this.props;
        PushNotification.configure({
            onRegister: ({token}) => dispatch(storeDeviceToken(token)),
            onNotification: (notif) => dispatch(receivePushNotification(notif)),
            senderID: PARSE_CLOUD_GCD_SENDER_ID,
            requestPermissions: this.props.enabled,
        });

        this.updateAppBadge();
    }

    public componentWillUnmount() {
        ReactNative.AppState.removeEventListener('change', this.handleAppStateChange);
    }

    public componentDidUpdate(prevProps) {
        if (!prevProps.enabled && this.props.enabled) {
            PushNotification.requestPermissions();
        }
        if (this.props.badge !== prevProps.badge) {
            this.updateAppBadge();
        }
        if (this.props.tab === 'notifications' && prevProps.tab !== 'notifications') {
            this.eventuallyMarkNotificationsAsSeen();
        }
    }

    private updateAppBadge() {
        if (this.props.enabled && ReactNative.Platform.OS === 'ios') {
            PushNotificationIOS.setApplicationIconBadgeNumber(this.props.badge);
            updateInstallation({ badge: this.props.badge });
        }
    }

    private eventuallyMarkNotificationsAsSeen() {
        const {dispatch} = this.props;
        setTimeout(() => dispatch(markAllNotificationsAsSeen()), 1000);
    }

    public render() {
        return null;
    }
}

function select(store) {
    return {
        enabled: store.notifications.enabled === true,
        badge: unseenNotificationsCount(store) + store.surveys.length,
        tab: store.navigation.tab,
    };
}
// export { PushNotificationsController }
export let PushNotificationsController = connect(select)(PushNotificationsControllerImpl);
