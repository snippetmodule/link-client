import * as React from 'react';
import *as ReactNative from 'react-native';
import * as Common from '../../base/common';

import { Parse } from 'parse/react-native';
// const {AppEventsLogger} = require('react-native-fbsdk');
import { formatTime } from './formatTime';
import { SessionDetails } from './SessionDetails';
import { loadFriendsSchedules, shareSession, Dispatch } from '../../actions';
import { Session } from '../../reducers/sessions';

type Context = {
    rowIndex: number; // TODO: IndexWithinSection
    sectionLength: number;
    sectionTitle: string;
};

type Props = {
    allSessions?: { [sectionID: string]: { [sessionID: string]: Session } };
    session: Session;
    navigator: ReactNative.Navigator;
    dispatch: Dispatch;
};
type State = {
    day: number;
    count: number;
    selectedIndex: number;
    flatSessionsList: Array<Session>;
    contexts: Array<Context>;
}
export class SessionsCarousel extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        let flatSessionsList = [];
        let contexts: Array<Context> = [];
        let allSessions = this.props.allSessions;
        if (!allSessions) {
            const {session} = this.props;
            allSessions = {
                [formatTime(session.startTime)]: { [session.id]: session }
            };
        }

        // TODO: Add test
        for (let sectionID in allSessions) {
            const sectionLength = Object.keys(allSessions[sectionID]).length;
            let rowIndex = 0;
            for (let sessionID in allSessions[sectionID]) {
                const session = allSessions[sectionID][sessionID];
                flatSessionsList.push(session);
                contexts.push({
                    rowIndex,
                    sectionLength,
                    sectionTitle: sectionID,
                });
                rowIndex++;
            }
        }

        const selectedIndex = flatSessionsList.findIndex((s) => s.id === this.props.session.id);
        if (selectedIndex === -1) {
            console.log(this.props.session);
            console.log(flatSessionsList);
        }

        this.state = {
            day: this.props.session.day,
            count: flatSessionsList.length,
            selectedIndex,
            flatSessionsList,
            contexts,
        };
    }

    public render() {
        let {rowIndex, sectionLength, sectionTitle} = this.state.contexts[this.state.selectedIndex];
        let rightItem;
        if (ReactNative.Platform.OS === 'android') {
            rightItem = {
                title: 'Share',
                icon: require('./img/share.png'),
                onPress: this.shareCurrentSession,
            };
        }
        return (
            <ReactNative.View style={styles.container}>
                <Common.Header
                    style={styles.header}
                    leftItem={{
                        layout: 'icon',
                        title: 'Close',
                        icon: require('../../../asserts/base/common/BackButtonIcon'),
                        onPress: this.dismiss,
                    }}
                    rightItem={rightItem}>
                    <ReactNative.View style={styles.headerContent}>
                        <Common.Texts.Text style={styles.title}>
                            <Common.Texts.Text style={styles.day}>DAY {this.state.day}</Common.Texts.Text>
                            {'\n'}
                            <Common.Texts.Text style={styles.time}>{sectionTitle}</Common.Texts.Text>
                        </Common.Texts.Text>
                        <Common.PageControl
                            count={sectionLength}
                            selectedIndex={rowIndex}
                            />
                    </ReactNative.View>
                </Common.Header>
                <Common.Carousel
                    count={this.state.count}
                    selectedIndex={this.state.selectedIndex}
                    onSelectedIndexChange={this.handleIndexChange}
                    renderCard={this.renderCard}
                    />
            </ReactNative.View>
        );
    }

    private renderCard(index: number) {
        return (
            <SessionDetails
                style={styles.card}
                navigator={this.props.navigator}
                session={this.state.flatSessionsList[index]}
                onShare={this.shareCurrentSession}
                />
        );
    }

    private shareCurrentSession() {
        const session = this.state.flatSessionsList[this.state.selectedIndex];
        this.props.dispatch(shareSession(session));
    }

    public componentDidMount() {
        this.track(this.state.selectedIndex);
        this.props.dispatch(loadFriendsSchedules());
    }

    private dismiss() {
        this.props.navigator.pop();
    }

    private handleIndexChange(selectedIndex: number) {
        this.track(selectedIndex);
        this.setState({ ...this.state, selectedIndex });
    }

    private track(index: number) {
        const {id} = this.state.flatSessionsList[index];
        Parse.Analytics.track('view', { id });
        // AppEventsLogger.logEvent('View Session', 1, { id });
    }
}

let styles = Common.StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        android: {
            backgroundColor: '#5597B8',
        },
    },
    headerContent: {
        android: {
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'center',
        },
        ios: {
            height: 65,
            alignItems: 'center',
            justifyContent: 'center',
        },
    },
    title: {
        color: 'white',
        fontSize: 12,
        ios: {
            textAlign: 'center',
        },
    },
    day: {
        ios: {
            fontWeight: 'bold',
        },
        android: {
            fontSize: 9,
        },
    },
    time: {
        android: {
            fontWeight: 'bold',
            fontSize: 17,
        }
    },
    card: {
        ios: {
            borderRadius: 2,
            marginHorizontal: 3,
        },
    },
});

// export let SessionsCarusel = connect()(SessionsCaruselImpl);
