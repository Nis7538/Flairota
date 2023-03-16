import React, { createRef, useEffect, useRef } from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import ProfileScreen from './ProfileScreen';
import ExploreScreen from '../screens/ExploreScreen';
import FeedScreen from './FeedScreen';
import ChatScreen from './ChatListScreen';
import Camera from './Camera';
import { Image, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useTheme } from '@react-navigation/native';

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
    const { colors, dark } = useTheme();
    const animation = useRef();

    return (
        <Tab.Navigator
            initialRouteName='Home'
            activeColor='green'
            inactiveColor='red'
            backBehavior={'firstRoute'}
            style={{
                backgroundColor: dark ? colors.primary : colors.background,
            }}
        >
            <Tab.Screen
                name='Feed'
                component={FeedScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarColor: '#000',
                    tabBarIcon: ({ color }) => (
                        <Icon name='ios-home' color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name='Explore'
                component={ExploreScreen}
                options={{
                    tabBarLabel: 'Explore',
                    tabBarColor: '#000',
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name='ios-notifications'
                            color={color}
                            size={26}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name='Camera'
                component={Camera}
                options={{
                    tabBarLabel: 'Camera',
                    tabBarColor: '#000',
                    tabBarIcon: ({ color }) => (
                        <Icon name='ios-person' color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name='Chat'
                component={ChatScreen}
                options={{
                    tabBarLabel: 'Chat',
                    tabBarColor: '#000',
                    tabBarIcon: ({ color }) => (
                        <Icon name='ios-aperture' color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name='Profile'
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarColor: '#000',
                    tabBarIcon: ({ color }) => (
                        <Icon name='ios-aperture' color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default MainTabScreen;
