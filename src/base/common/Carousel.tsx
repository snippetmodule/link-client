import * as React from 'react';

import { ViewPager } from './ViewPager';
import { StyleSheet } from './StyleSheet';

interface IProps {
    count: number;
    selectedIndex: number;
    onSelectedIndexChange?: (index: number) => void;
    renderCard: (index: number) => JSX.Element;
    style?: any;
};

class Carousel extends React.Component<IProps, any> {

    public render() {
        let cards = [];
        const {count, selectedIndex, renderCard} = this.props;

        for (let i = 0; i < count; i++) {
            let content = null;
            if (Math.abs(i - selectedIndex) < 2) {
                content = renderCard(i);
            }
            cards.push(content);
        }
        return (
            <ViewPager style={styles.carousel} {...this.props} bounces={true}>
                {cards}
            </ViewPager>
        );
    }
}

let styles = StyleSheet.create({
    carousel: {
        ios: {
            margin: 10,
            overflow: 'visible',
            backgroundColor: 'black',
        },
    },
});
export { Carousel }
