import * as React from 'react';
import * as ReactNative from 'react-native';
import * as Common from '../../base/common';
import { Section } from './Section';

type Props = {
    network: string;
    password: string;
};

type State = {
    copied: boolean;
};

export class WiFiDetails extends React.Component<Props, State> {
    public state: State = {
        copied: false,
    };

    public render() {
        const caption = this.state.copied
            ? 'Copied!'
            : 'Copy password';
        return (
            <Section title="WiFi" style={styles.container}>
                <Common.ItemsWithSeparator>
                    <Row label="Network" value={this.props.network} />
                    <Row label="Password" value={this.props.password} />
                </Common.ItemsWithSeparator>
                <Common.Button
                    style={styles.button}
                    onPress={this.handleCopy.bind(this)}
                    caption={caption}
                />
            </Section>
        );
    }

    private handleCopy() {
        ReactNative.Clipboard.setString(this.props.password);
        if (ReactNative.Platform.OS === 'android') {
            ReactNative.ToastAndroid.show('Copied!', ReactNative.ToastAndroid.SHORT);
        } else {
            this.setState({ copied: true });
            setTimeout(() => this.setState({ copied: false }), 800);
        }
    }
}
type RowProp = {
    label: string;
    value: string;
};
class Row extends React.Component<RowProp, any> {
    public render() {
        return (
            <ReactNative.View style={styles.row as any}>
                <Common.Texts.Text style={styles.label}>
                    {this.props.label.toUpperCase()}
                </Common.Texts.Text>
                <Common.Texts.Text style={styles.value}>
                    {this.props.value}
                </Common.Texts.Text>
            </ReactNative.View>
        );
    }
}

let styles = ReactNative.StyleSheet.create({
    container: {
        paddingTop: 40,
        paddingHorizontal: 50,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    label: {
        fontSize: 15,
        color: Common.Colors.lightText,
    },
    value: {
        fontSize: 15,
        color: '#002350',
    },
    button: {
        marginTop: 25,
        marginHorizontal: 20,
    },
});
