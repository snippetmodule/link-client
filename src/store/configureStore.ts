import *as ReactNative from 'react-native';

import { applyMiddleware, createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
let promise = require('./promise');
let array = require('./array');
let analytics = require('./analytics');
let reducers = require('../reducers');
let createLogger = require('redux-logger');

// var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

let logger = createLogger({
  predicate: (getState, action) => true,
  collapsed: true,
  duration: true,
});

let createF8Store = applyMiddleware(thunk, promise, array, analytics, logger)(createStore);

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
