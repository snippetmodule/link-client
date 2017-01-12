import * as React from 'react';
import * as ReactNative from 'react-native';

type Prop = {
    url: string;
};
type State = {
    lastTapTimestamp: number;
    isZoomed: boolean;
};
export class ZoomableImage extends React.Component<Prop, State> {
    private srolloView: ReactNative.ScrollView;
    constructor() {
        super();
        this.state = {
            lastTapTimestamp: 0,
            isZoomed: false,
        };
    }

    public render() {
        return (
            <ReactNative.ScrollView
                ref={ref => this.srolloView = ref}
                onScroll={this.onZoomChanged}
                scrollEventThrottle={100}
                scrollsToTop={false}
                alwaysBounceVertical={false}
                alwaysBounceHorizontal={false}
                automaticallyAdjustContentInsets={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                maximumZoomScale={4}
                centerContent={true}
                contentContainerStyle={{ flex: 1 }}>
                <ReactNative.TouchableWithoutFeedback onPress={this.toggleZoom.bind(this)}>
                    <ReactNative.Image
                        style={styles.image as React.ImageStyle}
                        source={{ uri: this.props.url }}
                    />
                </ReactNative.TouchableWithoutFeedback>
            </ReactNative.ScrollView>
        );
    }

    private toggleZoom(e: any) {
        let timestamp = new Date().getTime();
        if (timestamp - this.state.lastTapTimestamp <= 500) {
            let { locationX, locationY } = e.nativeEvent;
            let size = this.state.isZoomed ? { width: 10000, height: 10000 } : { width: 0, height: 0 };
            this.srolloView.scrollResponderZoomTo({ x: locationX, y: locationY, ...size });
        }
        this.setState({ ...this.state, lastTapTimestamp: timestamp });
    }

    private onZoomChanged(e: any) {
        this.setState({ ...this.state, isZoomed: e.nativeEvent.zoomScale > 1 });
    }
}

let styles = ReactNative.StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: 'contain',
    },
});
