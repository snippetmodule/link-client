import * as React from 'react';
import *as ReactNative from 'react-native';
const { connect } = require('react-redux');
import * as Common from '../base/common';

import { RatingCard } from './RatingCard';
import { submitSurveyAnswers } from '../actions';
import { Survey } from '../reducers/surveys';
import { Session } from '../reducers/sessions';
import { Dispatch } from '../actions/types';

type Props = {
    sessions?: Array<Session>;
    surveys: Array<Survey>;
    navigator: ReactNative.Navigator;
    dispatch?: Dispatch;
};
type State = {
    selectedIndex: number;
};

@connect(
    (store: any) => ({
        sessions: store.sessions,
    }),
    dispatch=>{dispatch}
)
export class RatingScreen extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            selectedIndex: 0,
        };
    }

    public render() {
        const {surveys} = this.props;
        return (
            <ReactNative.View style={styles.container}>
                <Common.Header
                    style={styles.header}
                    leftItem={{
                        layout: 'icon',
                        title: 'Close',
                        icon: require('../common/BackButtonIcon'),
                        onPress: this.dismiss,
                    }}>
                    <ReactNative.View style={styles.headerContent}>
                        <ReactNative.Text style={styles.title as React.TextStyle}>
                            {surveys.length > 1
                                ? 'Review these sessions'
                                : 'Review this session'
                            }
                        </ReactNative.Text>
                        <Common.PageControl
                            count={surveys.length}
                            selectedIndex={this.state.selectedIndex}
                            />
                    </ReactNative.View>
                </Common.Header>
                <Common.Carousel
                    count={surveys.length}
                    selectedIndex={this.state.selectedIndex}
                    onSelectedIndexChange={this.handleIndexChange}
                    renderCard={this.renderCard}
                    />
            </ReactNative.View>
        );
    }

    private renderCard(index: number): JSX.Element {
        const survey = this.props.surveys[index];
        const session = this.props.sessions.find((s) => s.id === survey.sessionId);
        return (
            <RatingCard
                style={styles.card}
                session={session}
                questions={survey.questions}
                onSubmit={(answers) => this.submitAnswers(index, answers)}
                />
        );
    }

    private submitAnswers(index: number, answers: Array<number>) {
        const survey = this.props.surveys[index];
        this.props.dispatch(submitSurveyAnswers(survey.id, answers)).then(
            () => this.proceedToPage(index + 1)
        );
    }

    private proceedToPage(index: number) {
        if (index < this.props.surveys.length) {
            this.setState({ selectedIndex: index });
        } else {
            this.props.navigator.pop();
            if (ReactNative.Platform.OS === 'android') {
                ReactNative.ToastAndroid.show('Thanks for your review!', ReactNative.ToastAndroid.SHORT);
            }
        }
    }

    private handleIndexChange(selectedIndex: number) {
        this.setState({ selectedIndex });
    }

    private dismiss() {
        this.props.navigator.pop();
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
        fontSize: 14,
        textAlign: 'center',
    },
    card: {
        ios: {
            borderRadius: 2,
            marginHorizontal: 3,
        },
    },
});

// function select(store) {
//     return {
//         sessions: store.sessions,
//     };
// }

// export let RatingScreen = connect(select)(RatingScreenImpl);
