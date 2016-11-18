import * as React from 'react';
import * as ReactNative from 'react-native';

interface IProps {
    style?: any;
    separatorStyle?: any;
    children?: any;
}
export class ItemsWithSeparator extends React.Component<IProps, any>{

    public render() {
        let children = [];
        let length = React.Children.count(this.props.children);
        React.Children.forEach(
            this.props.children,
            (child, ii) => {
                children.push(child);
                if (ii !== length - 1) {
                    children.push(
                        <ReactNative.View
                            key={'separator-' + ii}
                            style={[styles.separator, this.props.separatorStyle]}
                            />
                    );
                }
            }
        );
        return (
            <ReactNative.View style={this.props.style}>
                {children}
            </ReactNative.View>
        );
    }
}

let styles = ReactNative.StyleSheet.create({
    separator: {
        backgroundColor: '#0322500A',
        height: 1 / ReactNative.PixelRatio.get(),
    },
});

