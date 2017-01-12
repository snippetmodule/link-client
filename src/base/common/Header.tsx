import * as React from 'react';
import * as ReactNative from 'react-native';

import { Colors } from './Colors';
import { Texts } from './Text';

export type Layout =
    'default'      // Use platform defaults (icon on Android, text on iOS)
    | 'icon'         // Always use icon
    | 'title';       // Always use title

export type Foreground = 'light' | 'dark';

export type Item = {
    title?: string;
    icon?: any;
    layout?: Layout;
    onPress?: () => void;
};

export type IProps = {
    title?: string;
    leftItem?: Item;
    rightItem?: Item;
    extraItems?: Item[];
    foreground?: Foreground;
    style?: any;
    children?: any;
};

class HeaderAndroid extends React.Component<IProps, any> {
    public static height: number;
    public static __cards__: (define) => any;
    public render() {
        const { leftItem, rightItem, extraItems } = this.props;
        let actions: ReactNative.ToolbarAndroidAction[] = [];
        if (rightItem) {
            const { title, icon, layout } = rightItem;
            actions.push({
                icon: layout !== 'title' ? icon : undefined,
                title: title,
                show: 'always',
            });
        }
        if (extraItems) {
            extraItems.forEach((item) => {
                actions.push({
                    icon: undefined,
                    title: item.title,
                    show: 'never',
                });
            });
            // actions = actions.concat(extraItems.map((item) => ({
            //     icon: undefined,
            //     title: item.title,
            //     show: 'never',
            // })));
        }

        const textColor = this.props.foreground === 'dark'
            ? Colors.darkText
            : 'white';

        let content;
        if (React.Children.count(this.props.children) > 0) {
            content = (
                <ReactNative.View collapsable={false} style={{ flex: 1 }}>
                    {this.props.children}
                </ReactNative.View>
            );
        }

        return (
            <ReactNative.View style={[styles.toolbarContainer, this.props.style]}>
                <ReactNative.ToolbarAndroid
                    navIcon={leftItem && leftItem.icon}
                    onIconClicked={leftItem && leftItem.onPress}
                    title={this.props.title}
                    titleColor={textColor}
                    subtitleColor={textColor}
                    actions={actions}
                    onActionSelected={this.handleActionSelected.bind(this)}
                    style={styles.toolbar}>
                    {content}
                </ReactNative.ToolbarAndroid>
            </ReactNative.View>
        );
    }

    private handleActionSelected(position: number) {
        let items = this.props.extraItems || [];
        if (this.props.rightItem) {
            items = [this.props.rightItem, ...items];
        }
        const item = items[position];
        item && item.onPress && item.onPress();
    }
}


class HeaderIOS extends React.Component<IProps, any> {
    public static height: number;
    public static __cards__: (define) => any;
    public render() {
        const { leftItem, title, rightItem, foreground } = this.props;
        const titleColor = foreground === 'dark' ? Colors.darkText : 'white';
        const itemsColor = foreground === 'dark' ? Colors.lightText : 'white';

        const content = React.Children.count(this.props.children) === 0
            ? (
                <ReactNative.Text style={[styles.titleText, { color: titleColor }]}>
                    {title}
                </ReactNative.Text>
            )
            : this.props.children;
        return (
            <ReactNative.View style={[styles.header, this.props.style]}>
                <ReactNative.View style={styles.leftItem}>
                    <ItemWrapperIOS color={itemsColor} item={leftItem} />
                </ReactNative.View>
                <ReactNative.View
                    accessible={true}
                    accessibilityLabel={title}
                    accessibilityTraits="header"
                    style={styles.centerItem}>
                    {content}
                </ReactNative.View>
                <ReactNative.View style={styles.rightItem}>
                    <ItemWrapperIOS color={itemsColor} item={rightItem} />
                </ReactNative.View>
            </ReactNative.View>
        );
    }

}

