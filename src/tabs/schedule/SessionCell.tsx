import * as React from 'react';
import *as ReactNative from 'react-native';
import * as Common from '../../base/common';
// var F8Colors = require('F8Colors');
// var { Text } = require('F8Text');
// var F8Touchable = require('F8Touchable');
let formatDuration = require('./formatDuration');
let formatTime = require('./formatTime');

// var { connect } = require('react-redux');
import { Session } from '../../reducers/sessions';

type Prop = {
    session: Session;
    showTick?: boolean;
    showStartEndTime?: boolean;
    onPress?: () => void;
    style?: any;
};
class SessionCell extends React.Component<Prop, any>{
    public render() {
        let session = this.props.session;
        let tick;
        if (this.props.showTick) {
            tick =
                <ReactNative.Image style={styles.added as React.ImageStyle} source={require('../../../asserts/tabs/schedule/added-cell.png')} />;
        }
        let time;
        if (this.props.showStartEndTime) {
            time = formatTime(session.startTime) + ' - ' + formatTime(session.endTime);
        } else {
            time = formatDuration(session.startTime, session.endTime);
        }
        let location = session.location && session.location.toUpperCase();
        let locationColor = Common.Colors.colorForLocation(location);
        let cell =
            <ReactNative.View style={[styles.cell, this.props.style]}>
                <ReactNative.View style={styles.titleSection as React.ViewStyle}>
                    <Common.Texts.Text numberOfLines={2} style={styles.titleText}>
                        {session.title}
                    </Common.Texts.Text>
                </ReactNative.View>
                <Common.Texts.Text numberOfLines={1} style={styles.duration}>
                    <Common.Texts.Text style={[styles.locationText, { color: locationColor }]}>
                        {location}
                    </Common.Texts.Text>
                    {location && ' - '}
                    {time}
                </Common.Texts.Text>
                {tick}
            </ReactNative.View>;

        if (this.props.onPress) {
            cell =
                <Common.Touchable onPress={this.props.onPress}>
                    {cell}
                </Common.Touchable>;
        }

        return cell;
    }
}


let styles = ReactNative.StyleSheet.create({
    cell: {
        paddingVertical: 15,
        paddingLeft: 17,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    titleSection: {
        paddingRight: 9,
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleAndDuration: {
        justifyContent: 'center',
    },
    titleText: {
        flex: 1,
        fontSize: 17,
        lineHeight: 24,
        color: Common.Colors.darkText,
        marginBottom: 4,
        marginRight: 10,
    },
    duration: {
        fontSize: 12,
        color: Common.Colors.lightText,
    },
    locationText: {
        fontSize: 12,
    },
    added: {
        position: 'absolute',
        backgroundColor: 'transparent',
        right: 0,
        top: 0,
    },
});

function select(store, props) {
    return {
        showTick: !!store.schedule[props.session.id],
    };
}

export { SessionCell }
