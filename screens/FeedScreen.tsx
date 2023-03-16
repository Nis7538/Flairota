import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    Image,
    TouchableOpacity,
    Text,
    SafeAreaView,
    BackHandler,
    Alert,
    RefreshControl,
    StatusBar,
    Animated,
    InteractionManager,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import FeedPost from '../Components/FeedPost';
import StoriesIcon from '../Components/StoriesIcon';
import Header from '../Components/Header';
import * as SecureStore from 'expo-secure-store';
import baseApi from '../api/baseApi';
import { baseImageUrl } from '../images/imageBaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import FeedScreenAds from '../Components/FeedScreenAds';
import {
    useFocusEffect,
    useRoute,
    useScrollToTop,
    useTheme,
} from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import LottieView from 'lottie-react-native';
import { EventRegister } from 'react-native-event-listeners';

const wait = (timeout: any) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

const FeedScreen = (props: any, navigation: any) => {
    const { colors, dark } = useTheme();
    const [resp, setresp] = useState();
    let [stories, setStories] = useState();
    let [userId, setUserId] = useState();
    const [ref, setref] = useState(0);

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setStories(undefined);
        setref(0);
        setUserId(undefined);
        setRefreshing(true);
        getFeedPosts();
        getStories();
        getUserId();
        setTimeout(() => {
            setref(1);
        }, 1500);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        //console.log(moment.duration());
        getFeedPosts();
        getStories();
        getUserId();
    }, [userId]);

    async function getStories() {
        var value = await AsyncStorage.getItem('mysuperkey');
        await baseApi
            .post('/posts/getsotries/', {
                token: value.split('"')[1],
            })
            .then(function (response) {
                setStories((stories = response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    async function getUserId() {
        setUserId((userId = await AsyncStorage.getItem('myuserid')));
    }

    async function getFeedPosts() {
        var value = await AsyncStorage.getItem('mysuperkey');
        const response = await baseApi.post('/posts/followings_post/', {
            token: value?.split('"')[1],
        });
        setresp(response.data);
        //console.log(response);
        setTimeout(() => {
            setref(1);
        }, 1000);
    }

    const getdata = async () => {
        try {
            const value = await AsyncStorage.getItem('mysuperkey');
            //var value = await SecureStore.getItemAsync('myuserid');
            console.log(value + ' this is stored token');
        } catch (e) {}
    };

    const [offsetY, setOffsetY] = useState(0);
    const ccc = useRef(new Animated.Value(0)).current;

    function onScrollY(event) {
        const { nativeEvent } = event;
        const { contentOffset } = nativeEvent;
        let { y } = contentOffset;
        setOffsetY(y);
        ccc.setValue(y);
    }

    return (
        <SafeAreaView
            style={{
                backgroundColor: dark ? colors.background : colors.greytone,
                flex: 1,
            }}
        >
            <StatusBar
                barStyle={dark ? 'light-content' : 'dark-content'}
                backgroundColor={dark ? '#000' : '#fff'}
            />
            <Header
                HeaderName='MemerApp'
                style={{ marginTop: 0 }}
                navigation={props.navigation}
                screen='Notifications'
            />

            <ScrollView
                style={{
                    backgroundColor: dark ? colors.background : colors.greytone,
                }}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View
                    style={[
                        styles.storySection,
                        {
                            backgroundColor: dark
                                ? colors.background
                                : colors.greytone,
                        },
                    ]}
                >
                    {/* {getdata()} */}
                    <SafeAreaView style={{ flex: 1, flexDirection: 'row' }}>
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            contentContainerStyle={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: dark
                                    ? colors.background
                                    : colors.greytone,
                            }}
                            style={{
                                marginVertical: 5,
                                marginHorizontal: 7,
                                width: '95%',
                                backgroundColor: dark
                                    ? '#212121'
                                    : colors.greytone,
                                alignSelf: 'center',
                                flexDirection: 'row',
                                borderRadius: 20,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    props.navigation.navigate('Help');
                                }}
                                style={{
                                    alignItems: 'center',
                                    marginHorizontal: 5,

                                    elevation: 5,
                                    backgroundColor: 'white',
                                    width: 75,
                                    justifyContent: 'center',
                                    borderRadius: 10,
                                    marginBottom: 2,
                                    height: 110,
                                    borderWidth: 1,
                                    borderColor: '#CBCBFF',
                                    display: 'flex',
                                }}
                            >
                                <Image
                                    style={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: 10,
                                    }}
                                    source={require('../assets/image/relief.jpg')}
                                    resizeMode='stretch'
                                />
                                <Text
                                    style={{
                                        color: 'white',
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        lineHeight: 80,
                                    }}
                                >
                                    Covid{'\n'}Relief
                                </Text>
                            </TouchableOpacity>
                            <StoriesIcon userId={userId} />
                            <FlatList
                                horizontal
                                data={stories}
                                keyExtractor={(item) => String(item)}
                                renderItem={({ item, index }) => {
                                    return (
                                        <StoriesIcon
                                            indexx={index}
                                            userId={item.user.user.id}
                                        />
                                    );
                                }}
                            />
                        </ScrollView>
                    </SafeAreaView>
                </View>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: dark ? colors.background : '#ebebeb',
                        //background greyish type is ebebeb
                    }}
                >
                    {ref == 1 ? (
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={resp}
                            keyExtractor={(item) => item.id.toString()}
                            initialScrollIndex={0}
                            initialNumToRender={5}
                            renderItem={({ item, index }) => {
                                //console.log(i);

                                if (index % 3 == 0 && index != 0) {
                                    //console.log('Hiya');
                                    return (
                                        <View>
                                            {/* <FeedScreenAds /> */}
                                            <FeedPost
                                                navigation={props.navigation}
                                                caption={item.caption}
                                                image={baseImageUrl.concat(
                                                    item.image
                                                )}
                                                username={
                                                    item.user.user.username
                                                }
                                                date={item.date}
                                                profileimage={baseImageUrl.concat(
                                                    item.user.userimage
                                                )}
                                                firstname={
                                                    item.user.user.first_name
                                                }
                                                lastname={
                                                    item.user.user.last_name
                                                }
                                                id={item.id}
                                                userId={item.user.user.id}
                                                getFeedPosts={getFeedPosts}
                                            />
                                        </View>
                                    );
                                }
                                return (
                                    <FeedPost
                                        navigation={props.navigation}
                                        caption={item.caption}
                                        image={baseImageUrl.concat(item.image)}
                                        username={item.user.user.username}
                                        date={item.date}
                                        profileimage={baseImageUrl.concat(
                                            item.user.userimage
                                        )}
                                        firstname={item.user.user.first_name}
                                        lastname={item.user.user.last_name}
                                        id={item.id}
                                        userId={item.user.user.id}
                                        getFeedPosts={getFeedPosts}
                                    />
                                );
                            }}
                        />
                    ) : (
                        <View
                            style={{
                                height: '100%',
                                width: '100%',
                                display: 'flex',
                                flex: 1,
                                alignContent: 'center',
                                justifyContent: 'center',
                                alignSelf: 'center',
                            }}
                        >
                            {dark ? (
                                <View>
                                    <LottieView
                                        style={{
                                            flex: 1,
                                            alignSelf: 'center',
                                            height: 400,
                                            width: 400,
                                        }}
                                        autoPlay
                                        loop
                                        source={require('../assets/waitdark.json')}
                                    />
                                </View>
                            ) : (
                                <View>
                                    <LottieView
                                        style={{
                                            flex: 1,
                                            alignSelf: 'center',
                                            height: 400,
                                            width: 400,
                                        }}
                                        autoPlay
                                        loop
                                        source={require('../assets/wait.json')}
                                    />
                                </View>
                            )}
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    storySection: {
        width: '100%',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 50,
        height: 50,
        borderRadius: 350,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    splitter: {
        height: '80%',
        width: 1,
        alignSelf: 'center',
        backgroundColor: 'white',
        opacity: 0.5,
    },
});

export default FeedScreen;
