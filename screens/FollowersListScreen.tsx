import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import FollowerListComponent from '../Components/FollowerListComponent';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import baseApi from '../api/baseApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';

const FollowersListScreen = (props: any) => {
    const { colors, dark } = useTheme();
    const [followersdata, setfollowersdata] = useState();
    //const [followersdata, setfollowersdata] = useState();
    //const [followersdata, setfollowersdata] = useState();

    useEffect(() => {
        setdata();
    });

    function setdata() {
        setfollowersdata(props.route.params.followersdata);
        console.log(followersdata);
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: dark ? colors.primary : colors.background,
            }}
        >
            <FlatList
                data={followersdata}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <FollowerListComponent id={item.followers.user.id} />
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default FollowersListScreen;
