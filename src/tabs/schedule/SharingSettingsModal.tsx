import * as React from 'react';
import * as ReactNative from 'react-native';
import * as Common from '../../base/common';

import { FriendsUsingApp } from './FriendsUsingApp';
import { SharingSettingsCommon } from './SharingSettingsCommon';

import { setSharingEnabled, Dispatch } from '../../actions';

type Prop = {
    navigator: ReactNative.Navigator;
    dispatch: Dispatch;
};
export class SharingSettingsModal extends React.Component<Prop, void> {

    public render() {
        return (
            <ReactNative.View style={styles.container as React.ViewStyle}>
                <ReactNative.View style={styles.content as React.ViewStyle}>
                    <SharingSettingsCommon style={styles.common as React.ViewStyle} />
                    <FriendsUsingApp />
                    <Common.Button
                        style={styles.button}
                        caption="OK!"
                        onPress={() => this.handleSetSharing(true)}
                    />
                    <Common.Button
                        type="secondary"
                        caption="Not now"
                        onPress={() => this.handleSetSharing(false)}
                    />
                </ReactNative.View>
            </ReactNative.View>
        );
    }

    private handleSetSharing(enabled: boolean) {
        this.props.dispatch(setSharingEnabled(enabled));
        this.props.navigator.pop();
    }
}

let styles = Common.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'center',
        padding: 20,
    },
    content: {
        backgroundColor: 'white',
        borderRadius: 3,
        alignItems: 'center',
        overflow: 'hidden',
    },
    button: {
        marginTop: 20,
        marginBottom: 10,
        marginHorizontal: 20,
        alignSelf: 'stretch',
    },
    common: {
        marginTop: -50,
    },
});

// export let SharingSettingsModal = connect()(SharingSettingsModalImpl);
