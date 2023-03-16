import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { DataLayer } from './context-api/DataLayer';
import reducer, { initialState } from './context-api/reducer';
import 'react-native-gesture-handler';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    Button,
    Animated,
    Dimensions,
    Image,
} from 'react-native';
import {
    NavigationContainer,
    StackActions,
    DefaultTheme,
    useTheme,
} from '@react-navigation/native';
import { useNavigation, DarkTheme } from '@react-navigation/native';

import {
    CardStyleInterpolators,
    createStackNavigator,
} from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import MainScreen from './screens/MainScreen';
import FeedScreen from './screens/FeedScreen';
import ChatScreen from './screens/ChatScreen';
import ChatListScreen from './screens/ChatListScreen';
import ExploreScreen from './screens/ExploreScreen';
import ProfileScreen from './screens/ProfileScreen';
import Camera from './screens/Camera';
import ClickedProfileScreen from './screens/ClickedProfileScreen';
import FollowersListScreen from './screens/FollowersListScreen';
import FollowingListScreen from './screens/FollowingListScreen';
import ViewAllCommentsScreen from './screens/ViewAllCommentsScreen';
import * as SecureStore from 'expo-secure-store';
import baseApi from './api/baseApi';

import Header from './Components/Header';
import TrendingPostScreen from './screens/TrendingPostScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListofPhotos from './Components/ListofPhotos';
import Posts from './Components/Posts';
import FavouritePosts from './Components/FavouritePosts';
import EditProfileScreen from './screens/EditProfileScreen';
import PostEditScreen from './screens/PostEditScreen';
import FeedPost from './Components/FeedPost';
import SwitchFleetScreen from './screens/SwitchFleetScreen';
import SwitchFleetScreenNew from './screens/SwitchFleetScreenNew';

import 'intl';
import { Platform } from 'react-native';

if (Platform.OS === 'android') {
    // See https://github.com/expo/expo/issues/6536 for this issue.
    if (typeof (Intl as any).__disableRegExpRestore === 'function') {
        (Intl as any).__disableRegExpRestore();
    }
}
import 'intl/locale-data/jsonp/en';
import FleetScreen from './screens/FleetScreen';
import SearchScreen from './screens/SearchScreen';
import SettingScreen from './screens/SettingScreen';
import { EventRegister } from 'react-native-event-listeners';
import RedirectTo from './Components/RedirectTo';
import LikedPostScreen from './screens/LikedPostScreen';
import NotificationScreen from './screens/NotificationScreen';
import Shimmer from './Components/Shimmer';
import ForgotPasswordScreen from './Components/ForgotPasswordScreen';
import StatisticScreen from './screens/StatisticScreen';
import HelpScreen from './screens/HelpScreen';
import CovidRelief0 from './Components/CovidRelief0';
import CovidRelief1 from './Components/CovidRelief1';
import CovidRelief2 from './Components/CovidRelief2';
import ExploreRedirectPostScreen from './screens/ExploreRedirectPostScreen';
import ExploreRedirectPostComponent from './Components/ExploreRedirectPostComponent';

