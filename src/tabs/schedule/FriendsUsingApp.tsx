import * as React from 'react';
import * as ReactNative from 'react-native';
import * as Common from '../../base/common';
const { connect } = require('react-redux');

type Prop = {
    friends?: Array<{ id: string; name: string }>;
};
@connect(
    (store) => ({
        friends: store.friendsSchedules,
    }),
)
export class FriendsUsingApp extends React.Component<Prop, any> {

    public render() {
        const {friends} = this.props;
        if (friends.length === 0) {
            return null;
        }
        const pictures = friends.slice(0, 3).map((friend) => (
            <ReactNative.Image
                key={friend.id}
                source={{ uri: `http://graph.facebook.com/${friend.id}/picture` }}
                style={styles.profilePic}
                />
        ));
        let text = `${friends.length} friends are sharing their schedules.`;
        if (friends.length === 1) {
            text = `${friends[0].name.split(' ')[0]} is sharing their schedule.`;
        }
        return (
            <ReactNative.View style={styles.container as any}>
                {pictures}
                <Common.Texts.Text style={styles.text}>
                    {text}
                </Common.Texts.Text>
            </ReactNative.View>
        );
    }
}

let styles = Common.StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profilePic: {
        width: 20,
        height: 20,
        marginRight: -3,
        borderRadius: 10,
    },
    text: {
        fontSize: 12,
        marginLeft: 13,
        color: Common.Colors.lightText,
    },
});

// function select(store) {
//     return {
//         friends: store.friendsSchedules,
//     };
// }

// export let FriendsUsingApp = connect(select)(FriendsUsingAppImpl);
