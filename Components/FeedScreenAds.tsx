import React from 'react';
import { StyleSheet, Text, View, Image, UIManager } from 'react-native';

import NativeAdView, {
    CallToActionView,
    IconView,
    HeadlineView,
    TaglineView,
    AdvertiserView,
    AdBadge,
    AdManager,
} from 'react-native-admob-native-ads';

const FeedScreenAds = () => {
    //"googleMobileAdsAppId": "ca-app-pub-2162124738043259~2445693531"

    return (
        <NativeAdView
            style={{ width: '95%', alignSelf: 'center', height: 100 }}
            enableTestMode={true}
            adUnitID={'ca-app-pub-3940256099942544/2247696110'} // TEST adUnitID
            requestNonPersonalizedAdsOnly={false}
        >
            <View
                style={{
                    height: 100,
                    width: '95%',
                    backgroundColor: 'white',
                }}
            ></View>
        </NativeAdView>
    );
};

const styles = StyleSheet.create({});
export default FeedScreenAds;
