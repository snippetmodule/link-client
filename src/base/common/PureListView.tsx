import * as React from 'react';
import * as ReactNative from 'react-native';

type Rows = Array<Object>;
type RowsAndSections = {
    [sectionID: string]: Object;
};

export type Data = Rows | RowsAndSections;
type RenderElement = () => JSX.Element;

type Prop = {
    data?: Data;
    renderEmptyList?: RenderElement;
    minContentHeight?: number;
    renderFooter?: RenderElement;
    contentInset?: { top: number; bottom: number; };
    renderRow?: (rowData: any, sectionID: string | number, rowID: string | number, highlightRow?: boolean) => React.ReactElement<any>;
    [key: string]: any;
};

type State = {
    contentHeight: number;
    dataSource: ReactNative.ListViewDataSource;
};

// FIXME: Android has a bug when scrolling ListView the view insertions
// will make it go reverse. Temporary fix - pre-render more rows
const LIST_VIEW_PAGE_SIZE = ReactNative.Platform.OS === 'android' ? 20 : 1;

export class PureListView extends React.Component<Prop, State> {
    public static defaultProps: Prop = {
        data: [],
        contentInset: { top: 0, bottom: 0 },
        // TODO: This has to be scrollview height + fake header
        minContentHeight: ReactNative.Dimensions.get('window').height + 20,
        renderSeparator: (sectionID, rowID) => <ReactNative.View style={styles.separator} key={rowID} />,
    };
    private mListView: any;

    constructor(props: Prop) {
        super(props);
        let dataSource = new ReactNative.ListView.DataSource({
            getRowData: (dataBlob, sid, rid) => dataBlob[sid][rid],
            getSectionHeaderData: (dataBlob, sid) => dataBlob[sid],
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });

        this.state = {
            contentHeight: 0,
            dataSource: cloneWithData(dataSource, props.data),
        };
    }

    public componentWillReceiveProps(nextProps: Prop) {
        if (this.props.data !== nextProps.data) {
            this.setState({
                contentHeight: this.state.contentHeight,
                dataSource: cloneWithData(this.state.dataSource, nextProps.data),
            });
        }
    }

    public render() {
        const {contentInset} = this.props;
        const bottom = contentInset.bottom +
            Math.max(0, this.props.minContentHeight - this.state.contentHeight);
        return (
            <ReactNative.ListView
                initialListSize={10}
                pageSize={LIST_VIEW_PAGE_SIZE}
                {...this.props}
                ref={ref => this.mListView = ref}
                dataSource={this.state.dataSource}
                renderRow={this.props.renderRow ? this.props.renderRow : null}
                renderFooter={this.renderFooter.bind(this)}
                contentInset={{ bottom, top: contentInset.top }}
                enableEmptySections={true}
                // onContentSizeChange={this.onContentSizeChange}
                />
        );
    }

    public onContentSizeChange(contentWidth: number, _contentHeight: number) {
        if (_contentHeight !== this.state.contentHeight) {
            this.setState({ contentHeight: _contentHeight, dataSource: this.state.dataSource });
        }
    }

    public scrollTo(...args: Array<any>) {
        this.mListView.scrollTo(...args);
    }

    private renderFooter(): JSX.Element {
        if (this.state.dataSource.getRowCount() === 0) {
            return this.props.renderEmptyList && this.props.renderEmptyList();
        }
        return this.props.renderFooter && this.props.renderFooter();
    }
}

function cloneWithData(dataSource: ReactNative.ListViewDataSource, data: Data) {
    if (!data) {
        return dataSource.cloneWithRows([]);
    }
    if (Array.isArray(data)) {
        return dataSource.cloneWithRows(data);
    }
    return dataSource.cloneWithRowsAndSections(data);
}

let styles = ReactNative.StyleSheet.create({
    separator: {
        backgroundColor: '#eeeeee',
        height: 1,
    },
});

