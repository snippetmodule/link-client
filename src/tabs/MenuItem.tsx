import * as React from 'react';
import * as ReactNative from 'react-native';
import * as Common from '../base/common';
type Prop = {
    icon: number;
    selectedIcon: number;
    selected: boolean;
    title: string;
    badge?: string;
    onPress: () => void;
};
class MenuItem extends React.Component<Prop, any> {
    public render() {
        let icon = this.props.selected ? this.props.selectedIcon : this.props.icon;
        let selectedTitleStyle = this.props.selected && styles.selectedTitle;
        let badge;
        if (this.props.badge) {
            badge = (
                <ReactNative.View style={styles.badge}>
                    <Common.Texts.Text style={styles.badgeText}>
                        {this.props.badge}
                    </Common.Texts.Text>
                </ReactNative.View>
            );
        }
        return (
            <Common.Touchable onPress={this.props.onPress}>
                <ReactNative.View style={styles.container as React.ViewStyle}>
                    <ReactNative.Image style={styles.icon} source={icon} />
                    <Common.Texts.Text style={[styles.title, selectedTitleStyle]}>
                        {this.props.title}
                    </Common.Texts.Text>
                    {badge}
                </ReactNative.View>
            </Common.Touchable>
        );
    }
}

let styles = ReactNative.StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    icon: {
        marginRight: 20,
    },
    title: {
        flex: 1,
        fontSize: 17,
        color: Common.Colors.lightText,
    },
    selectedTitle: {
        color: Common.Colors.darkText,
    },
    badge: {
        backgroundColor: '#DC3883',
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 10,
    },
    badgeText: {
        fontSize: 12,
        color: 'white',
    },
});

export { MenuItem }