const SplashScreen = () => {
    const navigation = useNavigation();
    const { colors, dark } = useTheme();
    const [direct, setDirect] = useState(0);

    useEffect(() => {
        directlogin();
    });

    async function directlogin() {
        var value = await AsyncStorage.getItem('myuserid');
        //var value = await SecureStore.getItemAsync('myuserid');
        if (
            value != '0' &&
            value != null &&
            value != undefined &&
            value != ''
        ) {
            navigation.navigate('Main');
            setDirect(1);
        } else if (direct != 1) {
            setDirect(2);
        }
    }

    const { width, height } = Dimensions.get('screen');

    const bgs = ['#A5BBFF', '#DDBEFE', '#FF63ED', '#B98EFF'];
    const DATA = [
        {
            key: '3571572',
            title: 'Multi-lateral intermediate moratorium',
            description:
                "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
            image: 'https://image.flaticon.com/icons/png/256/3571/3571572.png',
        },
        {
            key: '3571747',
            title: 'Automated radical data-warehouse',
            description:
                'Use the optical SAS system, then you can navigate the auxiliary alarm!',
            image: 'https://image.flaticon.com/icons/png/256/3571/3571747.png',
        },
        {
            key: '3571680',
            title: 'Inverse attitude-oriented system engine',
            description:
                'The ADP array is down, compress the online sensor so we can input the HTTP panel!',
            image: 'https://image.flaticon.com/icons/png/256/3571/3571680.png',
        },
        {
            key: '3571603',
            title: 'Monitored global data-warehouse',
            description: 'We need to program the open-source IB interface!',
            image: 'https://image.flaticon.com/icons/png/256/3571/3571603.png',
        },
    ];
    const scrollX = React.useRef(new Animated.Value(0)).current;

    const Indicator = ({ scrollX }: any) => {
        return (
            <View
                style={{
                    position: 'absolute',
                    bottom: '15%',
                    flexDirection: 'row',
                }}
            >
                {DATA.map((_, i) => {
                    const scale = scrollX.interpolate({
                        inputRange: [
                            (i - 1) * width,
                            i * width,
                            (i + 1) * width,
                        ],
                        outputRange: [0.8, 1.4, 0.8],
                        extrapolate: 'clamp',
                    });
                    const opacity = scrollX.interpolate({
                        inputRange: [
                            (i - 1) * width,
                            i * width,
                            (i + 1) * width,
                        ],
                        outputRange: [0.6, 0.9, 0.6],
                        extrapolate: 'clamp',
                    });

                    return (
                        <Animated.View
                            key={`indicator-${i}`}
                            style={{
                                height: 10,
                                width: 10,
                                borderRadius: 5,
                                backgroundColor: '#333',
                                margin: 10,
                                opacity,
                                transform: [
                                    {
                                        scale,
                                    },
                                ],
                            }}
                        ></Animated.View>
                    );
                })}
            </View>
        );
    };

    const Backdrop = ({ scrollX }: any) => {
        const backgroundColor = scrollX.interpolate({
            inputRange: bgs.map((_, i) => i * width),
            outputRange: bgs.map((bg) => bg),
        });
        return (
            <Animated.View
                style={[StyleSheet.absoluteFill, { backgroundColor }]}
            />
        );
    };

    const Square = ({ scrollX }: any) => {
        const Yolo = Animated.modulo(
            Animated.divide(
                Animated.modulo(scrollX, width),
                new Animated.Value(width)
            ),
            1
        );
        const rotate = Yolo.interpolate({
            inputRange: [0, 0.3, 0.6, 1],
            outputRange: ['35deg', '0deg', '0deg', '35deg'],
        });
        return (
            <Animated.View
                style={{
                    width: height,
                    height: height,
                    backgroundColor: '#fff',
                    borderRadius: 86,
                    position: 'absolute',
                    top: -height * 0.6,
                    left: -height * 0.3,
                    transform: [
                        {
                            rotate,
                        },
                    ],
                }}
            />
        );
    };

    return (
        <View style={{ flex: 1, width: width, alignItems: 'center' }}>
            <Backdrop scrollX={scrollX} />
            <Square scrollX={scrollX} />
            <Animated.FlatList
                scrollEventThrottle={32}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                data={DATA}
                contentContainerStyle={{ paddingBottom: 100 }}
                keyExtractor={(item) => item.key}
                renderItem={({ item, index }) => {
                    return (
                        <View
                            style={{
                                width,
                                padding: 20,
                                alignItems: 'center',
                            }}
                        >
                            <View
                                style={{
                                    flex: 0.7,
                                    //backgroundColor: 'red',
                                    justifyContent: 'center',
                                }}
                            >
                                <Image
                                    source={{ uri: item.image }}
                                    style={{
                                        width: width / 2,
                                        height: height / 2,
                                        resizeMode: 'contain',
                                    }}
                                />
                            </View>
                            <View style={{ flex: 0.3 }}>
                                <Text
                                    style={{
                                        fontWeight: '800',
                                        fontSize: 28,
                                        marginBottom: 10,
                                        color: '#fff',
                                    }}
                                >
                                    {item.title}
                                </Text>
                                <Text
                                    style={{
                                        fontWeight: '300',
                                        color: '#fff',
                                    }}
                                >
                                    {item.description}
                                </Text>
                            </View>
                        </View>
                    );
                }}
            />
            <Indicator scrollX={scrollX} />
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'absolute',
                    bottom: '6%',
                    width: width,
                    justifyContent: 'space-around',
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        navigation.navigate('SignUp');
                    }}
                    style={{
                        height: 50,
                        width: '40%',
                        borderRadius: 20,
                        backgroundColor: '#fff',
                        alignContent: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                    }}
                >
                    <Text style={{ color: '#000', textAlign: 'center' }}>
                        SignUp
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        navigation.navigate('Login');
                    }}
                    style={{
                        height: 50,
                        width: '40%',
                        borderRadius: 20,
                        backgroundColor: '#fff',
                        alignContent: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                    }}
                >
                    <Text style={{ color: '#000', textAlign: 'center' }}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const Stack = createStackNavigator();

