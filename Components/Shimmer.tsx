import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import LottieView from 'lottie-react-native';

const Shimmer = () => {
    return (
        <View
            style={{
                width: '100%',
                display: 'flex',
                flex: 1,
            }}
        >
            <LottieView
                autoPlay
                loop
                //source={require('../assets/animation.json')}
                source={require('../assets/animation.json')}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default Shimmer;
