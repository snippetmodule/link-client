
import * as React from 'react';
import *as ReactNative from 'react-native';

import * as Common from '../../base/common';

// let LinearGradient = require('react-native-linear-gradient');

class SessionsSectionHeader extends React.Component<{ title: string }, any> {

    public render() {
        return (
            <Common.LinearGradient colors={['#F4F6F7', '#EBEEF1']} style={styles.header}>
                <Common.Texts.Text style={styles.label}>
                    {this.props.title}
                </Common.Texts.Text>
            </Common.LinearGradient>
        );
    }
}

let styles = ReactNative.StyleSheet.create({
    header: {
        height: 32,
        justifyContent: 'center',
        paddingLeft: 17,
    },
    label: {
        color: Common.Colors.lightText,
    },
});

export { SessionsSectionHeader }
