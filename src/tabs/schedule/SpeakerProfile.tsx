import * as React from 'react';
import * as ReactNative from 'react-native';
import * as Common from '../../base/common';

import { Speaker } from '../../reducers/sessions';
type Prop = {
    speaker: Speaker;
};
export class SpeakerProfile extends React.Component<Prop, any>{
    public render() {
        let speaker = this.props.speaker;
        return (
            <ReactNative.View style={styles.row as any}>
                <ReactNative.Image style={styles.picture} source={{ uri: speaker.pic }} />
                <ReactNative.View style={styles.info}>
                    <Common.Texts.Text style={styles.name}>{speaker.name}</Common.Texts.Text>
                    <Common.Texts.Text style={styles.title}>{speaker.title}</Common.Texts.Text>
                </ReactNative.View>
            </ReactNative.View>
        );
    }
}

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
