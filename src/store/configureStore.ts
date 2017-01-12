import * as ReactNative from 'react-native';

// import { applyMiddleware, createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import * as Redux from 'redux';
import * as createLogger from 'redux-logger';

import { promise } from './promise';
import { array } from './array';
import { analytics } from './analytics';
import { reducers } from '../reducers';

// var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

let logger: Redux.Middleware = createLogger({
  predicate: (getState, action) => true,
  collapsed: true,
  duration: true,
});

let createF8Store = Redux.applyMiddleware(thunk, promise, array, analytics, logger)(Redux.createStore);

function configureStore(onComplete?: () => void) {
  // TODO(frantic): reconsider usage of redux-persist, maybe add cache breaker
  const store = autoRehydrate()(createF8Store)(reducers);
  persistStore(store, { storage: ReactNative.AsyncStorage }, onComplete);
  // if (isDebuggingInChrome) {
  //   window.store = store;
  // }
  return store;
}
export { configureStore }
