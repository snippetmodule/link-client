
import * as React from 'react';
import *as ReactNative from 'react-native';

// interface contextTypes {
//     addBackButtonListener: React.PropTypes.func,
//     removeBackButtonListener: React.PropTypes.func,
// };

interface IProps {
    onDrawerOpen?: () => any;
    onDrawerClose?: () => any;
    [key: string]: any;
}

export class DrawerLayout extends React.Component<IProps, any> {
    public context: any;

    public static contextTypes = {
        addBackButtonListener: React.PropTypes.func,
        removeBackButtonListener: React.PropTypes.func,
    }
    private _drawer: ReactNative.DrawerLayoutAndroid;

    constructor(props: IProps, context: any) {
        super(props, context);
    }

    public render() {
        const {drawerPosition, props} = this.props;
        // const {Right, Left} = ReactNative.DrawerLayoutAndroid.positions;
        return (
            <ReactNative.DrawerLayoutAndroid
                ref={(drawer) => { this._drawer = drawer; } }
                {...props}
                drawerPosition={drawerPosition === 'right' ? 'right' : 'left'}
                onDrawerOpen={this.onDrawerOpen}
                onDrawerClose={this.onDrawerClose}
                />
        );
    }

    public componentWillUnmount() {
        this.context.removeBackButtonListener(this.handleBackButton);
        this._drawer = null;
    }

    private handleBackButton(): boolean {
        this.closeDrawer();
        return true;
    }

    private onDrawerOpen() {
        this.context.addBackButtonListener(this.handleBackButton);
        this.props.onDrawerOpen && this.props.onDrawerOpen();
    }

    private onDrawerClose() {
        this.context.removeBackButtonListener(this.handleBackButton);
        this.props.onDrawerClose && this.props.onDrawerClose();
    }

    public closeDrawer() {
        this._drawer && this._drawer.closeDrawer();
    }

    public openDrawer() {
        this._drawer && this._drawer.openDrawer();
    }
}



