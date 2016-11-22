import * as React from 'react';
import *as ReactNative from 'react-native';
import * as Common from '../../base/common';
const { connect } = require('react-redux');

import { FriendsUsingApp } from './FriendsUsingApp';
import { SharingSettingsCommon } from './SharingSettingsCommon';
import { setSharingEnabled, logOutWithPrompt, Dispatch } from '../../actions';

import { UserState as User } from '../../reducers/user';

type Prop = {
    navigator: ReactNative.Navigator;
    dispatch?: Dispatch;
    sharedSchedule?: boolean;
    user?: User;
};
@connect(
    (store: any) => ({
        user: store.user,
        sharedSchedule: store.user.sharedSchedule,
    }),
    dispatch => ({ dispatch: dispatch })
)
export class SharingSettingsScreen extends React.Component<Prop, void> {
    public render() {
        return (
            <ReactNative.View style={styles.container as React.ViewStyle}>
                <ReactNative.StatusBar
                    translucent={true}
                    backgroundColor="rgba(0, 0, 0, 0.2)"
                    barStyle="default"
                    />
                <SharingSettingsCommon />
                <ReactNative.View style={styles.switchWrapper as React.ViewStyle}>
                    <Common.Texts.Text style={styles.option}>
                        NO
                    </Common.Texts.Text>
                    <ReactNative.Switch
                        accessibilityLabel="Let friends view your schedule"
                        style={styles.switch}
                        value={!!this.props.sharedSchedule}
                        onValueChange={(enabled) => this.props.dispatch(setSharingEnabled(enabled))}
                        onTintColor="#00E3AD"
                        />
                    <Common.Texts.Text style={styles.option}>
                        YES
                    </Common.Texts.Text>
                </ReactNative.View>
                <FriendsUsingApp />
                <Common.Header
                    style={styles.header}
                    foreground="dark"
                    title="Settings"
                    leftItem={{
                        icon: require('../../common/img/back.png'),
                        title: 'Back',
                        layout: 'icon',
                        onPress: () => this.props.navigator.pop(),
                    }}
                    rightItem={{
                        icon: require('./img/logout.png'),
                        title: 'Logout',
                        onPress: () => this.props.dispatch(logOutWithPrompt()),
                    }}
                    />
            </ReactNative.View>
        );
    }
}

let styles = Common.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 49,
    },
    header: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
    },
    switchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    switch: {
        margin: 10,
    },
    option: {
        fontSize: 12,
        color: Common.Colors.lightText,
    },
});

// function select(store) {
//     return {
//         user: store.user,
//         sharedSchedule: store.user.sharedSchedule,
//     };
// }

// export let SharingSettingsScreen = connect(select)(SharingSettingsScreenImpl);
