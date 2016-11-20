import * as React from 'react';
import *as ReactNative from 'react-native';
import { connect } from 'react-redux';
import * as Common from '../../base/common';
import { Section } from './Section';

export class CommonQuestions extends React.Component<any, any> {
    public render() {
        let content = this.props.faqs.map(({question, answer}) =>
            (<Row question={question} answer={answer} key={question} />)
        );
        return (
            <Section title="Common questions">
                <Common.ItemsWithSeparator separatorStyle={styles.separator}>
                    {content}
                </Common.ItemsWithSeparator>
            </Section>
        );
    }
}

class Row extends React.Component<{
    question: string;
    answer: string;
}, { expanded: boolean; }> {
    constructor() {
        super();
        this.state = { expanded: false };
    }

    public render() {
        let answer;
        if (this.state.expanded) {
            answer = (
                <ReactNative.View style={styles.answer}>
                    <Common.Texts.Text style={styles.text}>
                        {this.props.answer}
                    </Common.Texts.Text>
                </ReactNative.View>
            );
        }
        return (
            <ReactNative.View >
                <Common.Touchable onPress={() => this.toggle()}>
                    <ReactNative.View style={styles.question as React.ViewStyle} >
                        <Common.Texts.Text style={styles.symbol}>
                            {this.state.expanded ? '\u2212' : '+'}
                        </Common.Texts.Text>
                        <Common.Texts.Text style={styles.text}>
                            {this.props.question}
                        </Common.Texts.Text>
                    </ReactNative.View>
                </Common.Touchable>
                {answer}
            </ReactNative.View>
        );
    }

    private toggle() {
        ReactNative.LayoutAnimation.configureNext(ReactNative.LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded: !this.state.expanded });
    }
}

let styles = ReactNative.StyleSheet.create({
    separator: {
        marginHorizontal: 20,
    },
    question: {
        paddingVertical: 14,
        paddingHorizontal: 20,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    symbol: {
        fontSize: 15,
        lineHeight: 21,
        width: 22,
        color: '#99A7B9',
    },
    answer: {
        padding: 14,
        paddingLeft: 20 + 22,
    },
    text: {
        fontSize: 15,
        lineHeight: 21,
        color: '#002350',
        flex: 1,
    },
});
