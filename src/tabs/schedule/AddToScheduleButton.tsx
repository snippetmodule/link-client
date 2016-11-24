import * as React from 'react';
import *as ReactNative from 'react-native';
import * as Common from '../../base/common';

type Props = {
    isAdded: boolean;
    onPress: () => void;
    addedImageSource?: number;
    style?: any;
};

type State = {
    anim: ReactNative.Animated.Value;
};

const SAVED_LABEL = 'Saved to your schedule';
const ADD_LABEL = 'Add to my schedule';

class AddToScheduleButton extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            anim: new ReactNative.Animated.Value(props.isAdded ? 1 : 0),
        };
    }

    public render() {
        const colors = this.props.isAdded ? ['#4DC7A4', '#66D37A'] : ['#6A6AD5', '#6F86D9'];

        const addOpacity = {
            opacity: this.state.anim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
            }),
            transform: [{
                translateY: this.state.anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 40],
                }),
            }],
        };

        const addOpacityImage = {
            opacity: this.state.anim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
            }),
            transform: [{
                translateY: this.state.anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 80],
                }),
            }],
        };

        const addedOpacity = {
            opacity: this.state.anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
            }),
            transform: [{
                translateY: this.state.anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-40, 0],
                }),
            }],
        };

        const addedOpacityImage = {
            opacity: this.state.anim.interpolate({
                inputRange: [0.7, 1],
                outputRange: [0, 1],
            }),
            transform: [{
                translateY: this.state.anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-80, 0],
                }),
            }],
        };

        return (
            <ReactNative.TouchableOpacity
                // accessibilityLabel={this.props.isAdded ? SAVED_LABEL : ADD_LABEL}
                accessibilityTraits="button"
                onPress={this.props.onPress}
                activeOpacity={0.9}
                style={[styles.container, this.props.style]}>
                <Common.LinearGradient
                    start={[0.5, 1]} end={[1, 1]}
                    colors={colors}
                    collapsable={false}
                    style={styles.button}>
                    <ReactNative.View style={{ flex: 1 }}>
                        <ReactNative.View style={styles.content as React.ViewStyle} collapsable={false}>
                            <ReactNative.Animated.Image
                                source={this.props.addedImageSource || require('../../../asserts/tabs/schedule/added.png')}
                                style={[styles.icon, addedOpacityImage]}
                                />
                            <ReactNative.Animated.Text style={[styles.caption, addedOpacity]}>
                                <Common.Texts.Text>{SAVED_LABEL.toUpperCase()}</Common.Texts.Text>
                            </ReactNative.Animated.Text>
                        </ReactNative.View>
                        <ReactNative.View style={styles.content as React.ViewStyle}>
                            <ReactNative.Animated.Image
                                source={require('../../../asserts/tabs/schedule/add.png')}
                                style={[styles.icon, addOpacityImage]}
                                />
                            <ReactNative.Animated.Text style={[styles.caption, addOpacity]}>
                                <Common.Texts.Text>{ADD_LABEL.toUpperCase()} </Common.Texts.Text>
                            </ReactNative.Animated.Text>
                        </ReactNative.View>
                    </ReactNative.View>
                </Common.LinearGradient>
            </ReactNative.TouchableOpacity>
        );
    }

    public componentWillReceiveProps(nextProps: Props) {
        if (this.props.isAdded !== nextProps.isAdded) {
            const toValue = nextProps.isAdded ? 1 : 0;
            ReactNative.Animated.spring(this.state.anim, { toValue }).start();
        }
    }
}

const HEIGHT = 50;

let styles = Common.StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: HEIGHT,
        overflow: 'hidden',
    },
    button: {
        flex: 1,
        borderRadius: HEIGHT / 2,
        backgroundColor: 'transparent',
        paddingHorizontal: 40,
    },
    content: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginRight: 12,
    },
    caption: {
        letterSpacing: 1,
        fontSize: 12,
        color: 'white',
    },
});
export { AddToScheduleButton };
// $FlowFixMe
export let __cards__ = (define) => {
    let f;
    setInterval(() => f && f(), 1000);

    define('Inactive', (state = true, update) =>
        <AddToScheduleButton isAdded={state} onPress={() => update(!state)} />);

    define('Active', (state = false, update) =>
        <AddToScheduleButton isAdded={state} onPress={() => update(!state)} />);

    define('Animated', (state = false, update) => {
        f = () => update(!state);
        return <AddToScheduleButton isAdded={state} onPress={() => { } } />;
    });
};
