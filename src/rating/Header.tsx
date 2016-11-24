import * as React from 'react';
import *as ReactNative from 'react-native';
import * as Common from '../base/common';
import { Session } from '../reducers/sessions';

type Props = {
    session: Session;
};
export function Header({session}: Props) {
    const pics: JSX.Element[] = session.speakers.map((speaker) => (
        <ReactNative.Image
            key={speaker.id}
            source={{ uri: speaker.pic }}
            style={styles.pic}
            />
    ));
    return (
        <ReactNative.View style={styles.container as React.ViewStyle}>
            <ReactNative.View style={styles.background as React.ViewStyle}>
                <ReactNative.Image source={require('../../asserts/rating/header.png')} />
            </ReactNative.View>
            <Common.Texts.Text style={styles.title}>
                {session.title}
            </Common.Texts.Text>
            <ReactNative.View style={styles.speakers as React.ViewStyle}>
                {pics}
            </ReactNative.View>
        </ReactNative.View>
    );
}

let styles = ReactNative.StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 170,
        paddingHorizontal: 10,
    },
    background: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    label: {
        fontSize: 12,
        color: Common.Colors.lightText,
        letterSpacing: 1,
    },
    title: {
        marginTop: 10,
        fontSize: 17,
        fontWeight: 'bold',
        color: Common.Colors.darkText,
        textAlign: 'center',
    },
    speakers: {
        marginTop: 15,
        flexDirection: 'row',
    },
    pic: {
        width: 40,
        height: 40,
        borderRadius: 20,
        margin: 2,
    },
});
export let __cards__ = (define) => {
    const MOCK_SESSION = {
        id: 'mock1',
        title: 'Building For the Next Billion',
        speakers: [
            {
                id: '1',
                bio: '',
                name: 'Foo',
                title: '',
                pic: 'https://graph.facebook.com/100001244322535/picture?width=60&height=60',
            },
            {
                id: '2',
                bio: '',
                name: 'Bar',
                title: '',
                pic: 'https://graph.facebook.com/10152531777042364/picture?width=60&height=60',
            },
        ],
        day: 1,
        allDay: false,
        description: '...',
        startTime: 0,
        endTime: 0,
        hasDetails: true,
        location: 'space',
        map: 'space',
        onMySchedule: false,
        slug: 'next-billion',
        tags: [],
    };

    define('Example', (state = null, update) => (
        <Header session={MOCK_SESSION} />
    ));

    define('Long title', () => (
        <Header session={{
            ...MOCK_SESSION,
            title: 'Inside Facebook\'s Infrastructure (Part 1): The System that Serves Billions',
            speakers: [],
        }} />
    ));
};
