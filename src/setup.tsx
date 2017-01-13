

import * as React from 'react';
import { Provider } from 'react-redux';
import { Parse } from 'parse/react-native';

import { configureStore } from './store/configureStore';
import { App } from './App';
import { env } from './base/env';
// var FacebookSDK = require('FacebookSDK');
// var Parse = require('parse/react-native');
// var React = require('React');
// var Relay = require('react-relay');

// var { Provider } = require('react-redux');
// var configureStore = require('./store/configureStore');

// var {serverURL} = require('./env');

// function setup(): React.ReactClass<{}> {
//   console.disableYellowBox = true;
Parse.initialize('oss-f8-app-2016');
Parse.serverURL = `${env.serverURL}/parse`;

//   FacebookSDK.init();
// Parse.FacebookUtils.init();
//   Relay.injectNetworkLayer(
//     new Relay.DefaultNetworkLayer(`${serverURL}/graphql`, {
//       fetchTimeout: 30000,
//       retryDelays: [5000, 10000],
//     })
//   );

type State = {
    isLoading: boolean;
    store?: any;
};
class Root extends React.Component<any, State> {

    constructor() {
        super();
        this.state = {
            isLoading: true,
            store: configureStore(() => this.setState({ ...this.state, isLoading: false })),
        };
    }
    public render() {
        if (this.state.isLoading) {
            return null;
        }
        return (
            <Provider store={this.state.store} >
                <App />
            </Provider>
        );
    }
}
// global.LOG = (...args) => {
//     console.log('/------------------------------\\');
//     console.log(...args);
//     console.log('\\------------------------------/');
//     return args[args.length - 1];
// };
export { Root }
