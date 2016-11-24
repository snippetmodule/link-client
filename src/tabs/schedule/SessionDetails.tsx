import * as React from 'react';
import *as ReactNative from 'react-native';
import * as Common from '../../base/common';
import { connect } from 'react-redux';

import { FriendGoing } from './FriendGoing';
import { SpeakerProfile } from './SpeakerProfile';
import { AddToScheduleButton } from './AddToScheduleButton';
import { formatDuration } from './formatDuration';
import { addToSchedule, removeFromScheduleWithPrompt } from '../../actions';
import { FriendsSchedule } from '../../reducers/friendsSchedules';
import { Map } from '../../reducers/maps';
let Subscribable = require('Subscribable');

type Prop = {
    isAddedToSchedule: boolean;
    isLoggedIn: boolean;
    sharedSchedule: boolean;
    sessionURLTemplate: string;
    topics: string[];
    friendsGoing: FriendsSchedule[];
    map: Map[];
    addToSchedule: () => void;
    removeFromScheduleWithPrompt: () => void;
};
type State = {
    scrollTop: ReactNative.Animated.Value;
};

let SessionDetailsImpl = React.createClass<Prop, State>({
    mixins: [Subscribable.Mixin],
    getInitialState: () => {
        return {
            scrollTop: new ReactNative.Animated.Value(0),
        };
    },
    propTypes: {
        isAddedToSchedule: React.PropTypes.bool,
        isLoggedIn: React.PropTypes.bool,
        sharedSchedule: React.PropTypes.bool,
        sessionURLTemplate: React.PropTypes.string,
        topics: React.PropTypes.array,
        friendsGoing: React.PropTypes.array,
        map: React.PropTypes.array,
        addToSchedule: React.PropTypes.func,
        removeFromScheduleWithPrompt: React.PropTypes.func,
    },
    render: () => {
        let speakersProfiles = this.props.session.speakers.map(
            (speaker) => (
                <SpeakerProfile
                    key={speaker.name}
                    speaker={speaker}
                    />
            )
        );

        let topics = null;
        let {tags} = this.props.session;
        if (tags && tags.length > 0) {
            topics = (
                <Common.Texts.Text style={styles.topics}>
                    TOPICS: {tags.join(', ')}
                </Common.Texts.Text>
            );
        }

        let friendsGoing = this.props.friendsGoing.map(
            (friend) => (
                <FriendGoing
                    key={friend.id}
                    friend={friend}
                    onPress={() => this.props.navigator.push({ friend })}
                    />
            )
        );

        let inlineMap;
        if (this.props.map) {
            inlineMap = <Common.MapView map={this.props.map} />;
        }

        let locationColor = Common.Colors.colorForLocation(this.props.session.location);
        let locationTitle = this.props.session.location && this.props.session.location.toUpperCase();
        let location = (
            <Common.Texts.Text style={[styles.location, { color: locationColor }]}>
                {locationTitle}
                <Common.Texts.Text style={styles.time}>
                    {locationTitle && ' - '}
                    {formatDuration(this.props.session.startTime, this.props.session.endTime)}
                </Common.Texts.Text>
            </Common.Texts.Text>
        );

        let title = this.props.session.title || '';
        let isReactTalk = title.indexOf('React') > -1;

        return (
            <ReactNative.View style={[styles.container, this.props.style]}>
                <ReactNative.ScrollView
                    contentContainerStyle={styles.contentContainer}
                    onScroll={({nativeEvent}) => this.state.scrollTop.setValue(nativeEvent.contentOffset.y)}
                    scrollEventThrottle={100}
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustContentInsets={false}>
                    {location}
                    <Common.Texts.Text style={styles.title}>
                        {title}
                    </Common.Texts.Text>
                    <Common.Texts.Text style={styles.description}>
                        {this.props.session.description}
                    </Common.Texts.Text>
                    <Section>
                        {topics}
                    </Section>
                    <Section>
                        {speakersProfiles}
                    </Section>
                    <Section title="Friends Going">
                        {friendsGoing}
                    </Section>
                    {inlineMap}
                    <ReactNative.TouchableOpacity
                        // accessibilityLabel="Share this session"
                        accessibilityTraits="button"
                        onPress={this.props.onShare}
                        style={styles.shareButton as React.ViewStyle}>
                        <ReactNative.Image source={require('../../../asserts/tabs/schedule/share.png')} />
                    </ReactNative.TouchableOpacity>
                </ReactNative.ScrollView>
                <ReactNative.View style={styles.actions as React.ViewStyle}>
                    <AddToScheduleButton
                        addedImageSource={isReactTalk ? require('../../../asserts/tabs/schedule/added-react.png') : null}
                        isAdded={this.props.isAddedToSchedule}
                        onPress={this.toggleAdded}
                        />
                </ReactNative.View>
                <ReactNative.Animated.View style={[
                    styles.miniHeader,
                    {
                        opacity: this.state.scrollTop.interpolate({
                            inputRange: [0, 150, 200],
                            outputRange: [0, 0, 1],
                            extrapolate: 'clamp',
                        }),
                    }]}>
                    <Common.Texts.Text numberOfLines={1} style={styles.miniTitle}>
                        {title}
                    </Common.Texts.Text>
                    {location}
                </ReactNative.Animated.View>
            </ReactNative.View>
        );
    },

    toggleAdded: () => {
        if (this.props.isAddedToSchedule) {
            this.props.removeFromScheduleWithPrompt();
        } else {
            this.addToSchedule();
        }
    },

    addToSchedule: () => {
        if (!this.props.isLoggedIn) {
            this.props.navigator.push({
                login: true, // TODO: Proper route
                callback: this.addToSchedule,
            });
        } else {
            this.props.addToSchedule();
            if (this.props.sharedSchedule === null) {
                setTimeout(() => this.props.navigator.push({ share: true }), 1000);
            }
        }
    },
});

