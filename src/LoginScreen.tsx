

import * as React from 'react';
import *as ReactNative from 'react-native';

import *as Colors from './base/components/Colors';
import { LoginButton } from './base/components/LoginButton';
import { Button } from './base/components/Button';
import { Text } from './base/components/Text';


class LoginScreen extends React.Component<any, { anim: ReactNative.Animated.Value }> {
    public state = {
        anim: new ReactNative.Animated.Value(0),
    };
    public componentDidMount() {
        ReactNative.Animated.timing(this.state.anim, { toValue: 3000, duration: 3000 }).start();
    }

    public render() {
        return (
            <ReactNative.Image
                style={styles.container}
                source={require('/assert/login-background.png')}>
                <ReactNative.StatusBar barStyle="default" />
                <ReactNative.TouchableOpacity
                    accessibilityTraits="button"
                    style={styles.skip as React.ViewStyle}>
                    <ReactNative.Animated.Image
                        style={this.fadeIn(2800)}
                        source={require('./img/x.png')}
                        />
                </ReactNative.TouchableOpacity>
                <ReactNative.View style={styles.section as React.ViewStyle}>
                    <ReactNative.Animated.Image
                        style={this.fadeIn(0)}
                        source={require('./img/devconf-logo.png')}
                        />
                </ReactNative.View>
                <ReactNative.View style={styles.section as React.ViewStyle}>
                    <ReactNative.Animated.Text style={[styles.h1, this.fadeIn(700, -20)]}>
                        code to
                     </ReactNative.Animated.Text>
                    <ReactNative.Animated.Text style={[styles.h1, { marginTop: -30 }, this.fadeIn(700, 20)]}>
                        connect
                 </ReactNative.Animated.Text>
                    <ReactNative.Animated.Text style={[styles.h2, this.fadeIn(1000, 10)]}>
                        April 12 + 13 / Fort Mason Center
          </ReactNative.Animated.Text>
                    <ReactNative.Animated.Text style={[styles.h3, this.fadeIn(1200, 10)]}>
                        SAN FRANCISCO, CALIFORNIA
          </ReactNative.Animated.Text>
                </ReactNative.View>
                <ReactNative.Animated.View style={[styles.section, styles.last, this.fadeIn(2500, 20)]}>
                    <Text style={styles.loginComment}>
                        Use Facebook to find your friends at F8.
          </Text>
                    <LoginButton source="First screen" />
                </ReactNative.Animated.View>
            </ReactNative.Image>
        );
    }

    private fadeIn(delay, from = 0) {
        const {anim} = this.state;
        return {
            opacity: anim.interpolate({
                inputRange: [delay, Math.min(delay + 500, 3000)],
                outputRange: [0, 1],
                extrapolate: 'clamp',
            }),
            transform: [{
                translateY: anim.interpolate({
                    inputRange: [delay, Math.min(delay + 500, 3000)],
                    outputRange: [from, 0],
                    extrapolate: 'clamp',
                }),
            }],
        };
    }
}

const scale = ReactNative.Dimensions.get('window').width / 375;

let styles = ReactNative.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        padding: 26,
        // Image's source contains explicit size, but we want
        // it to prefer flex: 1
        width: undefined,
        height: undefined,
    },
    section: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    last: {
        justifyContent: 'flex-end',
    },
    h1: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: Math.round(74 * scale),
        color: Colors.darkText,
        backgroundColor: 'transparent',
    },
    h2: {
        textAlign: 'center',
        fontSize: 17,
        color: Colors.darkText,
        marginVertical: 20,
    },
    h3: {
        fontSize: 12,
        textAlign: 'center',
        color: Colors.lightText,
        letterSpacing: 1,
    },
    loginComment: {
        marginBottom: 14,
        fontSize: 12,
        color: Colors.darkText,
        textAlign: 'center',
    },
    skip: {
        position: 'absolute',
        right: 0,
        top: 20,
        padding: 15,
    },
});
export { LoginScreen }
