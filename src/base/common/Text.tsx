import * as React from 'react';
import * as ReactNative from 'react-native';
import { Colors } from './Colors';
import { env } from '../env';
function Text({ style, ...props }: any): JSX.Element {
  return <ReactNative.Text style={[styles.font, style]} {...props} />;
}

export function Heading1({ style, ...props }): JSX.Element {
  return <ReactNative.Text style={[styles.font, styles.h1, style]} {...props} />;
}

export function Paragraph({ style, ...props }): JSX.Element {
  return <ReactNative.Text style={[styles.font, styles.p, style]} {...props} />;
}

const scale = ReactNative.Dimensions.get('window').width / 375;

function normalize(size: number): number {
  return Math.round(scale * size);
}

const styles = ReactNative.StyleSheet.create({
  font: {
    fontFamily: env.fontFamily,
  },
  h1: {
    fontSize: normalize(24),
    lineHeight: normalize(27),
    color: Colors.darkText,
    fontWeight: 'bold',
    letterSpacing: -1,
  },
  p: {
    fontSize: normalize(15),
    lineHeight: normalize(23),
    color: Colors.lightText,
  },
});

let Texts = {
  Text,
  Heading1,
  Paragraph,
};
export { Texts }
