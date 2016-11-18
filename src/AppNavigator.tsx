import * as React from 'react';
import *as ReactNative from 'react-native';
import { LoginModal } from './LoginModal';

type BackListener = () => boolean;
let AppNavigator = React.createClass({
  _handlers: [] = new Array<BackListener>(),

  componentDidMount() {
    ReactNative.BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
  },

  componentWillUnmount() {
    ReactNative.BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
  },

  getChildContext() {
    return {
      addBackButtonListener: this.addBackButtonListener,
      removeBackButtonListener: this.removeBackButtonListener,
    };
  },

  addBackButtonListener(listener) {
    this._handlers.push(listener);
  },

  removeBackButtonListener(listener) {
    this._handlers = this._handlers.filter((handler) => handler !== listener);
  },

  handleBackButton() {
    for (let i = this._handlers.length - 1; i >= 0; i--) {
      if (this._handlers[i]()) {
        return true;
      }
    }

    const {navigator} = this.refs;
    if (navigator && navigator.getCurrentRoutes().length > 1) {
      navigator.pop();
      return true;
    }

    if (this.props.tab !== 'schedule') {
      // this.props.dispatch(switchTab('schedule'));
      // return true;
    }
    return false;
  },

  render() {
    return (
      <ReactNative.Navigator
        ref="navigator"
        // style={[styles.container]}
        configureScene={(route: any) => {
          if (ReactNative.Platform.OS === 'android') {
            return ReactNative.Navigator.SceneConfigs.FloatFromBottomAndroid;
          }
          // TODO: Proper scene support
          if (route.shareSettings || route.friend) {
            return ReactNative.Navigator.SceneConfigs.FloatFromRight;
          } else {
            return ReactNative.Navigator.SceneConfigs.FloatFromBottom;
          }
        } }
        initialRoute={{}}
        renderScene={this.renderScene}
        />
    );
  },

  renderScene(route, navigator) {
    return (
      <LoginModal
        navigator={navigator}
        onLogin={route.callback}
        />)
    //   if (route.allSessions) {
    //     return (
    //       <SessionsCarousel
    //         {...route}
    //         navigator={navigator}
    //         />
    //     );
    //   }
    //   if (route.session) {
    //     return (
    //       <SessionsCarousel
    //         session={route.session}
    //         navigator={navigator}
    //         />
    //     );
    //   }
    //   if (route.filter) {
    //     return (
    //       <FilterScreen navigator={navigator} />
    //     );
    //   }
    //   if (route.friend) {
    //     return (
    //       <FriendsScheduleView
    //         friend={route.friend}
    //         navigator={navigator}
    //         />
    //     );
    //   }
    //   if (route.login) {
    //     return (
    //       <LoginModal
    //         navigator={navigator}
    //         onLogin={route.callback}
    //         />
    //     );
    //   }
    //   if (route.share) {
    //     return (
    //       <SharingSettingsModal navigator={navigator} />
    //     );
    //   }
    //   if (route.shareSettings) {
    //     return <SharingSettingsScreen navigator={navigator} />;
    //   }
    //   if (route.rate) {
    //     return <RatingScreen navigator={navigator} surveys={route.surveys} />;
    //   }
    //   if (route.notices) {
    //     return <ThirdPartyNotices navigator={navigator} />;
    //   }
    //   return <F8TabsView navigator={navigator} />;
  },
});

AppNavigator.childContextTypes = {
  addBackButtonListener: React.PropTypes.func,
  removeBackButtonListener: React.PropTypes.func,
};

let styles = ReactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

// function select(store) {
//   return {
//     tab: store.navigation.tab,
//     isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
//   };
// }
export { AppNavigator }
// module.exports = connect(select)(F8Navigator);
