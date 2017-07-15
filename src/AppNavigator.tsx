import * as React from 'react';
import * as ReactNative from 'react-native';
const { connect } = require('react-redux');
import { switchTab, Dispatch, BackListener, NavigationChildContextType } from './actions';
import { LoginModal } from './login/LoginModal';
import { FilterScreen } from './filter/FilterScreen';

import { SessionsCarousel } from './tabs/schedule/SessionsCarousel';
import { SharingSettingsModal } from './tabs/schedule/SharingSettingsModal';
import { SharingSettingsScreen } from './tabs/schedule/SharingSettingsScreen';
import { ThirdPartyNotices } from './tabs/info/ThirdPartyNotices';
import { RatingScreen } from './rating/RatingScreen';
import { FriendsScheduleView } from './tabs/schedule/FriendsScheduleView';
import { TabsViewAndroid } from './tabs/TabsViewAndroid';
import { TabsViewIOS } from './tabs/TabsViewIOS';
import { Session } from './reducers/sessions';

type Prop = {
  tab?: string,
  isLoggedIn?: boolean;
  dispatch?: Dispatch;
};
@connect(
  (store) => ({
    tab: store.navigation.tab,
    isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
  }),
  (dispatch) => ({ dispatch: dispatch }),
)
export class AppNavigator extends React.Component<Prop, any> {
  public static childContextTypes = {
    addBackButtonListener: React.PropTypes.func,
    removeBackButtonListener: React.PropTypes.func,
  };

  private mNavigator: ReactNative.Navigator;
  private _handlers: BackListener[] = [];

  public componentDidMount() {
    ReactNative.BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
  }

  public componentWillUnmount() {
    ReactNative.BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
  }

  public getChildContext(): NavigationChildContextType {
    return {
      addBackButtonListener: this.addBackButtonListener.bind(this),
      removeBackButtonListener: this.removeBackButtonListener.bind(this),
    };
  }

  private addBackButtonListener(listener: BackListener) {
    this._handlers.push(listener);
  }

  private removeBackButtonListener(listener: BackListener) {
    this._handlers = this._handlers.filter((handler) => handler === listener);
  }

  private handleBackButton() {
    for (let i = this._handlers.length - 1; i >= 0; i--) {
      if (this._handlers[i]()) {
        return true;
      }
    }
    if (this.mNavigator && this.mNavigator.getCurrentRoutes().length > 1) {
      this.mNavigator.pop();
      return true;
    }
    if (this.props.tab !== 'schedule') {
      this.props.dispatch(switchTab('schedule'));
      return true;
    }
    return false;
  }

  public render() {
    return (
      <ReactNative.Navigator
        ref={(ref) => this.mNavigator = ref as any}
        sceneStyle={styles.container}
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
        }}
        initialRoute={{}}
        renderScene={this.renderScene.bind(this)}
      />
    );
  }
  private renderScene(route, navigator: ReactNative.Navigator) {
    if (route.allSessions) {
      return (<SessionsCarousel {...route} navigator={navigator} />
      );
    }
    if (route.session) {
      return (<SessionsCarousel session={route.session as Session} navigator={navigator}     {...this.props} />);
    }
    if (route.filter) {
      return (<FilterScreen navigator={navigator} />);
    }
    if (route.friend) {
      return (<FriendsScheduleView friend={route.friend} navigator={navigator} />);
    }
    if (route.login) {
      return (<LoginModal navigator={navigator} onLogin={route.callback} />);
    }
    if (route.share) {
      return (<SharingSettingsModal navigator={navigator} {...this.props} />);
    }
    if (route.shareSettings) {
      return <SharingSettingsScreen navigator={navigator} {...this.props} />;
    }
    if (route.rate) {
      return <RatingScreen navigator={navigator} surveys={route.surveys} />;
    }
    if (route.notices) {
      return <ThirdPartyNotices navigator={navigator} />;
    }
    if (ReactNative.Platform.OS === 'android') {
      return <TabsViewAndroid navigator={navigator} />;
    } else {
      return <TabsViewIOS navigator={navigator} />;
    }
  }
}
const styles = ReactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});