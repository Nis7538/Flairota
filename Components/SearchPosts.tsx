import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';
import baseApi from '../api/baseApi';
import { useDataLayerValue } from '../context-api/DataLayer';
import TrendingPostComponent from './TrendingPostComponent';
import { useNavigation, useTheme } from '@react-navigation/native';
import { baseImageUrl } from '../images/imageBaseUrl';
import LottieView from 'lottie-react-native';

const SearchPosts = () => {
    const { colors, dark } = useTheme();
    let [postsresponse, setpostsresponse] = useState();
    const [ref, setref] = useState(0);
    const [{ searchedtext }] = useDataLayerValue();

    const navigation = useNavigation();

    useEffect(() => {
        getPosts();
    }, [searchedtext]);

    async function getPosts() {
        //console.log(searchedtext);
        if (searchedtext !== '') {
            await baseApi
                .post('posts/search/', {
                    keyword: searchedtext,
                    type: 'post',
                })
                .then(function (response) {
                    setpostsresponse((postsresponse = response.data));
                    // console.log(postsresponse);
                    setref(1);
                })
                .catch(function (error) {
                    alert(error);
                });
        } else if (searchedtext === '') {
            setref(0);
        }
    }

    if (ref == 0) {
        return (
            <View
                style={{
                    display: 'flex',
                    height: 250,
                    flex: 1,
                    marginTop: -50,
                    width: 250,
                    alignSelf: 'center',
                    justifyContent: 'center',
                }}
            >
                <LottieView
                    autoPlay
                    loop
                    source={require('../assets/search.json')}
                />
            </View>
        );
    } else {
        return (
            <ScrollView
                style={{
                    width: '100%',
                    backgroundColor: dark ? colors.primary : colors.background,
                }}
                contentContainerStyle={{}}
            >
                <View
                    style={{
                        display: 'flex',
                        paddingHorizontal: 8,
                        flex: 1,
                    }}
                >
                    <FlatList
                        columnWrapperStyle={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignContent: 'center',
                        }}
                        showsVerticalScrollIndicator={false}
                        numColumns={3}
                        data={postsresponse}
                        contentContainerStyle={{}}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => {
                            return (
                                <TrendingPostComponent
                                    navigation={navigation}
                                    imagepost={baseImageUrl.concat(item.image)}
                                    username={item.user.user.username}
                                    firstname={item.user.user.first_name}
                                    lastname={item.user.user.last_name}
                                    caption={item.caption}
                                    userimage={baseImageUrl.concat(
                                        item.user.userimage
                                    )}
                                    userid={item.user.user.id}
                                />
                            );
                        }}
                    />
                </View>
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({});

export default SearchPosts;
