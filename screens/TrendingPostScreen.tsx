import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    FlatList,
} from 'react-native';
import { set } from 'react-native-reanimated';
import baseApi from '../api/baseApi';
import TrendingPostComponent from '../Components/TrendingPostComponent';
import { baseImageUrl } from '../images/imageBaseUrl';

const TrendingPostScreen = (props: any) => {
    const { colors, dark } = useTheme();
    const [explorePosts, setExplorePosts] = useState();
    const [refresh, setrefresh] = useState(0);

    useEffect(() => {
        getTrendingPosts();
    }, [refresh]);

    async function getTrendingPosts() {
        if (refresh == 0) {
            await baseApi
                .get(
                    'https://memeapp-backend.herokuapp.com/api/posts/trending/'
                )
                .then(function (res) {
                    setExplorePosts(res.data);
                    setrefresh(1);
                })
                .catch(function (error) {
                    console.error(error);
                });
        }
    }

    return (
        <ScrollView
            style={{
                width: '100%',
                backgroundColor: dark ? colors.primary : colors.background,
            }}
        >
            <View
                style={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'space-around',
                }}
            >
                <FlatList
                    columnWrapperStyle={{
                        flex: 1,
                        justifyContent: 'space-around',
                    }}
                    showsVerticalScrollIndicator={false}
                    numColumns={3}
                    data={explorePosts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                        return (
                            <TrendingPostComponent
                                navigation={props.navigation}
                                imagepost={baseImageUrl.concat(item.image)}
                                username={item.user.user.username}
                                firstname={item.user.user.first_name}
                                lastname={item.user.user.last_name}
                                caption={item.caption}
                                userimage={baseImageUrl.concat(
                                    item.user.userimage
                                )}
                                userid={item.user.user.id}
                                id={item.id}
                            />
                        );
                    }}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({});

export default TrendingPostScreen;