type SectionProp = {
    title?: string;
    children?: any;
}
class Section extends React.Component<SectionProp, any> {
    public render() {
        let {children} = this.props;
        if (React.Children.count(children) === 0) {
            return null;
        }
        let header;
        if (this.props.title) {
            header = (
                <ReactNative.View style={styles.sectionHeader as React.ViewStyle}>
                    <Common.Texts.Text style={styles.sectionTitle}>
                        {this.props.title.toUpperCase()}
                    </Common.Texts.Text>
                    <Common.LinearGradient
                        start={[0, 0]} end={[1, 0]}
                        colors={['#E1E1E1', 'white']}
                        style={styles.line}
                        />
                </ReactNative.View>
            );
        }
        return (
            <ReactNative.View style={styles.section}>
                {header}
                {children}
            </ReactNative.View>
        );
    }
}

let PADDING = 15;

let styles = Common.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    contentContainer: {
        padding: 26,
        paddingBottom: 60,
    },
    miniHeader: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        left: 12,
        top: 0,
        right: 12,
        paddingVertical: 9,
        borderBottomWidth: 1 / ReactNative.PixelRatio.get(),
        borderBottomColor: '#E1E1E1',
    },
    miniTitle: {
        fontSize: 12,
        flex: 1,
        color: Common.Colors.darkText,
    },
    location: {
        fontSize: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: -1,
        lineHeight: 32,
        marginVertical: 20,
    },
    time: {
        color: Common.Colors.lightText,
        marginBottom: 20,
    },
    description: {
        fontSize: 17,
        lineHeight: 25,
    },
    topics: {
        fontSize: 12,
        color: Common.Colors.lightText,
    },
    section: {
        marginTop: 30,
    },
    sectionHeader: {
        flexDirection: 'row',
        marginBottom: 15,
        alignItems: 'center',
    },
    sectionTitle: {
        color: Common.Colors.lightText,
        marginRight: 14,
        fontSize: 12,
    },
    line: {
        height: 1 / ReactNative.PixelRatio.get(),
        backgroundColor: Common.Colors.lightText,
        flex: 1,
    },
    actions: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        borderTopWidth: 1,
        margin: 10,
        paddingVertical: 10,
        borderTopColor: '#eeeeee',
        backgroundColor: 'white',
    },
    shareButton: {
        backgroundColor: 'transparent',
        padding: PADDING,
        position: 'absolute',
        right: 0,
        top: 0,
    },
});

function select(store, props) {
    const sessionID = props.session.id;
    const friendsGoing = store.friendsSchedules.filter((friend) => friend.schedule[sessionID]);
    const map = store.maps.find(({name}) => name === props.session.location);

    return {
        isAddedToSchedule: !!store.schedule[props.session.id],
        isLoggedIn: store.user.isLoggedIn,
        sharedSchedule: store.user.sharedSchedule,
        sessionURLTemplate: store.config.sessionURLTemplate,
        topics: store.topics,
        friendsGoing,
        map,
    };
}

function actions(dispatch, props) {
    let id = props.session.id;
    return {
        addToSchedule: () => dispatch(addToSchedule(id)),
        removeFromScheduleWithPrompt:
        () => dispatch(removeFromScheduleWithPrompt(props.session)),
    };
}

export let SessionDetails = connect(select, actions)(SessionDetailsImpl);
