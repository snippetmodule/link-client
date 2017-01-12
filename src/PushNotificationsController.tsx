import * as React from 'react';
import * as ReactNative from 'react-native';
const { connect } = require('react-redux');

import { Dispatch } from './actions/types';
import { unseenNotificationsCount } from './tabs/notifications/unseenNotificationsCount';
import {
    storeDeviceToken,
    receivePushNotification,
    updateInstallation,
    markAllNotificationsAsSeen,
} from './actions';
let PushNotification = require('react-native-push-notification');

const PARSE_CLOUD_GCD_SENDER_ID = '1076345567071';

type Prop = {
    tab?: string;
    enabled?: boolean;
    badge?: number;
    dispatch?: Dispatch;
};

@connect(
    (store) => ({
        enabled: store.notifications.enabled === true,
        badge: unseenNotificationsCount(store) + store.surveys.length,
        tab: store.navigation.tab,
    }),
    (dispatch) => ({ dispatch: dispatch }),
)
export class PushNotificationsController extends React.Component<Prop, any> {

    private handleAppStateChange(appState) {
        if (appState === 'active') {
            this.updateAppBadge();
            if (this.props.tab === 'notifications') {
                this.eventuallyMarkNotificationsAsSeen();
            }
        }
    }

    public componentDidMount() {
        ReactNative.AppState.addEventListener('change', this.handleAppStateChange.bind(this));
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
        ReactNative.AppState.removeEventListener('change', this.handleAppStateChange.bind(this));
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
            ReactNative.PushNotificationIOS.setApplicationIconBadgeNumber(this.props.badge);
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

// function select(store) {
//     return {
//         enabled: store.notifications.enabled === true,
//         badge: unseenNotificationsCount(store) + store.surveys.length,
//         tab: store.navigation.tab,
//     };
// }
// export { PushNotificationsController }
// export let PushNotificationsController = connect(select)(PushNotificationsControllerImpl);
