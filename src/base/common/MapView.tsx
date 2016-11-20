import * as React from 'react';
import * as ReactNative from 'react-native';

export type Map = {
  id: string;
  name: string;
  x1url: string;
  x2url: string;
  x3url: string;
};
type Prop = {
  map?: Map;
  style?: any;
}
type State = {
  loaded: boolean;
}
class MapView extends React.Component<Prop, State> {
  private _isMounted: boolean;

  constructor() {
    super();
    this.state = { loaded: false };
    this._isMounted = false;
  }

  public componentDidMount() {
    this._isMounted = true;
    ReactNative.InteractionManager.runAfterInteractions(() => {
      this._isMounted && this.setState({ loaded: true });
    });
  }

  public componentWillUnmount() {
    this._isMounted = false;
  }

  public render() {
    let image;
    if (this.state.loaded) {
      image = (
        <ReactNative.Image
          style={styles.map as any}
          source={{ uri: urlForMap(this.props.map) }}
          />
      );
    }
    return (
      <ReactNative.View style={[styles.container, this.props.style]}>
        {image}
      </ReactNative.View>
    );
  }
}

function urlForMap(map?: Map): string {
  if (!map) {
    return '';
  }
  switch (ReactNative.PixelRatio.get()) {
    case 1: return map.x1url;
    case 2: return map.x2url;
    case 3: return map.x3url;
    default: return map.x3url;
  }
}

let styles = ReactNative.StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 400,
  },
  map: {
    flex: 1,
    resizeMode: 'contain',
  },
});

export { MapView }
