
import * as React from 'react';
import * as ReactNative from 'react-native';

function TouchableIOS(props: Object): JSX.Element {
  return (
    <ReactNative.TouchableHighlight
      accessibilityTraits="button"
      underlayColor="#3C5EAE"
      {...props}
    />
  );
}

export const Touchable = ReactNative.Platform.OS === 'android'
  ? ReactNative.TouchableNativeFeedback
  : TouchableIOS;

