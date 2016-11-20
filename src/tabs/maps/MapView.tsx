import * as React from 'react';
import *as ReactNative from 'react-native';
import { connect } from 'react-redux';
import * as Common from '../../base/common';


let VENUE_ADDRESS = '2 Marina Blvd, San Francisco, CA 94123';
type Prop = {
    map1: Common.Map;
    map2: Common.Map;
};
class MapViewImpl extends React.Component<Prop, any> {
    public render() {
        const {map1, map2} = this.props;

        return (
            <ReactNative.View style={styles.container}>
                <Common.ListContainer
                    title="Maps"
                    backgroundImage={require('./img/maps-background.png')}
                    backgroundColor={'#9176D2'}>
                    <Common.PureListView
                        title="Overview"
                        renderEmptyList={() => <Common.MapView map={map1} />}
                        renderRow={() => null}
                        />
                    <Common.PureListView
                        title="Developer Garage"
                        renderEmptyList={() => <Common.MapView map={map2} />}
                        renderRow={() => null}
                        />
                </Common.ListContainer>
                <Common.Button
                    type="secondary"
                    icon={require('./img/directions.png')}
                    caption="Directions to Fort Mason Center"
                    onPress={this.handleGetDirections}
                    style={styles.directionsButton}
                    />
            </ReactNative.View>
        );
    }

    private handleGetDirections() {
        if (ReactNative.Platform.OS === 'ios') {
            ReactNative.ActionSheetIOS.showActionSheetWithOptions(
                {
                    title: VENUE_ADDRESS,
                    options: ['Open in Apple Maps', 'Open in Google Maps', 'Cancel'],
                    destructiveButtonIndex: -1,
                    cancelButtonIndex: 2,
                },
                this.openMaps
            );
        } else if (ReactNative.Platform.OS === 'android') {
            let address = encodeURIComponent(VENUE_ADDRESS);
            ReactNative.Linking.openURL('http://maps.google.com/maps?&q=' + address);
        }
    }

    private openMaps(option) {
        let address = encodeURIComponent(VENUE_ADDRESS);
        switch (option) {
            case 0:
                ReactNative.Linking.openURL('http://maps.apple.com/?q=' + address);
                break;

            case 1:
                let nativeGoogleUrl = 'comgooglemaps-x-callback://?q=' +
                    address + '&x-success=f8://&x-source=F8';
                ReactNative.Linking.canOpenURL(nativeGoogleUrl).then((supported) => {
                    let url = supported ? nativeGoogleUrl : 'http://maps.google.com/?q=' + address;
                    ReactNative.Linking.openURL(url);
                });
                break;
            default:
                break;
        }
    }
}

let styles = Common.StyleSheet.create({
    container: {
        flex: 1,
    },
    directionsButton: {
        borderTopWidth: 1,
        borderTopColor: '#eee',
        position: 'absolute',
        left: 0,
        right: 0,
        backgroundColor: 'white',
        ios: {
            bottom: 49,
        },
        android: {
            bottom: 0,
        },
    },
});

function select(store) {
    return {
        map1: store.maps.find((map) => map.name === 'Overview'),
        map2: store.maps.find((map) => map.name === 'Developer Garage'),
    };
}

export let MapView = connect(select)(MapViewImpl);
