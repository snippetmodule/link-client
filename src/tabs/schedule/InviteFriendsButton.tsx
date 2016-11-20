import * as React from 'react';
import *as ReactNative from 'react-native';
import { connect } from 'react-redux';
import * as Common from '../../base/common';

// var {AppInviteDialog, AppEventsLogger} = require('react-native-fbsdk');
type Prop = {
    appLinkURL: string;
    appInvitePreviewImageURL: string;
    style: any;
};
class InviteFriendsButtonImpl extends React.Component<Prop, any> {
    public render() {
        const {appLinkURL, style} = this.props;
        if (!appLinkURL) {
            return null;
        }

        return (
            <Common.Button
                style={style}
                caption="Invite friends to the F8 app"
                onPress={() => this.inviteFriends()}
                />
        );
    }

    private inviteFriends() {
        // AppEventsLogger.logEvent('Invite Friends', 1);
        // AppInviteDialog.show({
        //     applinkUrl: this.props.appLinkURL,
        //     previewImageUrl: this.props.appInvitePreviewImageURL,
        // }).catch((error) => {
        //     if (error.message) {
        //         alert(error.message);
        //     }
        // });
    }
}

function select(store) {
    return {
        appLinkURL: store.config.appLinkURL,
        appInvitePreviewImageURL: store.config.appInvitePreviewImageURL,
    };
}

export let InviteFriendsButton = connect(select)(InviteFriendsButtonImpl);
