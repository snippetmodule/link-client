import * as React from 'react';
import * as ReactNative from 'react-native';
import { Button } from './Button';

// const { logInWithFacebook } = require('../actions');
// const {connect} = require('react-redux');

type Prop = {
  style?: any;
  source?: string; // For Analytics
  // dispatch: (action: any) => Promise<any>;
  onLoggedIn?: () => void;
}
type State = {
  isLoading: boolean;
}
class LoginButton extends React.Component<Prop, State> {
  private _isMounted: boolean;

  constructor() {
    super();
    this.state = { isLoading: false };
  }

  public componentDidMount() {
    this._isMounted = true;
  }

  public componentWillUnmount() {
    this._isMounted = false;
  }

  public render() {
    if (this.state.isLoading) {
      return (
        <Button
          style={[styles.button, this.props.style]}
          caption="Please wait..."
          onPress={() => { }}
        />
      );
    }

    return (
      <Button
        style={[styles.button, this.props.style]}
        icon={require('../../../asserts/login/f-logo.png')}
        caption="Log in with Facebook"
        onPress={() => this.logIn()}
      />
    );
  }

  private async logIn() {
    const { onLoggedIn } = this.props;

    this.setState({ isLoading: true });
    try {
      await Promise.race([
        // dispatch(logInWithFacebook(this.props.source)),
        timeout(15000),
      ]);
    } catch (e) {
      const message = e.message || e;
      if (message !== 'Timed out' && message !== 'Canceled by user') {
        alert(message);
        console.warn(e);
      }
      return;
    } finally {
      this._isMounted && this.setState({ isLoading: false });
    }

    onLoggedIn && onLoggedIn();
  }
}

async function timeout(ms: number): Promise<any> {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Timed out')), ms);
  });
}

let styles = ReactNative.StyleSheet.create({
  button: {
    alignSelf: 'center',
    width: 270,
  },
});

export { LoginButton }
