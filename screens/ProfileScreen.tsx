import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    Text,
    Dimensions,
    Image,
    TouchableOpacity,
    Easing,
    StyleSheet,
    StatusBar,
    ScrollView,
} from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import ExploreScreen from './ExploreScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Posts from '../Components/Posts';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { Modalize } from 'react-native-modalize';
import Ripple from 'react-native-material-ripple';
import {
    Feather,
    FontAwesome,
    Ionicons,
    MaterialIcons,
} from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import baseApi from '../api/baseApi';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { baseImageUrl } from '../images/imageBaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FavouritePosts from '../Components/FavouritePosts';
import Svg, { SvgProps, Path, Circle, G } from 'react-native-svg';
import ActionButton from 'react-native-action-button';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createMaterialTopTabNavigator();

const ProfileScreen = ({ navigation, props }: any) => {
    const { colors, dark } = useTheme();

    const [bgImage, setBgImage] = useState(require('../assets/4685.jpg'));
    let [bio, setbio] = useState('Hey welcome to social media');
    let [firstname, setfirstname] = useState('FirstName');
    let [lastname, setlastname] = useState('');
    const [followers, setfollowers] = useState('0');
    const [following, setfollowing] = useState('0');
    let [username, setusername] = useState('');
    let [email, setEmail] = useState('');
    let [userimg, setuserimg] = useState(require('../assets/qqq.jpeg'));
    const [mypr, setmypr] = useState(true);
    const [followerslist, setfollowerslist] = useState();
    const [followinglist, setfollowinglist] = useState();

    const [refresh, setrefresh] = useState(0);
    let [refresh2, setrefresh2] = useState(0);
    let [refresh3, setrefresh3] = useState(0);

    const modalizeRef = useRef<Modalize>(null);
    var value = AsyncStorage.getItem('myuserid');

    const onOpen = () => {
        modalizeRef.current?.open();
    };

    let { height, width } = Dimensions.get('window');
    // console.log(height);
    // console.log(width);

    const [zstyle, setzStyle] = useState(1);

    useEffect(() => {
        setzStyle(2);
        userinfo();
    });

    const statusBarHeight = getStatusBarHeight();

    const menu = useRef(null);
    const hideMenu = () => menu.current.hide();
    const showMenu = () => menu.current.show();

    //const [userid,setuserid]=useState()

    async function userinfo() {
        var value = await AsyncStorage.getItem('myuserid');
        //var value = await SecureStore.getItemAsync('myuserid');

        //console.log(value)

        if (value != '') {
            const response = await axios.get(
                'https://memeapp-backend.herokuapp.com/api/accounts/user/'.concat(
                    value.toString(),
                    '/'
                )
            );
            //console.log(response.data);
            if (response) {
                // console.log(response)
                setusername((username = await response.data.user.username));
                setfirstname((firstname = await response.data.user.first_name));
                setlastname((lastname = await response.data.user.last_name));
                setbio((bio = await response.data.bio));
                setuserimg((userimg = await response.data.userimage));
                setEmail((email = await response.data.user.email));
            }
            {
                isitsme(value);
            }
            {
                getfollowers(value);
            }
            {
                getfollowings(value);
            }
        }
    }

    async function getfollowers(value: string) {
        if (refresh2 == 0) {
            const response = await axios.get(
                'https://memeapp-backend.herokuapp.com/api/accounts/followers/'.concat(
                    value.toString(),
                    '/'
                )
            );
            //console.log(response);
            setfollowers(response.data.length);
            setrefresh2((refresh2 = 1));
            setfollowerslist(response.data);
        }
    }

    async function getfollowings(value: string) {
        if (refresh3 == 0) {
            const response = await axios.get(
                'https://memeapp-backend.herokuapp.com/api/accounts/following/'.concat(
                    value.toString(),
                    '/'
                )
            );
            //console.log(response);
            setfollowing(response.data.length);
            setrefresh3((refresh3 = 1));
            setfollowinglist(response.data);
        }
    }

    function isitsme(value: string) {
        if (value) {
            setmypr(true);
        } else false;
    }

    return (
        <>
            <ScrollView
                style={{
                    height: height,
                    backgroundColor: dark ? colors.primary : '#f2f2f2',
                    overflow: 'scroll',
                }}
                bounces={false}
                showsVerticalScrollIndicator={false}
            >
                <StatusBar
                    barStyle={dark ? 'light-content' : 'dark-content'}
                    backgroundColor={dark ? '#000' : '#fff'}
                />
                <View>
                    <View style={[styles.z, { zIndex: zstyle, width: width }]}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'white',
                                padding: 10,
                                borderRadius: 100,
                                marginTop: 35,
                                marginHorizontal: 10,
                            }}
                        >
                            <MaterialIcons
                                name='insert-photo'
                                size={24}
                                color='black'
                            />
                        </TouchableOpacity>
                        <Menu
                            ref={menu}
                            button={
                                <TouchableOpacity
                                    onPress={showMenu}
                                    style={{
                                        backgroundColor: 'white',
                                        padding: 10,
                                        borderRadius: 100,
                                        marginTop: 35,
                                        marginHorizontal: 10,
                                    }}
                                >
                                    <MaterialIcons
                                        name='insert-photo'
                                        size={24}
                                        color='black'
                                    />
                                </TouchableOpacity>
                            }
                        >
                            <MenuItem
                                ellipsizeMode={'head'}
                                style={{}}
                                onPress={() => {
                                    navigation.navigate('SettingScreen');
                                    hideMenu();
                                }}
                            >
                                Settings
                            </MenuItem>
                            <MenuItem
                                onPress={() => {
                                    navigation.navigate('Statistics');
                                    hideMenu();
                                }}
                            >
                                Statistics
                            </MenuItem>
                            <MenuItem onPress={hideMenu}>
                                Recommendation
                            </MenuItem>

                            <MenuItem onPress={hideMenu}>Others</MenuItem>
                        </Menu>
                        {/* <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('SettingScreen');
                            }}
                            style={{
                                backgroundColor: 'white',
                                padding: 10,
                                borderRadius: 100,
                                marginTop: 35,
                                marginHorizontal: 10,
                            }}
                        >
                            <Ionicons name='settings' size={24} color='black' />
                        </TouchableOpacity> */}
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
                    {userimg ? (
                        <Image
                            style={{
                                borderRadius: 100,
                                height: 110,
                                width: 110,
                                marginTop: -50,
                                marginStart: 10,
                                // borderWidth: 4,
                                // borderColor: '#f2f2f2',
                            }}
                            source={{ uri: baseImageUrl.concat(userimg) }}
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
                            backgroundColor: dark ? colors.card : '#fff',
                            borderRadius: 20,
                            marginStart: 10,
                            marginTop: -50,
                            marginEnd: 10,
                            padding: 12,
                            shadowColor: 'grey',
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowRadius: 2,
                            shadowOpacity: 1.0,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 25,
                                    color: dark ? colors.text : '#000',
                                }}
                            >
                                {username}
                            </Text>
                            <Text
                                style={{ color: dark ? colors.text : '#000' }}
                            >
                                100🔥
                            </Text>
                        </View>
                        <View style={{ marginTop: -1, opacity: 0.5 }}>
                            <Text
                                style={{ color: dark ? colors.text : '#000' }}
                            >
                                {firstname} {lastname}
                            </Text>
                        </View>
                        <View style={{ marginTop: 13 }}>
                            <Text
                                numberOfLines={2}
                                style={{ color: dark ? colors.text : '#000' }}
                            >
                                {bio ? bio : 'Hey there welcome to Flairota '}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* <Ripple onPress={userinfo} style={{width:'85%',alignSelf:'center',alignContent:'center',backgroundColor:'#484ca5',borderRadius:15,height:45,marginTop:15}}>
                        <View  style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                            <Text style={{color:'#fff'}}>EDIT</Text>
                        </View>
                </Ripple> */}

                <Ripple
                    onPress={() => {
                        navigation.navigate('EditProfile');
                    }}
                    style={{
                        width: '85%',
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
                        <Text style={{ color: '#fff' }}>EDIT</Text>
                    </View>
                </Ripple>

                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}
                >
                    <Ripple
                        onPress={onOpen}
                        rippleColor='#ababab'
                        style={{
                            marginHorizontal: 7,
                            width: '30%',
                            alignSelf: 'center',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: 15,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                color: dark ? colors.text : '#000',
                            }}
                        >
                            Posts
                        </Text>
                        <Text
                            style={{
                                fontSize: 15,
                                marginTop: 4,
                                color: dark ? colors.text : '#000',
                            }}
                        >
                            69
                        </Text>
                    </Ripple>
                    <Ripple
                        onPress={() => {
                            navigation.navigate('Followers', {
                                followersdata: followerslist,
                            });
                        }}
                        rippleColor='#ababab'
                        style={{
                            marginHorizontal: 7,
                            width: '30%',
                            alignSelf: 'center',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: 15,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                color: dark ? colors.text : '#000',
                            }}
                        >
                            Followers
                        </Text>
                        <Text
                            style={{
                                fontSize: 15,
                                marginTop: 4,
                                color: dark ? colors.text : '#000',
                            }}
                        >
                            {followers}
                        </Text>
                    </Ripple>
                    <Ripple
                        onPress={() => {
                            navigation.navigate('Following', {
                                followingdata: followinglist,
                            });
                        }}
                        rippleColor='#ababab'
                        style={{
                            marginHorizontal: 7,
                            width: '30%',
                            alignSelf: 'center',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: 15,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                color: dark ? colors.text : '#000',
                            }}
                        >
                            Following
                        </Text>
                        <Text
                            style={{
                                fontSize: 15,
                                marginTop: 4,
                                color: dark ? colors.text : '#000',
                            }}
                        >
                            {following}
                        </Text>
                    </Ripple>
                </View>
                <View
                    style={{
                        backgroundColor: '#fff',
                        height: '100%',
                    }}
                >
                    <Tab.Navigator
                        tabBarOptions={{
                            contentContainerStyle: {
                                backgroundColor: dark
                                    ? colors.primary
                                    : colors.primary,
                            },
                            indicatorStyle: {},
                            indicatorContainerStyle: {},
                            activeTintColor: dark ? colors.text : colors.text,
                        }}
                        style={{}}
                    >
                        <Tab.Screen name='POST' component={Posts} />
                        <Tab.Screen
                            name='FAVOURITE'
                            component={FavouritePosts}
                        />
                    </Tab.Navigator>
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    z: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});

export default ProfileScreen;
