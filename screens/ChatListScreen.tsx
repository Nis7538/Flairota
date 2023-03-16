import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Chat from './Chat';
import GlobalChat from './GlobalChat';
import { useTheme } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

const ChatListScreen = () => {
    const { colors, dark } = useTheme();
    return (
        <>
            <StatusBar
                barStyle={dark ? 'light-content' : 'dark-content'}
                backgroundColor={dark ? '#000' : '#fff'}
            />
            <Tab.Navigator
                style={{
                    backgroundColor: dark ? colors.primary : colors.background,
                }}
                sceneContainerStyle={{
                    backgroundColor: dark ? colors.primary : colors.background,
                }}
            >
                <Tab.Screen name='Chat' component={Chat} />
                <Tab.Screen name='Global Chat' component={GlobalChat} />
            </Tab.Navigator>
        </>
    );
};

const styles = StyleSheet.create({});

export default ChatListScreen;
