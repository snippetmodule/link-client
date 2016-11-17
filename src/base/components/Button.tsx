import * as React from 'react';
import * as ReactNative from 'react-native';

let LinearGradient = require('react-native-linear-gradient');

import *as Colors from './Colors';

interface IProp{
    type?: 'primary' | 'secondary' | 'bordered';
    icon?: string;
    caption: string;
    style?: any;
    onPress: () => any;
}
class Button extends React.Component<IProp,any> {
      constructor(props: IProp) {
    super(props);
    this.props.type = this.props.type || 'primary';
  }

  public render() {
    const caption = this.props.caption.toUpperCase();
    let icon;
    if (this.props.icon) {
      icon = <ReactNative.Image source={this.props.icon} style={styles.icon} />;
    }
    let content;
    if (this.props.type === 'primary') {
      content = (
        <LinearGradient
          start={[0.5, 1]} end={[1, 1]}
          colors={['#6A6AD5', '#6F86D9']}
          style={[styles.button, styles.primaryButton]}>
          {icon}
          <ReactNative.Text style={[styles.caption, styles.primaryCaption]}>
            {caption}
          </ReactNative.Text>
        </LinearGradient>
      );
    } else {
      let border = this.props.type === 'bordered' && styles.border;
      content = (
        <ReactNative.View style={[styles.button, border]}>
          {icon}
          <ReactNative.Text style={[styles.caption, styles.secondaryCaption]}>
            {caption}
          </ReactNative.Text>
        </ReactNative.View>
      );
    }
    return (
      <ReactNative.TouchableOpacity
        accessibilityTraits="button"
        onPress={this.props.onPress}
        activeOpacity={0.8}
        style={[styles.container, this.props.style]}>
        {content}
      </ReactNative.TouchableOpacity>
    );
  }
}

const HEIGHT = 50;

let styles = ReactNative.StyleSheet.create({
  container: {
    height: HEIGHT,
    // borderRadius: HEIGHT / 2,
    // borderWidth: 1 / PixelRatio.get(),
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  border: {
    borderWidth: 1,
    borderColor: Colors.lightText,
    borderRadius: HEIGHT / 2,
  },
  primaryButton: {
    borderRadius: HEIGHT / 2,
    backgroundColor: 'transparent',
  },
  icon: {
    marginRight: 12,
  },
  caption: {
    letterSpacing: 1,
    fontSize: 12,
  },
  primaryCaption: {
    color: 'white',
  },
  secondaryCaption: {
    color: Colors.lightText,
  },
});
export {Button}
