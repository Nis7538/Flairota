import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';
import baseApi from '../api/baseApi';
import { baseImageUrl } from '../images/imageBaseUrl';

const FollowerListComponent = (props: any) => {
    const { colors, dark } = useTheme();
    const navigation = useNavigation();
    // function nameSender() {
    //     const headerName = props.item.name;
    //     props.navigation.navigate('ChatMessage', { headerName: headerName } );
    // }

    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [userImage, setUserImage] = useState('');
    const [followId, setFollowId] = useState();
    const [statusText, setStatus] = useState('Follow');
    let [myUserId, setMyUserId] = useState(0);

    useEffect(() => {
        getProfileData();
    });

    async function getProfileData() {
        var value = await AsyncStorage.getItem('myuserid');
        setMyUserId((myUserId = value));
        //console.log(myUserId);
        followed_or_not();
        await baseApi
            .get('accounts/user/'.concat(props.id.toString(), '/'))
            .then(function (response) {
                setFirstname(response.data.user.first_name);
                setLastname(response.data.user.last_name);
                setUsername(response.data.user.username);
                setUserImage(response.data.userimage);
                setFollowId(response.data.id);
                //console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    async function followed_or_not() {
        var value = await AsyncStorage.getItem('myuserid');
        //console.log('I am In');

        // console.log(value);
        // console.log(props.id);
        if (value != null && value != undefined) {
            await baseApi
                .get(`accounts/isfollowing/${value}/${props.id}/`)
                .then(function (response) {
                    // console.log(response.data);
                    if (response.data.following === true) {
                        setStatus('Following');
                    } else {
                        setStatus('Follow');
                    }
                })

                .catch(function (error) {
                    alert(error.message);
                });
        }
    }

    async function followunfollow() {
        var value = await AsyncStorage.getItem('mysuperkey');

        await baseApi
            .post('accounts/follow_unfollow/'.concat(followId, '/'), {
                token: value?.split('"')[1],
            })
            .then(function (response) {
                console.log(response.data);
                followed_or_not();
            })
            .catch(function (error) {
                alert(error);
            });
    }

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: dark ? colors.primary : colors.background,
                },
            ]}
        >
            <View
                style={[
                    styles.rowContainer,
                    {
                        backgroundColor: dark
                            ? colors.primary
                            : colors.background,
                    },
                ]}
            >
                <TouchableWithoutFeedback
                    style={{ display: 'flex', flexDirection: 'row' }}
                    onPress={() => {
                        //console.log(props.userid);
                        if (props.id == myUserId) {
                            navigation.navigate('Profile');
                        } else {
                            navigation.navigate('ClickedProfile', {
                                userid: props.id,
                            });
                        }
                    }}
                >
                    <View>
                        {userImage ? (
                            <Image
                                style={styles.icon}
                                resizeMode={'stretch'}
                                source={{ uri: baseImageUrl.concat(userImage) }}
                            />
                        ) : (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={styles.icon}
                            >
                                <Svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 24 24'
                                    {...props}
                                >
                                    <Path
                                        d='M12 0a12 12 0 1012 12A12 12 0 0012 0zm0 5a3.5 3.5 0 11-3.5 3.5A3.5 3.5 0 0112 5zm7 12.56A1.43 1.43 0 0117.57 19H6.43A1.43 1.43 0 015 17.56v-.46a3 3 0 011.63-2.67A12 12 0 0112 13a12 12 0 015.37 1.43A3 3 0 0119 17.1z'
                                        fill='#57595e'
                                        data-name='User Smal Circle'
                                    />
                                </Svg>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={styles.userName}>
                        <Text
                            style={{
                                fontSize: 17,
                                fontWeight: 'bold',
                                color: dark ? colors.text : colors.text,
                            }}
                        >
                            {username}
                        </Text>
                        <Text
                            style={{
                                fontSize: 11,
                                marginTop: 2,
                                color: dark ? colors.text : colors.text,
                            }}
                        >
                            {firstname} {lastname}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
                {myUserId != props.id ? (
                    <View style={styles.info}>
                        <TouchableOpacity
                            onPress={followunfollow}
                            style={
                                statusText === 'Follow'
                                    ? styles.status1
                                    : styles.status2
                            }
                        >
                            <Text style={{ color: 'white' }}>{statusText}</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <></>
                )}
            </View>
            <View style={styles.splitter}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'white',
    },
    rowContainer: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingVertical: 7,
        paddingHorizontal: 5,
    },
    icon: {
        width: 60,
        height: 60,
        borderRadius: 200,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    splitter: {
        width: '90%',
        height: 1,
        alignSelf: 'center',
        backgroundColor: 'black',
        opacity: 0.2,
    },
    userName: {
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    info: {
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 10,
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 200,
        backgroundColor: 'rgb(168, 194, 211)',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4,
    },
    status1: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 20,
        width: 85,
        alignItems: 'center',
    },
    status2: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 20,
        width: 85,
        alignItems: 'center',
    },
});

export default FollowerListComponent;
