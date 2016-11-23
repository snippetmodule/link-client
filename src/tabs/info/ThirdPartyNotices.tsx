import * as React from 'react';
import *as ReactNative from 'react-native';
import { connect } from 'react-redux';
import * as Common from '../../base/common';

export class ThirdPartyNotices extends React.Component<any, any> {
    public render() {
        return (
            <ReactNative.View style={styles.container}>
                <Common.Header
                    title="Third Party Notices"
                    style={styles.header}
                    leftItem={{
                        icon: require('../../../asserts/base/common/back_white.png'),
                        title: 'Back',
                        layout: 'icon',
                        onPress: () => this.props.navigator.pop(),
                    }}
                    />
                <Loading>
                    <ReactNative.WebView
                        style={styles.webview}
                        source={{ uri: 'file:///android_res/raw/third_party_notices.html' }}
                        />
                </Loading>
            </ReactNative.View>
        );
    }
}
type State = {
    loaded: boolean;
};
class Loading extends React.Component<any, State> {
    public state = { loaded: false };
    public componentDidMount() {
        ReactNative.InteractionManager.runAfterInteractions(() => this.setState({ loaded: true }));
    }

    public render() {
        if (this.state.loaded) {
            return React.Children.only(this.props.children);
        }
        return null;
    }
}

let styles = ReactNative.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        backgroundColor: '#47BFBF',
    },
    webview: {
        flex: 1,
    },
});
