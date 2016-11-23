import * as React from 'react';
import * as ReactNative from 'react-native';

import { StyleSheet } from './StyleSheet';
import { Texts } from './Text';
import { ViewPager } from './ViewPager';
import { ParallaxBackground } from './ParallaxBackground';
import { SegmentedControl } from './SegmentedControl';
import { Header, Item } from './Header';

// var Animated = require('Animated');
// var NativeModules = require('NativeModules');
// var Dimensions = require('Dimensions');
// var F8Header = require('F8Header');
// var F8SegmentedControl = require('F8SegmentedControl');
// var ParallaxBackground = require('ParallaxBackground');
// var React = require('React');
// var ReactNative = require('react-native');
// var StyleSheet = require('F8StyleSheet');
// var View = require('View');
// var { Text } = require('F8Text');
// var ViewPager = require('./ViewPager');
// var Platform = require('Platform');

// import type {Item as HeaderItem } from 'F8Header';

// import {ActivityIndicatorIOS,ProgressBarAndroid} from 'react-native';

const EMPTY_CELL_HEIGHT = ReactNative.Dimensions.get('window').height > 600 ? 200 : 150;

// var ActivityIndicatorIOS = require('ActivityIndicatorIOS');
// var ProgressBarAndroid = require('ProgressBarAndroid');
const ActivityIndicator = ReactNative.Platform.OS === 'ios'
  ? ReactNative.ActivityIndicatorIOS
  : ReactNative.ProgressBarAndroid;

// var Relay = require('react-relay');
// var RelayRenderer = require('react-relay/lib/RelayRenderer.js');

// class MainRoute extends Relay.Route { }
// MainRoute.queries = { viewer: () => Relay.QL`query { viewer }` };
// MainRoute.routeName = 'MainRoute';

class RelayLoading extends React.Component<any, void> {
  public render() {
    const child = React.Children.only(this.props.children);
    return this.renderChild(child, this.props);
    // if (!child.type.getFragmentNames) {
    //   return child;
    // }
    // return (
    //   <RelayRenderer
    //     Container={child.type}
    //     queryConfig={new MainRoute()}
    //     environment={Relay.Store}
    //     render={({props}) => this.renderChild(child, props)}
    //     />
    // );
  }

  private renderChild(child, props) {
    if (!props) {
      return (
        <ReactNative.View style={{ height: 400 }}>
          {child.props.renderHeader && child.props.renderHeader()}
          <ReactNative.View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator />
          </ReactNative.View>
        </ReactNative.View>
      );
    }
    return React.cloneElement(child, { ...this.props, ...props });
  }
}

type Props = {
  title: string;
  leftItem?: Item;
  rightItem?: Item;
  extraItems?: Array<Item>;
  selectedSegment?: number;
  selectedSectionColor?: string;
  backgroundImage: number;
  backgroundColor: string;
  parallaxContent?: JSX.Element;
  stickyHeader?: JSX.Element;
  onSegmentChange?: (segment: number) => void;
  children?: any;
};

type State = {
  idx: number;
  anim: ReactNative.Animated.Value;
  stickyHeaderHeight: number;
};

class ListContainer extends React.Component<Props, State> {
  public static contextTypes = {
    openDrawer: React.PropTypes.func,
    hasUnreadNotifications: React.PropTypes.bool,
  };

  public state = {
    idx: this.props.selectedSegment || 0,
    anim: new ReactNative.Animated.Value(0),
    stickyHeaderHeight: 0,
  };
  _refs: Array<any> = [];
  _pinned: any;

  // constructor(props: Props, context: ContextType) {
  //   super(props, context);

  //   this.state = {
  //     idx: this.props.selectedSegment || 0,
  //     anim: new ReactNative.Animated.Value(0),
  //     stickyHeaderHeight: 0,
  //   };
  //   this._refs = [];
  // }

