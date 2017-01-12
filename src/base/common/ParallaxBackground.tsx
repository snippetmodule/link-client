import * as React from 'react';
import * as ReactNative from 'react-native';

const resolveAssetSource = require('resolveAssetSource');
// var Animated = require('Animated');

// var React = require('React');
// var StyleSheet = require('StyleSheet');
// var View = require('View');
// var Image = require('Image');
// var Dimensions = require('Dimensions');

// TODO: Remove this magic numbers
const HEIGHT = ReactNative.Dimensions.get('window').height > 600
  ? 200
  : 150;
const SCREEN_WIDTH = ReactNative.Dimensions.get('window').width;

interface IProps {
  maxHeight: number;
  minHeight: number;
  offset: ReactNative.Animated.Value;
  backgroundImage: number;
  backgroundShift: number; // 0..1
  backgroundColor: string; // TODO: This makes it seems like image loads faster. Remove
  children?: any;
}

interface IState {
  shift: ReactNative.Animated.Value;
};

export class ParallaxBackground extends React.Component<IProps, IState>{
  public static HEIGHT = HEIGHT;

  constructor(props: IProps) {
    super(props);
    this.state = {
      shift: new ReactNative.Animated.Value(props.backgroundShift || 0),
    };
  }

  public componentDidUpdate(prevProps: IProps) {
    if (prevProps.backgroundShift !== this.props.backgroundShift) {
      ReactNative.Animated.timing(this.state.shift, {
        toValue: this.props.backgroundShift,
        duration: 300,
      }).start();
    }
  }

  public render() {
    const { minHeight, maxHeight, offset, backgroundColor } = this.props;
    const buffer = 10; // To reduce visual lag when scrolling
    const height = offset.interpolate({
      inputRange: [0, maxHeight - minHeight],
      outputRange: [maxHeight + buffer, minHeight + buffer],
      extrapolateRight: 'clamp',
    });

    return (
      <ReactNative.Animated.View style={[styles.container, { height, backgroundColor }]}>
        {this.renderBackgroundImage()}
        {this.renderContent()}
      </ReactNative.Animated.View>
    );
  }

  private renderBackgroundImage(): JSX.Element {
    const { backgroundImage, minHeight, maxHeight, offset } = this.props;
    if (!backgroundImage) {
      return null;
    }

    const source = resolveAssetSource(backgroundImage);
    if (!source) {
      return null;
    }
    const { width } = source;
    const translateX = this.state.shift.interpolate({
      inputRange: [0, 1],
      outputRange: [0, SCREEN_WIDTH - width],
      extrapolate: 'clamp',
    });

    const length = maxHeight - minHeight;
    const translateY = offset.interpolate({
      inputRange: [0, length / 2, length],
      outputRange: [0, -length / 2, -length / 1.5],
      extrapolate: 'clamp',
    });
    // Sometimes image width is smaller than device's width
    const initialScale = Math.max(SCREEN_WIDTH / width * 2 - 1, 1);
    const scale = offset.interpolate({
      inputRange: [-length, 0],
      outputRange: [2, initialScale],
      extrapolateRight: 'clamp',
    });
    const transforms = { transform: [{ translateX }, { translateY }, { scale }] };
    return (
      <ReactNative.Animated.Image
        source={backgroundImage}
        style={transforms}
      />
    );
  }

  private renderContent(): JSX.Element {
    if (React.Children.count(this.props.children) === 0) {
      return null;
    }
    const content = React.Children.only(this.props.children);

    const { minHeight, maxHeight, offset } = this.props;
    const length = maxHeight - minHeight;
    const opacity = offset.interpolate({
      inputRange: [0, length - 40],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    const translateY = offset.interpolate({
      inputRange: [0, length],
      outputRange: [-32, -(length / 2) - 32],
      extrapolate: 'clamp',
    });
    const transforms = { opacity, transform: [{ translateY }] };
    return (
      <ReactNative.Animated.View style={[styles.contentContainer, transforms]}>
        {content}
      </ReactNative.Animated.View>
    );
  }
}

const HEADER_HEIGHT = HEIGHT + 156;

const styles = ReactNative.StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    overflow: 'hidden',
  },
  contentContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    height: HEADER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

