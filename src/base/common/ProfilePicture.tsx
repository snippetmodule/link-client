
import * as React from 'react';
import *as ReactNative from 'react-native';

type Prop = {
    userID: string;
    size: number;
};
export class ProfilePicture extends React.Component<Prop, any> {
    public render() {
        const {userID, size} = this.props;
        const scaledSize = size * ReactNative.PixelRatio.get();
        const uri = `http://graph.facebook.com/${userID}/picture?width=${scaledSize}&height=${scaledSize}`;
        return (
            <ReactNative.Image
                source={{ uri }}
                style={{
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                }}
                />
        );
    }
}