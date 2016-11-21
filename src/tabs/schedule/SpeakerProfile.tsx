import * as React from 'react';
import *as ReactNative from 'react-native';
import * as Common from '../../base/common';
import { connect } from 'react-redux';

import { Speaker } from '../../reducers/';
type Prop = {
    speaker: Speaker
}
export let SpeakerProfile = React.createClass<Prop, void>({
    render: function () {
        let speaker = this.props.speaker;
        return (
            <ReactNative.View style={styles.row as React.ViewStyle}>
                <ReactNative.Image style={styles.picture} source={{ uri: speaker.pic }} />
                <ReactNative.View style={styles.info}>
                    <Common.Texts.Text style={styles.name}>{speaker.name}</Common.Texts.Text>
                    <Common.Texts.Text style={styles.title}>{speaker.title}</Common.Texts.Text>
                </ReactNative.View>
            </ReactNative.View>
        );
    }
});

const SIZE = 76;

let styles = ReactNative.StyleSheet.create({
    row: {
        flexDirection: 'row',
        paddingBottom: 14,
        alignItems: 'center',
    },
    picture: {
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE / 2,
    },
    info: {
        paddingLeft: 20,
        flex: 1,
    },
    name: {
        fontSize: 15,
        marginBottom: 2,
        color: Common.Colors.darkText,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 12,
        lineHeight: 16,
        color: Common.Colors.darkText,
    },
});
