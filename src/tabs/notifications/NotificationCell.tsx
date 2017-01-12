import * as React from 'react';
import * as ReactNative from 'react-native';
const { connect } = require('react-redux');
import * as Common from '../../base/common';

import { findSessionByURI } from './findSessionByURI';
import { Session } from '../../reducers/sessions';
import { SessionCell } from '../schedule/SessionCell';
import * as moment from 'moment';

type Prop = {
    session?: Session;
    isSeen?: boolean;
    notification: { url: string, text: string, time: any };
    onPress: () => void;
}
@connect(
    (store, props) => ({
        session: findSessionByURI(store.sessions, props.notification.url),
        isSeen: store.notifications.seen[props.notification.id],
    }),
)
export class NotificationCell extends React.Component<Prop, any> {
    public render() {
        let attachment;
        if (this.props.session) {
            attachment = (
                <SessionCell
                    style={styles.session}
                    session={this.props.session}
                    showStartEndTime={true}
                />
            );
        } else if (this.props.notification.url) {
            attachment = <Common.Texts.Text style={styles.url}>{this.props.notification.url}</Common.Texts.Text>;
        }
        return (
            <ReactNative.TouchableHighlight onPress={this.props.onPress}>
                <ReactNative.View style={[styles.cell, !this.props.isSeen && styles.unseen]}>
                    <Common.Texts.Text style={styles.text}>
                        {this.props.notification.text}
                    </Common.Texts.Text>
                    {attachment}
                    <ReactNative.View style={styles.footer as React.ViewStyle}>
                        <Common.Texts.Text style={styles.time}>
                            {moment(this.props.notification.time).fromNow()}
                        </Common.Texts.Text>
                    </ReactNative.View>
                </ReactNative.View>
            </ReactNative.TouchableHighlight>
        );
    }
}

let styles = ReactNative.StyleSheet.create({
    cell: {
        padding: 15,
        backgroundColor: 'white',
    },
    unseen: {
        paddingLeft: 12,
        borderLeftWidth: 3,
        borderLeftColor: '#4D99EF',
    },
    text: {
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 10,
    },
    session: {
        paddingVertical: undefined,
        paddingHorizontal: undefined,
        paddingLeft: undefined,
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: Common.Colors.cellBorder,
        // overflow: 'hidden',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#eee',
        shadowOpacity: 1,
    },
    footer: {
        flexDirection: 'row',
    },
    url: {
        flex: 1,
        color: Common.Colors.actionText,
        fontSize: 12,
        marginBottom: 10,
    },
    time: {
        color: Common.Colors.lightText,
        fontSize: 12,
    },
});

// function select(store, props) {
//     return {
//         session: findSessionByURI(store.sessions, props.notification.url),
//         isSeen: store.notifications.seen[props.notification.id],
//     };
// }

// export let NotificationCell = connect(select)(NotificationCellImpl);
