import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import {
    FlatList,
    TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

import baseApi from '../api/baseApi';
import { baseImageUrl } from '../images/imageBaseUrl';
import ExploreScreen from '../screens/ExploreScreen';

const FavouritePosts = ({ navigation }: any) => {
    const { colors, dark } = useTheme();
    let [DATA, setData] = useState();
    const [refresh, setrefresh] = useState(0);

    let { height, width } = Dimensions.get('window');

    useEffect(() => {
        if (refresh == 0) {
            getFeedPosts();
            setrefresh(1);
        }
    });

    async function getFeedPosts() {
        var value = await AsyncStorage.getItem('mysuperkey');
        await baseApi
            .post('posts/savedpost/', {
                token: value?.split('"')[1],
            })
            .then(function (response) {
                //console.log(response);
                setData((DATA = response.data));
            })
            .catch(function (error) {
                console.log('Error', error);
            });
        //console.log(DATA);
    }

    return (
        <View
            style={{
                backgroundColor: dark ? colors.primary : colors.primary,
                height: '100%',
                display: 'flex',
                flex: 1,
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
                                console.log(index);
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

export default FavouritePosts;
