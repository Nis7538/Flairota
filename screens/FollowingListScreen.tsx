import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import FollowerListComponent from '../Components/FollowerListComponent';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import baseApi from '../api/baseApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';

const FollowingListScreen = (props: any) => {
    const { colors, dark } = useTheme();
    const [followingdata, setfollowingdata] = useState();
    //const [followersdata, setfollowersdata] = useState();
    //const [followersdata, setfollowersdata] = useState();

    useEffect(() => {
        setdata();
    });

    function setdata() {
        setfollowingdata(props.route.params.followingdata);
        console.log(followingdata);
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: dark ? colors.primary : colors.background,
            }}
        >
            <FlatList
                data={followingdata}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <FollowerListComponent id={item.following.user.id} />
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default FollowingListScreen;