const MyDarkTheme = {
    ...DarkTheme,
    dark: true,
    colors: {
        ...DarkTheme.colors,
        primary: '#000000',
        background: '#212121',
        text: '#bdbdbd',
        card: '#333333',
    },
};

const MyLightTheme = {
    ...DefaultTheme,
    dark: false,
    colors: {
        ...DefaultTheme.colors,
        primary: '#ffffff',
        background: '#ffffff',
        text: '#000',
        card: '#fff',
        greytone: String('#ececec'),
    },
};

function App({ navigation }: any) {
    const { colors, dark } = useTheme();
    const [Theme, setTheme] = useState(true);
    useEffect(() => {
        let eventListener = EventRegister.addEventListener(
            'changeThemeEvent',
            (data) => {
                setTheme(data);
            }
        );
        return () => {
            EventRegister.removeEventListener('changeThemeEvent');
            true;
        };
    }, []);
    // async function gettheme() {
    //     var value = await AsyncStorage.getItem('theme');
    //     if (value == 'true') {
    //         setTheme(true);
    //     } else {
    //         setTheme(false);
    //     }
    // }
    return (
        <DataLayer initialState={initialState} reducer={reducer}>
            <NavigationContainer
                theme={Theme ? MyLightTheme : MyDarkTheme}
                independent={true}
            >
                <Stack.Navigator
                    screenOptions={{
                        animationEnabled: true,
                        cardStyleInterpolator:
                            CardStyleInterpolators.forHorizontalIOS,
                    }}
                    mode='modal'
                    initialRouteName='Home'
                >
                    {/* Home */}
                    <Stack.Screen
                        name='App'
                        component={App}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='Redirect'
                        component={RedirectTo}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='Home'
                        component={SplashScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='Login'
                        component={LoginScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='SignUp'
                        component={SignUpScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='Main'
                        component={MainScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='Feed'
                        component={FeedScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='ChatList'
                        component={ChatListScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='ChatMessage'
                        component={ChatScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='Explore'
                        component={ExploreScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='Profile'
                        component={ProfileScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='ClickedProfile'
                        component={ClickedProfileScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='Camera'
                        component={Camera}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='SearchScreen'
                        component={SearchScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='Header'
                        component={Header}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='Followers'
                        component={FollowersListScreen}
                        options={{ headerTitle: 'Followers' }}
                    />
                    <Stack.Screen
                        name='Following'
                        component={FollowingListScreen}
                        options={{ headerTitle: 'Following' }}
                    />
                    <Stack.Screen
                        name='AllComments'
                        component={ViewAllCommentsScreen}
                        options={{ headerTitle: 'Comments' }}
                    />
                    <Stack.Screen
                        name='TrendingPosts'
                        component={TrendingPostScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='ListofPhotos'
                        component={ListofPhotos}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='Posts'
                        component={Posts}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='FavouritePosts'
                        component={FavouritePosts}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='EditProfile'
                        component={EditProfileScreen}
                        options={{ headerShown: false }}
                    />

                    <Stack.Screen
                        name='PostEdit'
                        component={PostEditScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='FleetScreen'
                        component={FleetScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='SwitchFleetScreen'
                        component={SwitchFleetScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='SwitchFleetScreenNew'
                        component={SwitchFleetScreenNew}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='SettingScreen'
                        component={SettingScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='LikedPostScreen'
                        component={LikedPostScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='Notifications'
                        component={NotificationScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='Shimmer'
                        component={Shimmer}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='ForgotPassword'
                        component={ForgotPasswordScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='Statistics'
                        component={StatisticScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='Help'
                        component={HelpScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='CovidRelief0'
                        component={CovidRelief0}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='CovidRelief1'
                        component={CovidRelief1}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='CovidRelief2'
                        component={CovidRelief2}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='ExploreRedirectPost'
                        component={ExploreRedirectPostScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='ExploreRedirectPostComponent'
                        component={ExploreRedirectPostComponent}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </DataLayer>
    );
}

export default () => {
    return (
        <DataLayer>
            <App />
        </DataLayer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#4630eb',
        borderRadius: 30,
        margin: '4%',
        padding: 30,
        height: '5%',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