  public render() {
    var leftItem = this.props.leftItem;
    if (!leftItem && ReactNative.Platform.OS === 'android') {
      leftItem = {
        title: 'Menu',
        icon: this.context.hasUnreadNotifications
          ? require('../../../asserts/base/common/hamburger-unread.png')
          : require('../../../asserts/base/common/hamburger.png'),
        onPress: this.handleShowMenu.bind(this),
      };
    }

    const segments = [];
    const content = React.Children.map(this.props.children, (child, idx) => {
      let anyChild: any = child;
      segments.push(anyChild.props.title);
      return <RelayLoading>
        {React.cloneElement(anyChild, {
          ref: (ref) => { this._refs[idx] = ref; },
          onScroll: (e) => this.handleScroll(idx, e),
          style: styles.listView,
          showsVerticalScrollIndicator: false,
          scrollEventThrottle: 16,
          contentInset: { bottom: 49, top: 0 },
          automaticallyAdjustContentInsets: false,
          renderHeader: this.renderFakeHeader,
          scrollsToTop: idx === this.state.idx,
        })}
      </RelayLoading>;
    });

    let {stickyHeader} = this.props;
    if (segments.length > 1) {
      stickyHeader = (
        <ReactNative.View>
          <SegmentedControl
            values={segments}
            selectedIndex={this.state.idx}
            selectionColor={this.props.selectedSectionColor}
            onChange={this.handleSelectSegment.bind(this)}
            />
          {stickyHeader}
        </ReactNative.View>
      );
    }
    // TODO: Bind to ViewPager animation
    const backgroundShift = segments.length === 1
      ? 0
      : this.state.idx / (segments.length - 1);

    return (
      <ReactNative.View style={styles.container}>
        <ReactNative.View style={styles.headerWrapper}>
          <ParallaxBackground
            minHeight={this.state.stickyHeaderHeight + Header.height}
            maxHeight={EMPTY_CELL_HEIGHT + this.state.stickyHeaderHeight + Header.height}
            offset={this.state.anim}
            backgroundImage={this.props.backgroundImage}
            backgroundShift={backgroundShift}
            backgroundColor={this.props.backgroundColor}>
            {this.renderParallaxContent()}
          </ParallaxBackground>
          <Header
            title={this.props.title}
            leftItem={leftItem}
            rightItem={this.props.rightItem}
            extraItems={this.props.extraItems}>
            {this.renderHeaderTitle()}
          </Header>
          {this.renderFixedStickyHeader(stickyHeader)}
        </ReactNative.View>
        <ViewPager
          count={segments.length}
          selectedIndex={this.state.idx}
          onSelectedIndexChange={this.handleSelectSegment.bind(this)}>
          {content}
        </ViewPager>
        {this.renderFloatingStickyHeader(stickyHeader)}
      </ReactNative.View>
    );
  }

  private renderParallaxContent() {
    if (ReactNative.Platform.OS === 'android') {
      return <ReactNative.View />;
    }
    if (this.props.parallaxContent) {
      return this.props.parallaxContent;
    }
    return (
      <Texts.Text style={styles.parallaxText}>
        {this.props.title}
      </Texts.Text>
    );
  }

  private renderHeaderTitle(): JSX.Element {
    if (ReactNative.Platform.OS === 'android') {
      return null;
    }
    let transform;
    if (!this.props.parallaxContent) {
      let distance = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;
      transform = {
        opacity: this.state.anim.interpolate({
          inputRange: [distance - 20, distance],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        })
      };
    }
    return (
      <ReactNative.Animated.Text style={[styles.headerTitle, transform]}>
        {this.props.title}
      </ReactNative.Animated.Text>
    );
  }

  private handleScroll(idx: number, e: any) {
    if (idx !== this.state.idx) {
      return;
    }
    let y = 0;
    if (ReactNative.Platform.OS === 'ios') {
      this.state.anim.setValue(e.nativeEvent.contentOffset.y);
      const height = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;
      y = Math.min(e.nativeEvent.contentOffset.y, height);
    }
    this._refs.forEach((ref, ii) => {
      if (ii !== idx && ref) {
        ref.scrollTo && ref.scrollTo({ y, animated: false });
      }
    });

  }

