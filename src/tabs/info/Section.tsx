import * as React from 'react';
import *as ReactNative from 'react-native';
import * as Common from '../../base/common';

type Prop = {
    title: string;
    children?: any;
    style?: any;
};
export class Section extends React.Component<Prop, any> {
    public render() {
        return (
            <ReactNative.View style={[styles.container, this.props.style]}>
                <ReactNative.View style={styles.header as React.ViewStyle}>
                    <Common.Texts.Text style={styles.title}>
                        {this.props.title}
                    </Common.Texts.Text>
                </ReactNative.View>
                {this.props.children}
            </ReactNative.View>
        );
    }
}

let styles = ReactNative.StyleSheet.create({
    container: {
        paddingTop: 60,
        paddingBottom: 0,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