interface IItemWrapperProps {
    item: Item;
    color: string;
}
class ItemWrapperIOS extends React.Component<IItemWrapperProps, any> {
    public render() {
        let { item, color } = this.props;
        if (!item) {
            return null;
        }

        let content;
        let { title, icon, layout, onPress } = item;

        if (layout !== 'icon' && title) {
            content = (
                <Texts.Text style={[styles.itemText, { color }]}>
                    {title.toUpperCase()}
                </Texts.Text>
            );
        } else if (icon) {
            content = <ReactNative.Image source={icon} />;
        }

        return (
            <ReactNative.TouchableOpacity
                // accessibilityLabel={title}
                accessibilityTraits="button"
                onPress={onPress}
                style={styles.itemWrapper}>
                {content}
            </ReactNative.TouchableOpacity>
        );
    }
}


let STATUS_BAR_HEIGHT = ReactNative.Platform.OS === 'ios' ? 20 : 25;
let HEADER_HEIGHT = ReactNative.Platform.OS === 'ios' ? 44 + STATUS_BAR_HEIGHT : 56 + STATUS_BAR_HEIGHT;

let styles = ReactNative.StyleSheet.create({
    toolbarContainer: {
        paddingTop: STATUS_BAR_HEIGHT,
    },
    toolbar: {
        height: HEADER_HEIGHT - STATUS_BAR_HEIGHT,
    },
    header: {
        backgroundColor: 'transparent',
        paddingTop: STATUS_BAR_HEIGHT,
        height: HEADER_HEIGHT,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    leftItem: {
        flex: 1,
        alignItems: 'flex-start',
    } as ReactNative.ViewStyle,
    centerItem: {
        flex: 2,
        alignItems: 'center',
    } as ReactNative.ViewStyle,
    rightItem: {
        flex: 1,
        alignItems: 'flex-end',
    } as ReactNative.ViewStyle,
    itemWrapper: {
        padding: 11,
    },
    itemText: {
        letterSpacing: 1,
        fontSize: 12,
        color: 'white',
    },
});

export const Header = ReactNative.Platform.OS === 'ios' ? HeaderIOS : HeaderAndroid;
Header.height = HEADER_HEIGHT;
// $FlowFixMe
Header.__cards__ = (define) => {
    let menuItem: Item = {
        title: 'Menu',
        icon: require('../../../asserts/base/common/hamburger.png'),
        onPress: () => alert('Menu button pressed!'),

    };
    let filterItem = {
        title: 'Filter',
        icon: require('../../../asserts/base/common/filter.png'),
        onPress: () => alert('Filter button pressed!'),
    };

    define('Simple', () => <Header title="Hello, world" />);
    define('With items', () => (
        <Header
            title="Default"
            leftItem={menuItem}
            rightItem={filterItem}
        />
    ));
    define('Forcing icons', () => (
        <Header
            title="Forcing icons"
            leftItem={{ ...menuItem, layout: 'icon' }}
            rightItem={{ ...filterItem, layout: 'icon' }}
        />
    ));
    define('Forcing title', () => (
        <Header
            title="Forcing title"
            leftItem={{ ...menuItem, layout: 'title' }}
            rightItem={{ ...filterItem, layout: 'title' }}
        />
    ));
    define('With content', () => (
        <Header leftItem={menuItem}>
            <ReactNative.View style={{ backgroundColor: '#224488' }}>
                <Texts.Text style={{ color: 'yellow' }}>
                    Yellow text as title
                </Texts.Text>
            </ReactNative.View>
        </Header>
    ));
    define('With Background', () => (
        <Header
            title="With Background"
            leftItem={{ ...menuItem, layout: 'title' }}
            rightItem={{ ...filterItem, layout: 'title' }}
            style={{ backgroundColor: '#224488' }}
        />
    ));
    define('With light background', () => (
        <Header
            title="Light Background"
            leftItem={{ ...menuItem, layout: 'title' }}
            rightItem={{ ...filterItem, layout: 'title' }}
            style={{ backgroundColor: 'white' }}
            foreground="dark"
        />
    ));
};
