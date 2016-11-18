import * as ReactNative from 'react-native';

let Platform = ReactNative.Platform;
let backIcon;
if (Platform.OS === 'ios') {
  backIcon = require('/asserts/x-white.png');
} else {
  backIcon = require('/asserts/back_white.png');
}
export { backIcon };
