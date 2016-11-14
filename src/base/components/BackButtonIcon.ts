import * as ReactNative from 'react-native';

let Platform = ReactNative.Platform;
let backIcon;
if (Platform.OS === 'ios') {
  backIcon = require('./img/x-white.png');
} else {
  backIcon = require('./img/back_white.png');
}
export { backIcon };
