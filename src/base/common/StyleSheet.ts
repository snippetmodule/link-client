import * as ReactNative from 'react-native';

function create(styles: any): any {
  const platformStyles = {};
  Object.keys(styles).forEach((name) => {
    let {ios, android, style} = styles[name];

    if (ios && ReactNative.Platform.OS === 'ios') {
      style = { style, ios };
    }
    if (android && ReactNative.Platform.OS === 'android') {
      style = { style, android };
    }
    platformStyles[name] = style;
  });
  return ReactNative.StyleSheet.create(platformStyles);
}
let StyleSheet: { create: <T>(styles: T) => T } = { create: create };
export { StyleSheet }
