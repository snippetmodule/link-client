import * as React from 'react';
import *as ReactNative from 'react-native';

interface IProps {
  count: number;
  selectedIndex: number;
  onSelectedIndexChange?: (index: number) => void;
  bounces?: boolean;
  children?: any;
  style?: any;
};

interface IState {
  width: number;
  height: number;
  selectedIndex: number;
  initialSelectedIndex: number;
  scrollingTo?: number;
};

class ViewPager extends React.Component<IProps, IState> {
  private mScrollView: any;
  constructor(props: IProps) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      selectedIndex: this.props.selectedIndex,
      initialSelectedIndex: this.props.selectedIndex,
      scrollingTo: null,
    };
  }

  public render() {
    if (ReactNative.Platform.OS === 'ios') {
      return this.renderIOS();
    } else {
      return this.renderAndroid();
    }
  }

  public renderIOS() {
    return (
      <ReactNative.ScrollView
        ref={ref => this.mScrollView = ref}
        contentOffset={{
          x: this.state.width * this.state.initialSelectedIndex,
          y: 0,
        }}
        style={[styles.scrollview, this.props.style]}
        horizontal={true}
        pagingEnabled={true}
        bounces={!!this.props.bounces}
        scrollsToTop={false}
        onScroll={this.handleHorizontalScroll}
        scrollEventThrottle={100}
        removeClippedSubviews={true}
        automaticallyAdjustContentInsets={false}
        directionalLockEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onLayout={this.adjustCardSize} >
        {this.renderContent()}
      </ReactNative.ScrollView>
    );
  }

  public renderAndroid() {
    return (
      <ReactNative.ViewPagerAndroid
        ref={ref => this.mScrollView = ref}
        initialPage={this.state.initialSelectedIndex}
        onPageSelected={this.handleHorizontalScroll}
        style={styles.container} >
        {this.renderContent()}
      </ReactNative.ViewPagerAndroid>
    );
  }

  private adjustCardSize(e: any) {
    this.setState({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
      selectedIndex: this.state.selectedIndex,
      initialSelectedIndex: this.state.initialSelectedIndex,
    });
  }

  public componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.selectedIndex !== this.state.selectedIndex) {
      if (ReactNative.Platform.OS === 'ios') {
        this.mScrollView.scrollTo({
          x: nextProps.selectedIndex * this.state.width,
          animated: true,
        });
        this.setState({ width: this.state.width, height: this.state.height, initialSelectedIndex: this.state.initialSelectedIndex, selectedIndex: this.state.selectedIndex, scrollingTo: nextProps.selectedIndex });
      } else {
        this.mScrollView.setPage(nextProps.selectedIndex);
        this.setState({ width: this.state.width, height: this.state.height, initialSelectedIndex: this.state.initialSelectedIndex, selectedIndex: nextProps.selectedIndex });
      }
    }
  }

  private renderContent(): JSX.Element[] {
    let {width, height } = this.state;
    let style = ReactNative.Platform.OS === 'ios' && styles.card;
    return React.Children.map(this.props.children, (child, i) => (
      <ReactNative.View style={[style, { width, height }]} key={'r_' + i} >
        {child}
      </ReactNative.View>
    ));
  }

  private handleHorizontalScroll(e: any) {
    let selectedIndex = e.nativeEvent.position;
    if (selectedIndex === undefined) {
      selectedIndex = Math.round(
        e.nativeEvent.contentOffset.x / this.state.width,
      );
    }
    if (selectedIndex < 0 || selectedIndex >= this.props.count) {
      return;
    }
    if (this.state.scrollingTo !== null && this.state.scrollingTo !== selectedIndex) {
      return;
    }
    if (this.props.selectedIndex !== selectedIndex || this.state.scrollingTo !== null) {
      this.setState({ width: this.state.width, height: this.state.height, selectedIndex, initialSelectedIndex: this.state.initialSelectedIndex, scrollingTo: null });
      let {onSelectedIndexChange} = this.props;
      onSelectedIndexChange && onSelectedIndexChange(selectedIndex);
    }
  }
}

let styles = ReactNative.StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  card: {
    backgroundColor: 'transparent',
  }
});
export { ViewPager }
