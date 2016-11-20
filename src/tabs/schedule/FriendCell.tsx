import * as React from 'react';
import *as ReactNative from 'react-native';
import * as Common from '../../base/common';
import { connect } from 'react-redux';

import { FriendsSchedule } from '../../reducers/friendsSchedules';
type Prop = {
    friend: FriendsSchedule;
    onPress?: () => void;
}
export class FriendCell extends React.Component<Prop, any> {
    public render() {
        const {friend} = this.props;
        const hasSchedule = friend.schedule && Object.keys(friend.schedule).length > 0;
        const auxView = hasSchedule
            ? <ReactNative.Image source={require('../../common/img/disclosure.png')} />
            : <Common.Texts.Text style={styles.private}>PRIVATE</Common.Texts.Text>;

        const cell = (
            <ReactNative.View style={styles.cell as React.ViewStyle}>
                <Common.ProfilePicture userID={friend.id} size={42} />
                <Common.Texts.Text style={styles.name}>
                    {friend.name}
                </Common.Texts.Text>
                {auxView}
            </ReactNative.View>
        );

        if (!hasSchedule) {
            return cell;
        }
        return (
            <ReactNative.TouchableHighlight underlayColor="#3C5EAE" onPress={this.props.onPress}>
                {cell}
            </ReactNative.TouchableHighlight>
        );
    }
}


let styles = ReactNative.StyleSheet.create({
    cell: {
        height: 60,
        paddingHorizontal: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    name: {
        flex: 1,
        fontSize: 17,
        marginHorizontal: 10,
        color: Common.Colors.darkText,
    },
    private: {
        color: Common.Colors.lightText,
    }
});
