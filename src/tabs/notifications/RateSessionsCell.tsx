import * as React from 'react';
import * as ReactNative from 'react-native';
import * as Common from '../../base/common';


type Props = {
    numberOfSessions: number;
    onPress: () => void;
};

export function RateSessionsCell({ numberOfSessions, onPress }: Props) {
    const pluralSuffix = numberOfSessions === 1 ? '' : 's';
    return (
        <ReactNative.View style={styles.cell as React.ViewStyle}>
            <ReactNative.Image
                style={styles.star}
                source={require('../../../asserts/rating/full-star.png')}
            />
            <Common.Texts.Text style={styles.text}>
                You have {numberOfSessions} session{pluralSuffix} to review
            </Common.Texts.Text>

            <ReactNative.TouchableOpacity accessibilityTraits="button" onPress={onPress}>
                <ReactNative.View style={styles.button as React.ViewStyle}>
                    <Common.Texts.Text style={styles.caption}>
                        REVIEW
                    </Common.Texts.Text>
                </ReactNative.View>
            </ReactNative.TouchableOpacity>
        </ReactNative.View>
    );
}

let styles = ReactNative.StyleSheet.create({
    cell: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'white',
    },
    star: {
        width: 20,
        height: 20,
        marginRight: 8,
        marginBottom: 2,
    },
    text: {
        fontSize: 15,
        color: Common.Colors.darkText,
        flex: 1,
    },
    button: {
        backgroundColor: '#6F86D9',
        height: 30,
        paddingHorizontal: 20,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    caption: {
        color: 'white',
        letterSpacing: 1,
        fontSize: 12,
    },
});

