let I18n = require('react-native-i18n');

let deviceLocale = I18n.locale;

I18n.fallbacks = true;
I18n.translations = {
    en: require('./locales/en').default,
    'zh-CN': require('./locales/zh_CN').default,
    'zh-TW': require('./locales/zh_TW').default,
};

let getString = (key: string): string => {
    return I18n.t(key);
};

export { getString, deviceLocale }

