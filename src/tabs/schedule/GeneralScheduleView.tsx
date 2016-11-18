import * as React from 'react';
import *as ReactNative from 'react-native';

import * as Common from '../../base/common';
import { Session } from '../../model/Session';
import {EmptySchedule }from './EmptySchedule';
import {FilterHeader} from './FilterHeader';

// var EmptySchedule = require('./EmptySchedule');
// var FilterHeader = require('./FilterHeader');
// var FilterSessions = require('./filterSessions');
// var ScheduleListView = require('./ScheduleListView');
// var FilterScreen = require('../../filter/FilterScreen');

// var { connect } = require('react-redux');
// var {switchDay} = require('../../actions');

// import type {Session } from '../../reducers/sessions';

// TODO: Move from reselect to memoize?
var { createSelector } = require('reselect');

const data = createSelector(
    (store) => store.sessions,
    (store) => store.filter,
    (sessions, filter) => FilterSessions.byTopics(sessions, filter),
);

type Props = {
    filter: any;
    day: number;
    sessions: Array<Session>;
    navigator: ReactNative.Navigator;
    logOut: () => void;
    switchDay: (day: number) => void;
};

class GeneralScheduleView extends React.Component<Props, any> {
    private _drawer?: Common.DrawerLayout;

    public render() {
        const filterItem = {
            icon: require('../../common/img/filter.png'),
            title: 'Filter',
            onPress: this.openFilterScreen,
        };

        const filterHeader = Object.keys(this.props.filter).length > 0
            ? <FilterHeader />
            : null;

        const content = (
            <Common.ListContainer
                title="Schedule"
                selectedSegment={this.props.day - 1}
                onSegmentChange={this.switchDay}
                backgroundImage={require('./img/schedule-background.png')}
                backgroundColor="#5597B8"
                selectedSectionColor="#51CDDA"
                stickyHeader={filterHeader}
                rightItem={filterItem}>
                <ScheduleListView
                    title="Day 1"
                    day={1}
                    sessions={this.props.sessions}
                    renderEmptyList={this.renderEmptyList}
                    navigator={this.props.navigator}
                    />
                <ScheduleListView
                    title="Day 2"
                    day={2}
                    sessions={this.props.sessions}
                    renderEmptyList={this.renderEmptyList}
                    navigator={this.props.navigator}
                    />
            </Common.ListContainer>
        );

        if (ReactNative.Platform.OS === 'ios') {
            return content;
        }
        return (
            <Common.DrawerLayout
                ref={(drawer) => { this._drawer = drawer; } }
                drawerWidth={300}
                drawerPosition="right"
                renderNavigationView={this.renderNavigationView}>
                {content}
            </Common.DrawerLayout>
        );
    }

    private renderNavigationView() {
        return <FilterScreen onClose={() => this._drawer && this._drawer.closeDrawer()} />;
    }

    private renderEmptyList(day: number) {
        return (
            <EmptySchedule
                title={`No sessions on day ${day} match the filter`}
                text="Check the schedule for the other day or remove the filter."
                />
        );
    }

    private openFilterScreen() {
        if (ReactNative.Platform.OS === 'ios') {
            this.props.navigator.push({ filter: 123 });
        } else {
            this._drawer && this._drawer.openDrawer();
        }
    }

    private switchDay(page) {
        this.props.switchDay(page + 1);
    }
}

// function select(store) {
//   return {
//     day: store.navigation.day,
//     filter: store.filter,
//     sessions: data(store),
//   };
// }

// function actions(dispatch) {
//   return {
//     switchDay: (day) => dispatch(switchDay(day)),
//   };
// }
export { GeneralScheduleView }

// module.exports = connect(select, actions)(GeneralScheduleView);
