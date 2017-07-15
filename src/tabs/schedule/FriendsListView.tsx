import * as React from 'react';
import * as ReactNative from 'react-native';
import * as Common from '../../base/common';

import { EmptySchedule } from './EmptySchedule';
import { SessionsSectionHeader } from './SessionsSectionHeader';
import { InviteFriendsButton } from './InviteFriendsButton';
import { FriendCell } from './FriendCell';

type Friend = any;

type Props = {
    title: string;
    friends: Friend[];
    navigator: ReactNative.Navigator;
};

export class FriendsListView extends React.Component<Props, any> {
    private _innerRef?: Common.PureListView;
    public render() {
        return (
            <Common.PureListView
                ref={this.storeInnerRef}
                data={this.props.friends}
                renderRow={this.renderRow}
                renderSectionHeader={this.renderSectionHeader}
                renderEmptyList={this.renderEmptyList}
                renderFooter={this.renderFooter}
                {...(this.props) }
                />
        );
    }

    private renderSectionHeader() {
        return <SessionsSectionHeader title="See a friend's schedule" />;
    }

    private renderRow(friend: Friend) {
        return (
            <FriendCell
                friend={friend}
                onPress={() => this.openFriendsSchedule(friend)}
                />
        );
    }

    private renderEmptyList() {
        return (
            <EmptySchedule
                image={require('../../../asserts/tabs/schedule/no-friends-found.png')}
                text={'Friends using the F8 app\nwill appear here.'}>
                <InviteFriendsButton />
            </EmptySchedule>
        );
    }

    private renderFooter() {
        return <InviteFriendsButton /*style={{ margin: 20 }} */ />;
    }

    private openFriendsSchedule(friend: Friend) {
        this.props.navigator.push({ friend });
    }

    private storeInnerRef(ref?: Common.PureListView) {
        this._innerRef = ref;
    }

    private scrollTo(...args: any[]) {
        this._innerRef && this._innerRef.scrollTo(...args);
    }

    // private getScrollResponder(): any {
    //     return this._innerRef && this._innerRef.getScrollResponder();
    // }
}

