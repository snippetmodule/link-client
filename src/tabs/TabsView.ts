import { TabsViewAndroid } from './TabsViewAndroid';
import { TabsViewIOS } from './TabsViewIOS';
import *as ReactNative from 'react-native';
let TabsView = ReactNative.Platform.OS === 'android' ? TabsViewAndroid : TabsViewIOS;
export { TabsView }