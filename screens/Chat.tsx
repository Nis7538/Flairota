import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Dimensions,
    FlatList,
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import ChatComponent from '../Components/ChatComponent';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useTheme } from '@react-navigation/native';

const Chat = ({ navigation }: any) => {
    const { colors, dark } = useTheme();
    const chatInfo = [
        { name: 'Nishant Shenoy', key: 0 },
        { name: 'Yash Yeole', key: 1 },
        { name: 'Vishal Chaudhari', key: 2 },
        { name: 'Kshitij Dumbre', key: 3 },
        { name: 'Saish Mahajan', key: 4 },
        { name: 'Gaurav Gupta', key: 5 },
    ];

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: dark ? colors.primary : colors.background,
                },
            ]}
        >
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder='Search'
                    placeholderTextColor='grey'
                    style={styles.search}
                />
                <MaterialCommunityIcons
                    name='account-search-outline'
                    size={28}
                    color='black'
                    style={{ marginLeft: -35, elevation: 10 }}
                />
            </View>
            <View>
                <FlatList
                    data={chatInfo}
                    keyExtractor={(item) => item.name.toString()}
                    renderItem={({ item }) => {
                        return (
                            <ChatComponent
                                navigation={navigation}
                                item={item}
                            />
                        );
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        width: '100%',
    },
    searchContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: '100%',
        justifyContent: 'center',
        paddingBottom: 10,
    },
    search: {
        width: '80%',
        height: '120%',
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 14,
        elevation: 2,
        paddingHorizontal: 10,
    },
});

export default Chat;
