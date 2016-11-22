import * as ReactNative from 'react-native';

let Platform = ReactNative.Platform;
let backIcon;
if (Platform.OS === 'ios') {
  backIcon = require('../../../asserts/base/common/x-white.png');
} else {
  backIcon = require('../../../asserts/base/common/back_white.png');
}
export { backIcon };
