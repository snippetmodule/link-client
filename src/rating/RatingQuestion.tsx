import * as React from 'react';
import *as ReactNative from 'react-native';
import * as Common from '../base/common';

export type Question = {
    text: string;
    lowLabel: string;
    highLabel: string;
};

type Props = {
    question: Question;
    rating?: number;
    onChange: (newRating: number) => void;
    style?: any;
};

export function RatingQuestion({question, rating, onChange, style}: Props) {
    const stars = [1, 2, 3, 4, 5].map(
        (value) => (
            <Star
                key={value}
                value={value}
                isFull={rating && value <= rating}
                onPress={() => onChange(value)}
                />
        )
    );
    return (
        <ReactNative.View style={style}>
            <Common.Texts.Text style={styles.text}>
                {question.text}
            </Common.Texts.Text>
            <ReactNative.View style={styles.stars as React.ViewStyle}>
                {stars}
            </ReactNative.View>
            <ReactNative.View style={styles.labels as React.ViewStyle}>
                <Common.Texts.Text style={styles.label}>
                    {question.lowLabel}
                </Common.Texts.Text>
                <Common.Texts.Text style={styles.label}>
                    {question.highLabel}
                </Common.Texts.Text>
            </ReactNative.View>
        </ReactNative.View>
    );
}

function Star({isFull, value, onPress}) {
    const source = isFull
        ? require('../../asserts/rating/full-star.png')
        : require('../../asserts/rating/empty-star.png');

    const accessibilityTraits: string[] = ['button'];
    if (isFull) {
        accessibilityTraits.push('selected');
    }

    return (
        <ReactNative.TouchableOpacity
            // accessibilityLabel={`${value} stars`}
            accessibilityTraits={accessibilityTraits as any}
            style={styles.star as React.ViewStyle}
            activeOpacity={0.8}
            onPress={onPress}>
            <ReactNative.Image source={source} />
        </ReactNative.TouchableOpacity>
    );
}

let styles = ReactNative.StyleSheet.create({
    text: {
        fontSize: 15,
        color: Common.Colors.darkText,
        textAlign: 'center',
    },
    star: {
        flex: 1,
        padding: 10,
        paddingVertical: 15,
        alignItems: 'center',
    },
    stars: {
        marginHorizontal: -10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    labels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 12,
        color: Common.Colors.lightText,
    },
});

// module.exports = RatingQuestion;
export let __cards__ = (define) => {
    const MOCK_QUESTION = {
        text: 'How likely are you to implement React Native sometime soon?',
        lowLabel: 'Not Likely',
        highLabel: 'Very Likely',
    };
    define('Empty', (state = null, update) => (
        <RatingQuestion
            question={MOCK_QUESTION}
            rating={state}
            onChange={update}
            />
    ));
    define('3 stars', (state = 3, update) => (
        <RatingQuestion
            question={MOCK_QUESTION}
            rating={state}
            onChange={update}
            />
    ));
};
