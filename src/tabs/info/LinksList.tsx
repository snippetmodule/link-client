import * as React from 'react';
import *as ReactNative from 'react-native';
import * as Common from '../../base/common';
import { Section } from './Section';
type Prop = {
    title: string;
    links: {
        logo?: string;
        title: string;
        url?: string;
        onPress?: () => void;
    }[];
};
export class LinksList extends React.Component<Prop,any> {
    public render() {
        let content = this.props.links.map(
            (link) => <Row link={link} key={link.title} />
        );
        return (
            <Section title={this.props.title}>
                <Common.ItemsWithSeparator separatorStyle={styles.separator}>
                    {content}
                </Common.ItemsWithSeparator>
            </Section>
        );
    }
}
type RowProp = {
    link: {
        logo?: string;
        title: string;
        url?: string;
        onPress?: () => void;
    };
};
class Row extends React.Component<RowProp,any> {
    public render() {
        let {logo, title} = this.props.link;
        let image = logo && <ReactNative.Image style={styles.picture} source={{ uri: logo }} />;
        return (
            <Common.Touchable onPress={this.handlePress.bind(this)}>
                <ReactNative.View style={styles.row as React.ViewStyle}>
                    {image}
                    <Common.Texts.Text style={styles.title} numberOfLines={2}>
                        {title}
                    </Common.Texts.Text>
                    <ReactNative.Image source={require('../../../asserts/base/common/disclosure.png')} />
                </ReactNative.View>
            </Common.Touchable>
        );
    }

    private handlePress() {
        let {url, onPress} = this.props.link;
        if (onPress) {
            onPress();
        }
        if (url) {
            ReactNative.Linking.openURL(url);
        }
    }
}

const IMAGE_SIZE = 44;

let  styles = ReactNative.StyleSheet.create({
    separator: {
        marginHorizontal: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        height: 60,
    },
    picture: {
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        borderRadius: IMAGE_SIZE / 2,
        marginRight: 16,
    },
    title: {
        fontSize: 17,
        color: Common.Colors.darkText,
        flex: 1,
    },
    button: {
        padding: 10,
    },
    like: {
        letterSpacing: 1,
        color: Common.Colors.actionText,
        fontSize: 12,
    },
});

