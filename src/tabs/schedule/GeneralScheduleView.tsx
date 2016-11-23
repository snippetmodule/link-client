import * as React from 'react';
import *as ReactNative from 'react-native';
const { connect } = require('react-redux');

import * as Common from '../../base/common';
import { EmptySchedule } from './EmptySchedule';
import { FilterHeader } from './FilterHeader';
import *as FilterSessions from './filterSessions';
import { ScheduleListView } from './ScheduleListView';
import { FilterScreen } from '../../filter/FilterScreen';

// var { connect } = require('react-redux');
import { switchDay ,Dispatch} from '../../actions';
import { Session } from '../../reducers/sessions';

// TODO: Move from reselect to memoize?
import { createSelector } from 'reselect';

const data = createSelector(
    (store: any) => store.sessions,
    (store) => store.filter,
    (sessions, filter) => FilterSessions.byTopics(sessions, filter),
);

type Props = {
    filter?: any;
    day?: number;
    sessions?: Array<Session>;
    navigator: ReactNative.Navigator;
    switchDay?: (day: number) => void;
    dispatch?: Dispatch;
};
// export { GeneralScheduleView }

// export let GeneralScheduleView = connect(select, actions)(GeneralScheduleViewImpl);
@connect(
    (store: any) => ({
        day: store.navigation.day,
        filter: store.filter,
        sessions: data(store),
    }),
    dispatch => ({
        switchDay: (day) => dispatch(switchDay(day)),
        dispatch,
    })
)
export class GeneralScheduleView extends React.Component<Props, any> {
    private _drawer?: Common.DrawerLayout;

    public render() {
        const filterItem = {
            icon: require('../../../asserts/base/common/filter.png'),
            title: 'Filter',
            onPress: this.openFilterScreen.bind(this),
        };

        const filterHeader = Object.keys(this.props.filter).length > 0
            ? <FilterHeader />
            : null;

        const content = (
            <Common.ListContainer
                title="Schedule"
                selectedSegment={this.props.day - 1}
                onSegmentChange={this.switchDay.bind(this)}
                backgroundImage={require('../../../asserts/tabs/schedule/schedule-background.png')}
                backgroundColor="#5597B8"
                selectedSectionColor="#51CDDA"
                stickyHeader={filterHeader}
                rightItem={filterItem}>
                <ScheduleListView
                    title="Day 1"
                    day={1}
                    sessions={this.props.sessions}
                    renderEmptyList={this.renderEmptyList.bind(this)}
                    navigator={this.props.navigator}
                    />
                <ScheduleListView
                    title="Day 2"
                    day={2}
                    sessions={this.props.sessions}
                    renderEmptyList={this.renderEmptyList.bind(this)}
                    navigator={this.props.navigator}
                    />
            </Common.ListContainer>
        );

        if (ReactNative.Platform.OS === 'ios') {
            return content;
        }
        return (
            <Common.DrawerLayout
                ref={(ref) => { this._drawer = ref; } }
                drawerWidth={300}
                drawerPosition="right"
                renderNavigationView={this.renderNavigationView.bind(this)}>
                {content}
            </Common.DrawerLayout>
        );
    }

    private renderNavigationView() {
        return <FilterScreen onClose={() => this._drawer && this._drawer.closeDrawer()} {...this.props} />;
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
//     return {
//         day: store.navigation.day,
//         filter: store.filter,
//         sessions: data(store),
//     };
// }

// function actions(dispatch) {
//     return {
//         switchDay: (day) => dispatch(switchDay(day)),
//     };
// }
// export { GeneralScheduleView }

// export let GeneralScheduleView = connect(select, actions)(GeneralScheduleViewImpl);