  private renderFakeHeader() {
    if (ReactNative.Platform.OS === 'ios') {
      const height = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;
      return (
        <ReactNative.View style={{ height }} />
      );
    }
  }

  private renderFixedStickyHeader(stickyHeader: JSX.Element) {
    return ReactNative.Platform.OS === 'ios'
      ? <ReactNative.View style={{ height: this.state.stickyHeaderHeight }} />
      : stickyHeader;
  }

  private renderFloatingStickyHeader(stickyHeader: JSX.Element) {
    if (!stickyHeader || ReactNative.Platform.OS !== 'ios') {
      return;
    }
    var opacity = this.state.stickyHeaderHeight === 0 ? 0 : 1;
    var transform;

    // If native pinning is not available, fallback to Animated
    // if (!ReactNative.NativeModules.F8Scrolling) {
    var distance = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;
    var translateY = this.state.anim.interpolate({
      inputRange: [0, distance],
      outputRange: [distance, 0],
      extrapolateRight: 'clamp',
    });
    transform = [{ translateY }];
    // }

    return (
      <ReactNative.Animated.View
        ref={(ref) => { this._pinned = ref; } }
        onLayout={this.handleStickyHeaderLayout}
        style={[styles.stickyHeader, { opacity }, { transform }]}>
        {stickyHeader}
      </ReactNative.Animated.View>
    );
  }

  private handleStickyHeaderLayout({ nativeEvent: { layout, target } }: any) {
    this.setState({ ...this.state, stickyHeaderHeight: layout.height });
  }

  componentWillReceiveProps(nextProps: Props) {
    if (typeof nextProps.selectedSegment === 'number' &&
      nextProps.selectedSegment !== this.state.idx) {
      this.setState({ ...this.state, idx: nextProps.selectedSegment });
    }
  }

  // componentDidUpdate(prevProps: Props, prevState: State) {
  // if (!ReactNative.NativeModules.F8Scrolling) {
  //   return;
  // }

  // if (this.state.idx !== prevState.idx ||
  //   this.state.stickyHeaderHeight !== prevState.stickyHeaderHeight) {
  //   var distance = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;

  //   if (this._refs[prevState.idx] && this._refs[prevState.idx].getScrollResponder) {
  //     const oldScrollViewTag = React.findNodeHandle(
  //       this._refs[prevState.idx].getScrollResponder()
  //     );
  //     ReactNative.NativeModules.F8Scrolling.unpin(oldScrollViewTag);
  //   }

  //   if (this._refs[this.state.idx] && this._refs[this.state.idx].getScrollResponder) {
  //     const newScrollViewTag = ReactNative.findNodeHandle(
  //       this._refs[this.state.idx].getScrollResponder()
  //     );
  //     const pinnedViewTag = ReactNative.findNodeHandle(this._pinned);
  //     ReactNative.NativeModules.F8Scrolling.pin(newScrollViewTag, pinnedViewTag, distance);
  //   }
  // }
  // }

  handleSelectSegment(idx: number) {
    if (this.state.idx !== idx) {
      const {onSegmentChange} = this.props;
      this.setState({ ...this.state, idx }, () => onSegmentChange && onSegmentChange(idx));
    }
  }

  handleShowMenu() {
    this.context.openDrawer();
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerWrapper: {
    android: {
      elevation: 2,
      backgroundColor: 'transparent',
      // FIXME: elevation doesn't seem to work without setting border
      borderRightWidth: 1,
      marginRight: -1,
      borderRightColor: 'transparent',
    }
  },
  listView: {
    ios: {
      backgroundColor: 'transparent',
    },
    android: {
      backgroundColor: 'white',
    }
  },
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  parallaxText: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    letterSpacing: -1,
  },
  stickyHeader: {
    position: 'absolute',
    top: Header.height,
    left: 0,
    right: 0,
  },
});

export { ListContainer }
