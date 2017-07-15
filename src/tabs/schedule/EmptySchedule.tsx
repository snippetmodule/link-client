import * as React from 'react';
import * as ReactNative from 'react-native';

import * as Common from '../../base/common';
type Prop = {
    style?: any;
    title?: string;
    image?: number;
    text: string;
    children?: any;
};
class EmptySchedule extends React.Component<Prop, any>{
    public render() {
        const image = this.props.image &&
            <ReactNative.Image style={styles.image as any} source={this.props.image as any} />;
        const title = this.props.title &&
            <Common.Texts.Heading1 style={styles.title}>{this.props.title}</Common.Texts.Heading1>;
        return (
            <ReactNative.View style={[styles.container, this.props.style]}>
                {image}
                {title}
                <Common.Texts.Paragraph style={styles.text}>
                    {this.props.text}
                </Common.Texts.Paragraph>
                {this.props.children}
            </ReactNative.View>
        );
    }
}

const styles = ReactNative.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 30,
        paddingTop: 75,
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        marginBottom: 10,
    },
    image: {
        marginBottom: 10,
    },
    text: {
        textAlign: 'center',
        marginBottom: 35,
    },
});
export { EmptySchedule }
