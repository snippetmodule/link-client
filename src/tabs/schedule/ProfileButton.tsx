import * as React from 'react';
import *as ReactNative from 'react-native';
import * as Common from '../../base/common';


export class ProfileButton extends React.Component<any, void> {
    public render() {
        return (
            <ReactNative.Image
                source={{ uri: `http://graph.facebook.com/${this.props.user.id}/picture` }}
                style={styles.profilePic}
                />
        );
    }
}

let styles = Common.StyleSheet.create({
    profilePic: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
});
