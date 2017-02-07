import * as React from 'react';
import * as ReactNative from 'react-native';
import * as Common from '../base/common';

import { Header } from './Header';
import { RatingQuestion } from './RatingQuestion';

import { Question } from '../reducers/surveys';
import { Session } from '../reducers/sessions';

type Props = {
    session: Session;
    questions: Question[];
    onSubmit: (answers: number[]) => void;
    style?: any;
};

export class RatingCard extends React.Component<Props, any> {

    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    public render() {
        const questions = this.props.questions.map((question, ii) => (
            <RatingQuestion
                key={ii}
                style={styles.question}
                question={question}
                rating={this.state[ii]}
                onChange={(rating) => this.setState({ [ii]: rating })}
            />
        ));
        const completed = Object.keys(this.state).length === this.props.questions.length;
        return (
            <ReactNative.View style={[styles.container, this.props.style]}>
                <ReactNative.ScrollView>
                    <Header session={this.props.session} />
                    {questions}
                </ReactNative.ScrollView>
                <Common.Button
                    style={styles.button}
                    type={completed ? 'primary' : 'bordered'}
                    caption="Submit Review"
                    onPress={() => completed && this.submit()}
                />
            </ReactNative.View>
        );
    }

    private submit() {
        const answers = this.props.questions.map((_, ii) => this.state[ii]);
        this.props.onSubmit(answers);
    }
}

let styles = ReactNative.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    question: {
        padding: 40,
        paddingVertical: 25,
    },
    button: {
        marginHorizontal: 15,
        marginVertical: 20,
    },
});
