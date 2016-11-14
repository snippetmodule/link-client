import * as React from 'react';
import * as ReactNative from 'react-native';

type Prop = {
  style?: any,
  count: number,
  selectedIndex: number,
}
class PageControl extends React.Component<Prop, void> {
  public render() {
    let images = [];
    for (let i = 0; i < this.props.count; i++) {
      let isSelected = this.props.selectedIndex === i;
      images.push(<Circle key={i} isSelected={isSelected} />);
    }
    return (
      <ReactNative.View style={[styles.container, this.props.style]}>
        <ReactNative.View style={styles.innerContainer}>
          {images}
        </ReactNative.View>
      </ReactNative.View>
    );
  }
}

class Circle extends React.Component<any, void> {
  public render() {
    let extraStyle = this.props.isSelected ? styles.full : styles.empty;
    return <ReactNative.View style={[styles.circle, extraStyle]} />;
  }
}

let CIRCLE_SIZE = 4;
let styles = ReactNative.StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
  },
  circle: {
    margin: 2,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
  full: {
    backgroundColor: '#fff',
  },
  empty: {
    backgroundColor: '#fff5',
  },
});

let __cards__ = (define) => {
  define('Simple 2', () => <PageControl count={2} selectedIndex={0} />);
  define('Simple 5', () => <PageControl count={5} selectedIndex={2} />);
};
export { PageControl, __cards__ }