
import * as React from 'react';
import * as ReactNative from 'react-native';

import * as Common from '../base/common';

type Prop = {
    topic: string;
    color: string;
    isChecked: boolean;
    onToggle: () => void;
};
class TopicItem extends React.Component<Prop, any> {

    public render() {
        const { topic, color, isChecked, onToggle } = this.props;
        const style = isChecked
            ? { backgroundColor: color }
            : { borderColor: color, borderWidth: 1 };
        const accessibilityTraits = ['button'];
        if (isChecked) {
            accessibilityTraits.push('selected');
        }
        return (
            <ReactNative.TouchableOpacity
                accessibilityTraits={accessibilityTraits as any}
                activeOpacity={0.8}
                style={styles.container as any}
                onPress={onToggle}>
                <ReactNative.View style={[styles.checkbox, style]} />
                <Common.Texts.Text style={styles.title}>
                    {topic}
                </Common.Texts.Text>
            </ReactNative.TouchableOpacity>
        );
    }
}

const SIZE = 24;

let styles = ReactNative.StyleSheet.create({
    container: {
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    checkbox: {
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE / 2,
        marginRight: 10,
    },
    title: {
        fontSize: 17,
        color: 'white',
        flex: 1,
    },
});

export { TopicItem }
