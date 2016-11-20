import * as React from 'react';
import *as ReactNative from 'react-native';
import { connect } from 'react-redux';
import * as Common from '../../base/common';
import { CommonQuestions } from './CommonQuestions';
import { WiFiDetails } from './WiFiDetails';
import { LinksList } from './LinksList';

const POLICIES_LINKS = [{
    title: 'Terms of Service',
    url: 'https://m.facebook.com/terms?_rdr',
}, {
    title: 'Data Policy',
    url: 'https://m.facebook.com/policies?_rdr',
}, {
    title: 'Code of Conduct',
    url: 'https://www.fbf8.com/code-of-conduct',
}];

export function InfoView() {
    return (
        <Common.ListContainer
            title="Information"
            backgroundImage={require('./img/info-background.png')}
            backgroundColor={'#47BFBF'}>
            <InfoList {...this.props} />
        </Common.ListContainer>
    );
}

function InfoList({viewer: {config, faqs, pages}, ...props}) {
    return (
        <Common.PureListView
            renderEmptyList={() => (
                <ReactNative.View>
                    <WiFiDetails
                        network={config.wifiNetwork}
                        password={config.wifiPassword}
                        />
                    <CommonQuestions faqs={faqs} />
                    <LinksList title="Facebook pages" links={pages} />
                    <LinksList title="Facebook policies" links={POLICIES_LINKS} />
                </ReactNative.View>
            )}
            renderRow={this.prop.renderRow}
            {...props}
            />
    );
}

// InfoList = Relay.createContainer(InfoList, {
//   fragments: {
//     viewer: () => Relay.QL`
//       fragment on User {
//         config {
//           wifiNetwork
//           wifiPassword
//         }
//         faqs {
//           question
//           answer
//         }
//         pages {
//           title
//           url
//           logo
//         }
//       }
//     `,
//   },
// });

// module.exports = F8InfoView;
