import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import {
    FlatList,
    TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

import baseApi from '../api/baseApi';
import { baseImageUrl } from '../images/imageBaseUrl';
import ExploreScreen from '../screens/ExploreScreen';
const Posts = (props: any) => {
    const navigation = useNavigation();
    const [DATA, setData] = useState();
    const [refresh, setrefresh] = useState(0);
    let [clickedProfileUserId, setclickedProfileUserId] = useState(0);
    const { userId } = props;

    let { height, width } = Dimensions.get('window');
    const { colors, dark } = useTheme();

    useEffect(() => {
        let eventListener = EventRegister.addEventListener(
            'clickedUser',
            (data) => {
                setclickedProfileUserId((clickedProfileUserId = data));
                //alert(data);
            }
        );
        let eventListener2 = EventRegister.addEventListener(
            'clickedUserFeed',
            (data) => {
                setclickedProfileUserId((clickedProfileUserId = data));
                //alert(data);
            }
        );
        return () => {
            EventRegister.removeEventListener('clickedUser');
            true;
        };
    }, [DATA]);

    useEffect(() => {
        if (refresh == 0) {
            getFeedPosts();
            setrefresh(1);
        }
    });

    async function getFeedPosts() {
        var value = await AsyncStorage.getItem('myuserid');

        if (clickedProfileUserId == 0) {
            const response = await baseApi.get(
                `https://memeapp-backend.herokuapp.com/api/posts/userpost/${value}/`
            );
            //console.log(response);
            setData(undefined);
            setData(response.data);
            //console.log(DATA);
        } else {
            const response = await baseApi.get(
                `https://memeapp-backend.herokuapp.com/api/posts/userpost/${clickedProfileUserId}/`
            );
            //console.log(response);
            setData(undefined);
            setData(response.data);
            //console.log(DATA);
        }
    }

    return (
        <View
            style={{
                backgroundColor: dark ? colors.primary : colors.primary,
                height: '100%',
            }}
        >
            <FlatList
                numColumns={3}
                style={{
                    alignSelf: 'flex-start',
                    zIndex: 1,
                    backgroundColor: dark ? colors.primary : colors.primary,
                }}
                data={DATA}
                keyExtractor={(item) => String(item)}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableWithoutFeedback
                            onPress={() => {
                                //console.log(index);
                                navigation.navigate('ListofPhotos', {
                                    postsdata: DATA,
                                    index: index,
                                });
                            }}
                        >
                            <Image
                                style={{
                                    width: width / 3 - 10,
                                    borderRadius: 5,
                                    height: width / 3 - 10,
                                    margin: 5,
                                    marginTop: 10,
                                }}
                                source={{
                                    uri: baseImageUrl.concat(item.image),
                                }}
                            />
                        </TouchableWithoutFeedback>
                    );
                }}
            />
        </View>
    );
};

export default Posts;
