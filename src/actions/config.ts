
import *as ReactNative from 'react-native';
import { Parse } from 'parse/react-native';
import { Action } from './types';

export async function loadConfig(): Promise<Action> {
    const config = await Parse.Config.get();
    // await ReactNative.InteractionManager.runAfterInteractions();
    return {
        type: 'LOADED_CONFIG',
        config,
    };
}
