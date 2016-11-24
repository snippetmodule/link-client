import * as React from 'react';
import *as ReactNative from 'react-native';
import * as Common from '../../base/common';

type Prop = {
    onTurnOnNotifications: () => void;
    onSkipNotifications: () => void;
};
export class PushNUXModal extends React.Component<Prop, any> {

    public render() {
        return (
            <ReactNative.View style={styles.container as React.ViewStyle}>
                <ReactNative.View style={styles.inner as React.ViewStyle}>
                    <ReactNative.Image
                        style={styles.image as React.ImageStyle}
                        source={require('../../../asserts/tabs/notifications/push-nux.png')}
                        />
                    <ReactNative.View style={styles.content as React.ViewStyle}>
                        <Common.Texts.Heading1 style={null}>
                            Don't miss out!
                        </Common.Texts.Heading1>
                        <Common.Texts.Paragraph style={styles.text}>
                            Turn on push notifications to see what’s happening at F8. You can
                                always see in-app updates on this tab.
                        </Common.Texts.Paragraph>
                        <Common.Button
                            style={styles.button}
                            type="primary"
                            caption="Turn on push notifications"
                            onPress={this.props.onTurnOnNotifications}
                            />
                        <Common.Button
                            style={styles.button}
                            type="secondary"
                            caption="No thanks"
                            onPress={this.props.onSkipNotifications}
                            />
                    </ReactNative.View>
                </ReactNative.View>
            </ReactNative.View>
        );
    }
}


let styles = ReactNative.StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 49,
        backgroundColor: 'rgba(0, 0, 0, 0.66)',
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    inner: {
        overflow: 'hidden',
        backgroundColor: 'white',
        borderRadius: 2,
    },
    image: {
        alignSelf: 'center',
    },
    content: {
        padding: 20,
        paddingBottom: 10,
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        marginVertical: 20,
    },
    page: {
        borderTopWidth: 1,
        borderTopColor: Common.Colors.cellBorder,
        paddingTop: undefined,
        paddingBottom: 0,
    },
    button: {
        marginTop: 10,
        alignSelf: 'stretch',
    },
});
