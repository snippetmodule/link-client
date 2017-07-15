
import * as React from 'react';
import * as ReactNative from 'react-native';

// interface contextTypes {
//     addBackButtonListener: React.PropTypes.func,
//     removeBackButtonListener: React.PropTypes.func,
// };

type Props = {
    drawerPosition?: 'right' | 'left';
    drawerWidth: number;
    renderNavigationView: () => JSX.Element;
    onDrawerOpen?: () => any;
    onDrawerClose?: () => any;
    [key: string]: any;
}
export class DrawerLayout extends React.Component<Props, any> {
    public static contextTypes = {
        addBackButtonListener: React.PropTypes.func,
        removeBackButtonListener: React.PropTypes.func,
    };
    private _drawer: ReactNative.DrawerLayoutAndroid;
    public render() {
        const { drawerPosition } = this.props;
        // const {Right, Left} = ReactNative.DrawerLayoutAndroid.positions;
        return (
            <ReactNative.DrawerLayoutAndroid
                ref={(drawer) => { this._drawer = drawer as any; }}
                {...this.props}
                renderNavigationView={this.props.renderNavigationView}
                drawerPosition={drawerPosition === 'right' ? (ReactNative.DrawerLayoutAndroid as any).positions.Right : (ReactNative.DrawerLayoutAndroid as any).positions.Left}
                onDrawerOpen={this.onDrawerOpen.bind(this)}
                onDrawerClose={this.onDrawerClose.bind(this)} />
        );
    }

    public componentWillUnmount() {
        this.context.removeBackButtonListener(this.handleBackButton.bind(this));
        this._drawer = null;
    }

    private handleBackButton(): boolean {
        this.closeDrawer();
        return true;
    }

    private onDrawerOpen() {
        this.context.addBackButtonListener(this.handleBackButton.bind(this));
        this.props.onDrawerOpen && this.props.onDrawerOpen();
    }

    private onDrawerClose() {
        this.context.removeBackButtonListener(this.handleBackButton.bind(this));
        this.props.onDrawerClose && this.props.onDrawerClose();
    }

    public closeDrawer() {
        this._drawer && this._drawer.closeDrawer();
    }

    public openDrawer() {
        this._drawer && this._drawer.openDrawer();
    }
}



