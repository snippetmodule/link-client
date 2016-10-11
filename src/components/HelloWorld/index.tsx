import * as React from 'react';
import { View, Text } from 'react-native';

// See src/declarations.d.ts
import Button from 'react-native-button';
import {getString} from '../../global';

interface Props {
    max: number;
    message?: string | number;
    alert?: string | number;
    style: React.ViewStyle;
}

interface State {
    counter: number;
}

export default class HelloWorld extends React.Component<Props, State> {
    private static defaultProps = {
        message: getString('app.name'),
        alert: 'Hello world!',
    };

    public state = {
        counter: 0,
    };

    private onPress = () => {
        const counter = this.state.counter + 1;
        if (counter < this.props.max) {
            return this.setState({ counter });
        }
        // Alert after re-rendering
        return this.setState({ counter: 0 }, () => alert(this.props.alert));
    }

    public render() {
        const { message } = this.props;
        const { counter } = this.state;

        return (
            <View style={this.props.style}>
                <Button onPress={this.onPress}>
                    {message} ({counter})
                </Button>
            </View>
        );
    }
}
