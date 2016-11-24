
import { Parse } from 'parse/react-native';
import { Action } from './types';
let InteractionManager = require('InteractionManager');

export async function loadConfig(): Promise<Action> {
    const config = await Parse.Config.get();
    await InteractionManager.runAfterInteractions();
    return {
        type: 'LOADED_CONFIG',
        config,
    };
}
