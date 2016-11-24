import * as React from 'react';
import *as ReactNative from 'react-native';
import * as Common from '../../base/common';

import { FriendsSchedule } from '../../reducers/friendsSchedules';

type Prop = {
    onPress: () => void;
    friend: FriendsSchedule;
};
export class FriendGoing extends React.Component<Prop, any> {
    public render() {
        return (
            <Common.Touchable onPress={this.props.onPress}>
                <ReactNative.View style={styles.container as React.ViewStyle}>
                    <Common.ProfilePicture userID={this.props.friend.id} size={18} />
                    <Common.Texts.Text style={styles.name}>
                        {this.props.friend.name}
                    </Common.Texts.Text>
                    <ReactNative.Image source={require('../../../asserts/base/common/disclosure.png')} />
                </ReactNative.View>
            </Common.Touchable>
        );
    }
}

let styles = Common.StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: 'white',
    },
    name: {
        marginLeft: 10,
        fontSize: 15,
        flex: 1,
    },
});
