import * as React from 'react';
import * as ReactNative from 'react-native';
import * as Common from '../../base/common';
const { connect } = require('react-redux');
import { UserState as User } from '../../reducers/user';
type Prop = {
    user?: User;
    style?: any;
};
@connect(
    (store: any) => ({
        user: store.user,
    }),
)
export class SharingSettingsCommon extends React.Component<Prop, any> {
    public render() {
        const { user } = this.props;
        const title = user.name && user.id && (
            <ReactNative.View style={styles.title as any}>
                <Common.ProfilePicture userID={user.id} size={24} />
                <Common.Texts.Text style={styles.name}>
                    {user.name.split(' ')[0] + "'"}s Schedule
                 </Common.Texts.Text>
            </ReactNative.View>
        );
        return (
            <ReactNative.View style={[styles.container, this.props.style]}>
                <ReactNative.Image style={styles.image as any} source={require('../../../asserts/tabs/schedule/sharing-nux.png')}>
                    {title}
                </ReactNative.Image>
                <ReactNative.View style={styles.content as any} >
                    <Common.Texts.Heading1 style={styles.h1}>
                        Let friends view your schedule in the F8 app?
                    </Common.Texts.Heading1>
                    <Common.Texts.Paragraph style={styles.p}>
                        This will not post to Facebook. Only friends using the F8 app will
            be able to see your schedule in their My F8 tab.
          </Common.Texts.Paragraph>
                </ReactNative.View>
            </ReactNative.View>
        );
    }
}

let styles = Common.StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    image: {
        height: 250,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        padding: 18,
        alignItems: 'center',
    },
    h1: {
        textAlign: 'center',
    },
    p: {
        marginTop: 10,
        textAlign: 'center',
    },
    title: {
        marginTop: 40,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    name: {
        fontSize: 12,
        color: 'white',
        marginLeft: 10,
        fontWeight: 'bold',
    },
});

// function select(store) {
//     return {
//         user: store.user,
//     };
// }

// export let SharingSettingsCommon = connect(select)(SharingSettingsCommonImpl);
