import * as React from 'react';
import * as ReactNative from 'react-native';
import * as Common from '../base/common';
// const { connect } = require('react-redux');


type Prop = {
    navigator: ReactNative.Navigator;
};
export class NoteHistoryView extends React.Component<Prop, any> {

    public render() {
        return (
            <ReactNative.View style={{ flex: 1 }}>
                <Common.ListContainer
                    title="Note"
                    backgroundImage={require('../../asserts/tabs/notifications/notifications-background.png')}
                    backgroundColor={'#E78196'} >
                    {null}
                </Common.ListContainer>
            </ReactNative.View>
        );
    }
}