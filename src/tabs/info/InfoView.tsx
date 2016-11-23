import * as React from 'react';
import *as ReactNative from 'react-native';
// import { connect } from 'react-redux';
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

export function InfoView(props) {
    return (
        <Common.ListContainer
            title="Information"
            backgroundImage={require('../../../asserts/tabs/info/info-background.png')}
            backgroundColor={'#47BFBF'}>
            <InfoList {...props} />
        </Common.ListContainer>
    );
}

function InfoList(/*{viewer: {config, faqs, pages}, ...props}*/) {
    return (
        <Common.PureListView
            renderEmptyList={() => (
                <ReactNative.View>
                    <WiFiDetails
                        network="config.wifiNetwork"
                        password="config.wifiPassword"
                        />
                    <LinksList title="Facebook policies" links={POLICIES_LINKS} />
                    <LinksList title="Third Party Notices" links={[{
                            title: 'Third Party Notices',
                            url: 'https://raw.githubusercontent.com/CatalystCode/ThirdPartyNotices/master/f8_third_party_notices.html',}]}
                    />
                </ReactNative.View>
            )}
            // renderRow={this.prop.renderRow}
            />
    );
}

// InfoList = Relay.createContainer(InfoList, {
//     fragments: {
//         viewer: () => Relay.QL`
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
//     },
// });

// module.exports = F8InfoView;
