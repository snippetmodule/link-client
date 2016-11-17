import * as React from 'react';
import *as ReactNative from 'react-native';
import { Header } from './base/components/Header';
class Playground extends React.Component<any, { content: JSX.Element[] }> {
    constructor() {
        super();
        const content = [];
        const define = (name: string, render: Function) => {
            content.push(<Example key={name} render={render} />);
        };
        // var Module = require('F8PageControl');
        // var Module = require('./tabs/schedule/AddToScheduleButton');
        // var Module = require('./rating/Header');
        // $FlowFixMe: doesn't understand static
        Header.__cards__(define);
        this.state = { content };
    }

    public render() {
        return (
            <ReactNative.View style={{ backgroundColor: '#336699', flex: 1, }}>
                {this.state.content}
            </ReactNative.View>
        );
    }
}

class Example extends React.Component<any, {inner: null}> {
    public render() {
        const content = this.props.render(this.state.inner, (inner) => this.setState({ inner }));
        return (
            <ReactNative.View>
                {content}
            </ReactNative.View>
        );

    }
}

export { Playground }
