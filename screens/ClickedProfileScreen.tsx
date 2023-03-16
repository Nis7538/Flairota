import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    Text,
    Dimensions,
    Image,
    TouchableOpacity,
    Easing,
    StyleSheet,
    InteractionManager,
} from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import ExploreScreen from './ExploreScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Posts from '../Components/Posts';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Modalize } from 'react-native-modalize';
import Ripple from 'react-native-material-ripple';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import baseApi from '../api/baseApi';
import { baseImageUrl } from '../images/imageBaseUrl';
import * as SecureStore from 'expo-secure-store';
import Svg, { Path } from 'react-native-svg';
import { EventRegister } from 'react-native-event-listeners';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation, useTheme } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

const ClickedProfileScreen = (props: any) => {
    let [userId, setUserId] = useState(0);
    const [username, setusername] = useState('');
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [userimage, setuserimage] = useState('');
    const [bio, setbio] = useState('');
    let [followers, setfollowers] = useState('0');
    let [following, setfollowing] = useState('0');
    let [statusC, setStatusC] = useState('');
    const [refresh, setrefresh] = useState(0);
    let [refresh2, setrefresh2] = useState(0);
    const [refresh3, setrefresh3] = useState(0);
    const [bgImage, setBgImage] = useState(require('../assets/4685.jpg'));
    const [clickedProfileUserId, setclickedProfileUserId] = useState(0);
    const [followerslist, setfollowerslist] = useState();
    const [followinglist, setfollowinglist] = useState();

    const modalizeRef = useRef<Modalize>(null);
    const navigation = useNavigation();
    const { colors, dark } = useTheme();

    const onOpen = () => {
        modalizeRef.current?.open();
    };

    let { height, width } = Dimensions.get('window');

    const [zstyle, setzStyle] = useState(1);

    useEffect(() => {
        setzStyle(2);
    });

    const menu = useRef(null);
    const hideMenu = () => menu.current.hide();
    const showMenu = () => menu.current.show();

    useEffect(() => {
        getProfileData();
    }, [refresh, refresh2]);

    async function getProfileData() {
        const { userid } = props.route.params;
        //var value = await SecureStore.getItemAsync('myuserid');

        setUserId((userId = userid));

        //alert(status);
        if (refresh == 0) {
            await baseApi
                .get(
                    'https://memeapp-backend.herokuapp.com/api/accounts/user/'.concat(
                        userid,
                        '/'
                    )
                )
                .then(function (response) {
                    // console.log(response);
                    // console.log(JSON.stringify(response.data));
                    setrefresh(1);
                    setusername(response.data.user.username);
                    setlastname(response.data.user.first_name);
                    setfirstname(response.data.user.last_name);
                    setbio(response.data.bio);
                    setuserimage(response.data.userimage);
                })
                .catch(function (error) {
                    alert(error.message);
                });
        }
        followed_or_not();
        getfollowers();
        getfollowings();
    }

    async function followunfollow() {
        var value = await AsyncStorage.getItem('mysuperkey');
        //var value = await SecureStore.getItemAsync('myuserid');
        const { userid } = props.route.params;
        await baseApi
            .post(
                'https://memeapp-backend.herokuapp.com/api/accounts/follow_unfollow/'.concat(
                    userid,
                    '/'
                ),
                {
                    token: value?.split('"')[1],
                }
            )
            .then(function (response) {
                //console.log(response);
                setStatusC(statusC == 'Follow' ? 'Following' : 'Follow');
            })
            .catch(function (error) {
                alert(error);
            });
    }

    async function getfollowers() {
        if (refresh2 == 0) {
            const { userid } = props.route.params;
            const response = await baseApi.get(
                'https://memeapp-backend.herokuapp.com/api/accounts/followers/'.concat(
                    userid.toString(),
                    '/'
                )
            );
            setfollowers((followers = response.data.length));
            setrefresh2(1);
            // console.log(followers);
            setfollowerslist(response.data);
        }
    }

    async function getfollowings() {
        if (refresh3 == 0) {
            const { userid } = props.route.params;
            const response = await baseApi.get(
                'https://memeapp-backend.herokuapp.com/api/accounts/following/'.concat(
                    userid.toString(),
                    '/'
                )
            );
            setfollowing((following = response.data.length));
            setrefresh2((refresh2 = 1));
            setrefresh3(1);
            setfollowinglist(response.data);

            // console.log(following);
        }
    }

    async function followed_or_not() {
        var value = await AsyncStorage.getItem('myuserid');

        if (value != null && value != undefined) {
            await baseApi
                .get(`accounts/isfollowing/${value}/${userId}/`)
                .then(function (response) {
                    // console.log(response);
                    //alert('got it');
                    if (response.data.following === true) {
                        setStatusC((statusC = 'Following'));
                        //alert(status);
                    } else {
                        setStatusC((statusC = 'Follow'));
                    }
                })

                .catch(function (error) {
                    alert(error);
                });
        }
    }
    return (
        <>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ height: height }}
            >
                <View>
                    <View style={[styles.z, { zIndex: zstyle, right: 10 }]}>
                        <Menu
                            ref={menu}
                            button={
                                <TouchableOpacity
                                    onPress={showMenu}
                                    style={{
                                        elevation: 10,
                                        backgroundColor: 'white',
                                        padding: 7,
                                        marginTop: 35,
                                        marginHorizontal: 10,
                                        borderRadius: 100,
                                    }}
                                >
                                    <SimpleLineIcons
                                        name='options-vertical'
                                        size={24}
                                        color='black'
                                    />
                                </TouchableOpacity>
                            }
                        >
                            <MenuItem onPress={hideMenu}>1.Settings</MenuItem>
                            <MenuItem onPress={hideMenu}>2.</MenuItem>
                            <MenuItem onPress={hideMenu}>1.Hello</MenuItem>
                            <MenuItem onPress={hideMenu}>1.Hello</MenuItem>
                            <MenuItem onPress={hideMenu}>1.Hello</MenuItem>
                        </Menu>
                    </View>
                    <Image
                        style={{
                            height: 0.4 * height,
                            width: '100%',
                            zIndex: -1,
                            borderBottomRightRadius: 250,
                            position: 'relative',
                        }}
                        source={bgImage}
                    />
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        width: '100%',
                        alignItems: 'center',
                        padding: 5,
                    }}
                >
                    {userimage ? (
                        <Image
                            style={{
                                borderRadius: 100,
                                height: 110,
                                width: 110,
                                marginTop: -50,
                                marginStart: 10,
                            }}
                            source={{ uri: baseImageUrl.concat(userimage) }}
                        />
                    ) : (
                        <TouchableOpacity
                            style={{
                                borderRadius: 100,
                                height: 110,
                                width: 110,
                                marginTop: -50,
                                marginStart: 10,
                                backgroundColor: 'white',
                                borderWidth: 4,
                                borderColor: '#f2f2f2',
                            }}
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
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: '#fff',
                            borderRadius: 20,
                            marginStart: 15,
                            marginTop: -50,
                            marginEnd: 15,
                            padding: 12,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ fontSize: 23 }}>{username}</Text>
                            <Text style={{}}>100🔥</Text>
                        </View>
                        <View style={{ marginTop: -1, opacity: 0.5 }}>
                            <Text>
                                {firstname ? firstname : 'first'}{' '}
                                {lastname ? lastname : 'last'}
                            </Text>
                        </View>
                        <View style={{ marginTop: 13 }}>
                            <Text numberOfLines={2} style={{}}>
                                {bio
                                    ? bio
                                    : 'Hello my name is Kshitij and I also make accounts as a result I am CHAMDI'}
                            </Text>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                    }}
                >
                    <Ripple
                        rippleContainerBorderRadius={30}
                        onPress={followunfollow}
                        style={{
                            width: '45%',
                            alignSelf: 'center',
                            alignContent: 'center',
                            backgroundColor:
                                statusC == 'Follow' ? '#484ca5' : '#ececec',
                            borderRadius: 30,
                            height: 45,
                            marginTop: 15,
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {statusC == 'Following' ? (
                                <Text style={{ color: '#000' }}>Following</Text>
                            ) : (
                                <Text style={{ color: '#fff' }}>Follow</Text>
                            )}
                        </View>
                    </Ripple>
                    <Ripple
                        rippleContainerBorderRadius={30}
                        onPress={onOpen}
                        style={{
                            width: '45%',
                            alignSelf: 'center',
                            alignContent: 'center',
                            backgroundColor: '#484ca5',
                            borderRadius: 15,
                            height: 45,
                            marginTop: 15,
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Text style={{ color: '#fff' }}>Message</Text>
                        </View>
                    </Ripple>
                </View>
                <View
                    style={{
                        display: 'flex',
                        // justifyContent: 'space-around',
                        // alignItems: 'center',
                        flexDirection: 'row',
                        marginTop: 15,
                        marginBottom: 15,
                    }}
                >
                    <View
                        style={{
                            width: '33.33%',
                            alignSelf: 'center',
                            flexDirection: 'column',
                            alignItems: 'center',
                            //backgroundColor: 'green',
                        }}
                    >
                        <Text style={{ fontSize: 18 }}>Posts</Text>
                        <Text style={{ fontSize: 15, marginTop: 4 }}>69</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Followers', {
                                followersdata: followerslist,
                            });
                        }}
                        style={{
                            width: '33.33%',
                            alignSelf: 'center',
                            flexDirection: 'column',
                            alignItems: 'center',
                            //backgroundColor: 'red',
                        }}
                    >
                        <Text style={{ fontSize: 18 }}>Followers</Text>
                        <Text style={{ fontSize: 15, marginTop: 4 }}>
                            {followers}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Following', {
                                followingdata: followinglist,
                            });
                        }}
                        style={{
                            width: '33.33%',
                            //backgroundColor: 'blue',
                            alignSelf: 'center',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ fontSize: 18 }}>Following</Text>
                        <Text style={{ fontSize: 15, marginTop: 4 }}>
                            {following}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        backgroundColor: '#000',
                        minHeight: 300,
                    }}
                >
                    <View
                        style={{
                            height: 45,
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'black',
                        }}
                    >
                        <Text style={{ textAlign: 'center', color: 'white' }}>
                            Posts
                        </Text>
                        {EventRegister.emit('clickedUser', userId)}
                    </View>
                    <Posts userI={userId} />
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    z: {
        position: 'absolute',
    },
});

export default ClickedProfileScreen;

{
    /* <Modalize
                    ref={modalizeRef}
                    overlayStyle={{}}
                    childrenStyle={{ backgroundColor: '#000' }}
                    snapPoint={250}
                    alwaysOpen={height * 0.58 - 210}
                    modalHeight={height - 70}
                    handleStyle={{ backgroundColor: 'red', width: 80 }}
                    scrollViewProps={{
                        showsVerticalScrollIndicator: false,
                        alwaysBounceHorizontal: true,
                    }}
                    velocity={20}
                >
                    <View style={{}}>
                       
                        <View
                            style={{
                                height: 45,
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'black',
                            }}
                        >
                            <Text
                                style={{ textAlign: 'center', color: 'white' }}
                            >
                                Posts
                            </Text>
                        </View>
                        <Posts userId={userId} />
                    </View>
                </Modalize> */
}
