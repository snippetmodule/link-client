import * as React from 'react';
import *as ReactNative from 'react-native';

import * as Common from '../../base/common';


// TODO: Pull redux connection up
// const {connect} = require('react-redux');
// const {clearFilter} = require('../../actions');
type Prop = {
    filter?: any;
    onClearFilter?: () => {};
};
class FilterHeader extends React.Component<Prop, any> {
    public render() {
        let topics = Object.keys(this.props.filter);
        if (topics.length === 0) {
            return null;
        }

        return (
            <ReactNative.View style={styles.container as React.ViewStyle}>
                <ReactNative.Text style={styles.text} numberOfLines={1}>
                    {'Filters: '}
                    <ReactNative.Text style={styles.filters}>
                        {topics.join(', ')}
                    </ReactNative.Text>
                </ReactNative.Text>
                <ReactNative.TouchableOpacity
                    // accessibilityLabel="Clear filter"
                    accessibilityTraits="button"
                    style={styles.clear as React.ViewStyle}
                    onPress={this.props.onClearFilter}>
                    <ReactNative.Image source={require('../../common/img/x-white.png')} />
                </ReactNative.TouchableOpacity>
            </ReactNative.View>
        );
    }
}

let styles = ReactNative.StyleSheet.create({
    container: {
        height: 36,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#12336B',
        paddingLeft: 16,
    },
    text: {
        flex: 1,
        fontSize: 12,
        color: 'white',
    },
    clear: {
        paddingHorizontal: 16,
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    filters: {
        color: 'rgba(255, 255, 255, 0.65)',
    }
});

// function select(store) {
//     return {
//         filter: store.filter,
//     };
// }

// function actions(dispatch) {
//     return {
//         onClearFilter: () => dispatch(clearFilter()),
//     };
// }

// module.exports = connect(select, actions)(FilterHeader);
export { FilterHeader }