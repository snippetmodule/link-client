import * as React from 'react';
import *as ReactNative from 'react-native';

import { LoginScreen } from './LoginScreen';
import { AppNavigator } from './AppNavigator';
// var LoginScreen = require('./login/LoginScreen');


// let { env } = require('./env.js');

class App extends React.Component<any, any>{
    public componentDidMount() {
        // ReactNative.AppState.addEventListener('change', this.handleAppStateChange);

        // TODO: Make this list smaller, we basically download the whole internet
        // this.props.dispatch(loadNotifications());
        // this.props.dispatch(loadMaps());
        // this.props.dispatch(loadConfig());
        // this.props.dispatch(loadSessions());
        // this.props.dispatch(loadFriendsSchedules());
        // this.props.dispatch(loadSurveys());

        // updateInstallation({version});
        // CodePush.sync({installMode: CodePush.InstallMode.ON_NEXT_RESUME});
    }
    public componentWillUnmount() {
        // ReactNative.AppState.removeEventListener('change', this.handleAppStateChange);
    }
    private handleAppStateChange(appState) {
        if (appState === 'active') {
            // this.props.dispatch(loadSessions());
            // this.props.dispatch(loadNotifications());
            // this.props.dispatch(loadSurveys());
            // CodePush.sync({ installMode: CodePush.InstallMode.ON_NEXT_RESUME });
            //       <ReactNative.StatusBar
            //   translucent={true}
            //   backgroundColor="rgba(0, 0, 0, 0.2)"
            //   barStyle="light-content"
            //   />
            // <AppNavigator />
        }
    }
    public render() {
        // if (!this.props.isLoggedIn) {
        // return this.renderText();
        // }
        return (<LoginScreen />);
        // return (
        //     <ReactNative.View style={styles.container}>
        //         <ReactNative.StatusBar
        //             translucent={true}
        //             backgroundColor="rgba(0, 0, 0, 0.2)"
        //             barStyle="light-content"
        //             />
        //     </ReactNative.View>
        // );
    }
}

let styles = ReactNative.StyleSheet.create({
    container: {
        flex: 1,
    },
});

// function select(store) {
//   return {
//     isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
//   };
// }
export { App };
// module.exports = connect(select)(F8App);
