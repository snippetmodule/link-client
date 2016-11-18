import * as React from 'react';
import *as ReactNative from 'react-native';

import *as Colors from './base/common/Colors';
import { LoginButton } from './base/common/LoginButton';
import { Button } from './base/common/Button';
import { Text } from './base/common/Text';

type Prop = {
    navigator: ReactNative.Navigator;
    onLogin: () => void;
}
class LoginModal extends React.Component<Prop, any> {
    public render() {
        return (
            <ReactNative.View style={[styles.container]}>
                <ReactNative.Image
                    style={[styles.content]}
                    source={require('./img/login-background.png')}>
                    <Text style={styles.h1}>
                        Log in with Facebook
                    </Text>
                    <Text style={styles.h2}>
                        to save sessions to{'\n'}your schedule.
                    </Text>
                    <LoginButton onLoggedIn={this.loggedIn.bind(this)} />
                    <Button
                        type="secondary"
                        caption="Not Now"
                        onPress={() => this.props.navigator.pop()}
                        />
                </ReactNative.Image>
            </ReactNative.View>
        );
    }

    private loggedIn() {
        this.props.navigator.pop();
        this.props.onLogin();
    }
}

let styles = ReactNative.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'center',
        padding: 20,
    },
    content: {
        padding: 30,
        backgroundColor: 'transparent',
        borderRadius: 3,
        alignItems: 'center',
        // Image's source contains explicit size, but we want
        // it to prefer flex: 1
        width: undefined,
        height: undefined,
    },
    h1: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.darkText,
        textAlign: 'center',
        marginTop: 130,
    },
    h2: {
        fontSize: 18,
        lineHeight: 22,
        color: Colors.darkText,
        textAlign: 'center',
        marginBottom: 120,
    },
    notNowButton: {
        padding: 20,
    },
    notNowLabel: {
        color: Colors.lightText,
    },
});

export { LoginModal }
