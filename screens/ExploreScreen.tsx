import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import Header from '../Components/Header';
import ExplorePostScreen from './ExplorePostScreen';
import TrendingPostScreen from './TrendingPostScreen';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as SecureStore from 'expo-secure-store';
import { useTheme } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

const ExploreScreen = () => {
    const { colors, dark } = useTheme();
    const [tabColor, setTabColor] = useState('orange');

    return (
        <SafeAreaView
            style={{
                flex: 1,
                paddingTop: 0,
                backgroundColor: dark ? colors.primary : colors.background,
            }}
        >
            <StatusBar
                barStyle={dark ? 'light-content' : 'dark-content'}
                backgroundColor={dark ? '#000' : '#fff'}
            />
            <Header HeaderName='Explore' screen='SearchScreen' />
            <Tab.Navigator
                tabBarOptions={{
                    indicatorStyle: {
                        height: 0,
                    },
                    activeTintColor: '#000',
                    inactiveTintColor: '#787878',
                    pressColor: '#ececec',
                    style: {
                        backgroundColor: '#CBCBFF',
                        borderRadius: 25,
                        marginHorizontal: 10,
                        marginVertical: 5,
                    },
                    labelStyle: { fontSize: 13 },
                }}
            >
                <Tab.Screen name='Explore' component={ExplorePostScreen} />
                <Tab.Screen name='Trending' component={TrendingPostScreen} />
            </Tab.Navigator>
        </SafeAreaView>
    );
};

export default ExploreScreen;
