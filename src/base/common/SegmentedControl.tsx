import * as React from 'react';
import * as ReactNative from 'react-native';
import { StyleSheet } from './StyleSheet';
import { Texts } from './Text';

type Prop = {
  values: string[];
  selectionColor?: string;
  selectedIndex: number;
  onChange: (newIndex: number) => void;
  style?: any;
};
class SegmentedControl extends React.Component<Prop, any> {

  public render() {
    let segments = this.props.values.map(
      (value, index) => (
        <Segment
          key={value}
          value={value}
          isSelected={index === this.props.selectedIndex}
          selectionColor={this.props.selectionColor || 'white'}
          onPress={() => this.props.onChange(index)}
        />
      ));
    return (
      <ReactNative.View style={[styles.container, this.props.style]}>
        {segments}
      </ReactNative.View>
    );
  }
}
type SegmentProp = {
  value: string;
  isSelected: boolean;
  selectionColor: string;
  onPress: () => void;
};
class Segment extends React.Component<SegmentProp, any> {

  public render() {
    let selectedButtonStyle;
    if (this.props.isSelected) {
      selectedButtonStyle = { borderColor: this.props.selectionColor };
    }
    let deselectedLabelStyle;
    if (!this.props.isSelected && ReactNative.Platform.OS === 'android') {
      deselectedLabelStyle = styles.deselectedLabel;
    }
    let title = this.props.value && this.props.value.toUpperCase();

    let accessibilityTraits: ReactNative.ViewAccessibilityTraits[] = ['button'];
    if (this.props.isSelected) {
      accessibilityTraits.push('selected');
    }

    return (
      <ReactNative.TouchableOpacity
        accessibilityTraits={accessibilityTraits}
        activeOpacity={0.8}
        onPress={this.props.onPress}
        style={[styles.button, selectedButtonStyle]}>
        <Texts.Text style={[styles.label, deselectedLabelStyle]}>
          {title}
        </Texts.Text>
      </ReactNative.TouchableOpacity>
    );
  }
}

const HEIGHT = 32;

let styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    ios: {
      paddingBottom: 6,
      justifyContent: 'center',
      alignItems: 'center',
    },
    android: {
      paddingLeft: 60,
    },
  },
  button: {
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    ios: {
      height: HEIGHT,
      paddingHorizontal: 20,
      borderRadius: HEIGHT / 2,
      borderWidth: 1,
    },
    android: {
      paddingBottom: 6,
      paddingHorizontal: 10,
      borderBottomWidth: 3,
      marginRight: 10,
    },
  },
  label: {
    letterSpacing: 1,
    fontSize: 12,
    color: 'white',
  },
  deselectedLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
});
export { SegmentedControl }
