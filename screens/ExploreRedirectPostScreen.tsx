import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
} from 'react-native';
import LottieView from 'lottie-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import baseApi from '../api/baseApi';
import ExploreRedirectPostComponent from '../Components/ExploreRedirectPostComponent';
import { baseImageUrl } from '../images/imageBaseUrl';

const ExploreRedirectPostScreen = (props: any) => {
    const navigation = useNavigation();
    const { colors, dark } = useTheme();
    const [refresh, setRefresh] = useState(0);

    let [resp, setResp] = useState();

    useEffect(() => {
        getExplorePosts();
    }, [refresh]);

    async function getExplorePosts() {
        if (refresh == 0) {
            await baseApi
                .get(`/posts/${props.route.params.id}`)
                .then(function (response) {
                    setResp((resp = response.data));
                    setRefresh(1);
                    console.log(resp);
                });
        }
    }

    return (
        <View
            style={{
                backgroundColor: dark ? colors.background : '#ebebeb',
                width: '100%',
                height: '100%',
                flex: 1,
            }}
        >
            <StatusBar
                barStyle={dark ? 'light-content' : 'dark-content'}
                backgroundColor={dark ? '#000' : '#fff'}
            />
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.back}
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Ionicons name='chevron-back' size={24} color='black' />
                </TouchableOpacity>
                <Text style={styles.headerName}>
                    {props.route.params.title}
                </Text>
            </View>
            {resp != undefined ? (
                <ExploreRedirectPostComponent
                    imagepost={baseImageUrl.concat(resp.image)}
                    username={resp.user.user.username}
                    firstname={resp.user.user.first_name}
                    lastname={resp.user.user.last_name}
                    caption={resp.caption}
                    userimage={baseImageUrl.concat(resp.user.userimage)}
                    userid={resp.user.user.id}
                    id={resp.id}
                    date={resp.date}
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
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    headerName: {
        textAlign: 'center',
        fontSize: 20,
        color: 'black',
        alignSelf: 'center',
        justifyContent: 'center',
        width: '58%',
        fontWeight: 'bold',
    },
    back: {
        justifyContent: 'flex-start',
        width: '20%',
        alignSelf: 'center',
        marginStart: 10,
    },
});

export default ExploreRedirectPostScreen;
