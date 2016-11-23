import * as React from 'react';
import *as ReactNative from 'react-native';
const { connect } = require('react-redux');
import * as Common from '../base/common';

import { TopicItem } from './TopicItem';
import {
    applyTopicsFilter,
    Dispatch,
} from '../actions';
// const F8Header = require('F8Header');
// const F8Colors = require('F8Colors');
// const F8Button = require('F8Button');
// const shallowEqual = require('fbjs/lib/shallowEqual');
type Prop = {
    isLoggedIn?: boolean,
    topics?: Array<string>;
    selectedTopics?: { [id: string]: boolean };
    friendsSchedules?: any;
    dispatch?: Dispatch;
    navigator: any;
    onClose?: () => void;
};
type State = {
    selectedTopics: { [id: string]: boolean };
    anim: ReactNative.Animated.Value;
}
@connect(
    (store: any) => ({
        isLoggedIn: store.user.isLoggedIn,
        friendsSchedules: store.friendsSchedules,
        topics: store.topics,
        selectedTopics: store.filter,
    }),
    dispatch => ({ dispatch: dispatch })
)
export class FilterScreen extends React.Component<Prop, State> {
    constructor(props) {
        super(props);
        this.state = {
            selectedTopics: { ...this.props.selectedTopics },
            anim: new ReactNative.Animated.Value(0),
        };
    }

    public componentWillReceiveProps(nextProps) {
        if (this.props.selectedTopics !== nextProps.selectedTopics) {
            this.setState({ selectedTopics: { ...nextProps.selectedTopics }, anim: new ReactNative.Animated.Value(0) });
        }
    }

    public componentWillUpdate(nextProps, nextState) {
        if (this.state.selectedTopics !== nextState.selectedTopics) {
            // const changedTopics = !shallowEqual(
            //     nextProps.selectedTopics,
            //     nextState.selectedTopics,
            // );
            const toValue = 1;//changedTopics ? 1 : 0;
            ReactNative.Animated.spring(this.state.anim, { toValue }).start();
        }
    }

    public render() {
        let bottom = this.state.anim.interpolate({
            inputRange: [0, 1],
            outputRange: [-100, 0],
        });
        let topics = this.props.topics.map((topic, ii) => (
            <TopicItem
                key={topic}
                topic={topic}
                color={Common.Colors.colorForTopic(this.props.topics.length, ii)}
                isChecked={this.state.selectedTopics[topic]}
                onToggle={this.toggleTopic.bind(this, topic)}
                />
        ));
        let selectedAnyTopics = this.props.topics.some(
            (topic) => this.state.selectedTopics[topic]
        );

        let leftItem, rightItem;
        if (this.props.navigator) {
            leftItem = { title: 'Cancel', onPress: this.close };
        }
        if (selectedAnyTopics) {
            rightItem = {
                title: 'Clear',
                icon: require('../common/img/x-white.png'),
                onPress: this.clearFilter,
            };
        }
        return (
            <ReactNative.View style={styles.container}>
                <Common.Header
                    title="Filter"
                    leftItem={leftItem}
                    rightItem={rightItem}
                    />
                <ReactNative.ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollview}>
                    <Common.ItemsWithSeparator separatorStyle={styles.separator}>
                        {topics}
                    </Common.ItemsWithSeparator>
                </ReactNative.ScrollView>
                <ReactNative.Animated.View style={[styles.applyButton, { bottom }]}>
                    <Common.Button
                        caption="Apply filters"
                        onPress={this.applyFilter}
                        />
                </ReactNative.Animated.View>
            </ReactNative.View>
        );
    }

    private toggleTopic(topic: string, value: boolean) {
        let selectedTopics = { ...this.state.selectedTopics };
        value = !selectedTopics[topic];
        if (value) {
            selectedTopics[topic] = true;
        } else {
            delete selectedTopics[topic];
        }
        this.setState({ selectedTopics, anim: new ReactNative.Animated.Value(0) });
    }

    private applyFilter() {
        this.props.dispatch(applyTopicsFilter(this.state.selectedTopics));
        this.close();
    }

    private close() {
        const {navigator, onClose} = this.props;
        if (navigator) {
            requestAnimationFrame(() => navigator.pop());
        }
        if (onClose) {
            onClose();
        }
    }

    private clearFilter() {
        this.setState({ selectedTopics: {}, anim: new ReactNative.Animated.Value(0) });
    }
}

let styles = ReactNative.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1B3B79',
    },
    scrollview: {
        padding: 20,
        paddingBottom: 20 + 49,
    },
    separator: {
        backgroundColor: '#FFFFFF26',
    },
    applyButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        padding: 8,
        backgroundColor: '#1B3B79',
    },
});

// function select(store) {
//   return {
//     isLoggedIn: store.user.isLoggedIn,
//     friendsSchedules: store.friendsSchedules,
//     topics: store.topics,
//     selectedTopics: store.filter,
//   };
// }
// export { FilterScreen }
// module.exports = connect(select)(FilterScreen);
// export let FilterScreen = connect(select)(FilterScreenImpl);