import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    Dimensions,
    FlatList,
    ScrollView,
    Pressable,
    Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import CircleImage from '../Components/CircleImage';
import {
    PinchGestureHandler,
    TouchableOpacity,
    TouchableWithoutFeedback,
    State,
} from 'react-native-gesture-handler';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { baseImageUrl } from '../images/imageBaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseApi from '../api/baseApi';
import moment from 'moment';
import Svg, { Defs, G, Path } from 'react-native-svg';
import { useNavigation, useTheme } from '@react-navigation/native';

const ViewAllCommentsScreen = (props: any) => {
    const navigation = useNavigation();
    const { colors, dark } = useTheme();
    useEffect(() => {
        getcomments();
    }, []);

    let [comments, setComments] = useState(props.route.params.comments);
    let [getpostlike, setGetPostLike] = useState();
    let [getpostlikenumber, setGetPostLikeNumber] = useState(0);
    const [likeAnimation, setLikeAnimation] = useState(0);

    const [newComment, setNewComment] = useState('');

    const ani = React.useRef(new Animated.Value(0)).current;

    async function addcomment() {
        if (newComment != '') {
            var value = await AsyncStorage.getItem('mysuperkey');
            await baseApi
                .post('posts/addcomment/', {
                    token: value?.split('"')[1],
                    postID: props.route.params.id,
                    comment: newComment,
                })
                .then(function (response) {
                    //console.log(response);
                    setNewComment('');
                    getcomments();
                })
                .catch(function (error) {
                    alert(error.message);
                });
        } else {
            alert('Type Something to comment');
        }
    }

    async function getcomments() {
        await baseApi
            .post('posts/comments/', {
                postID: props.route.params.id,
            })
            .then(function (response) {
                setComments((comments = response.data));
                //console.log(response.data);
                //console.log(response.data.id, 'hhhh');
                //getCommentLikes(response.data.id);
            })
            .catch(function (error) {
                alert(error);
            });
    }

    const [maxNumber, setMaxNumber] = useState(2);
    const [flag, setFlag] = useState('more');

    function expandAndContract() {
        if (flag === 'more') {
            setMaxNumber(10);
            setFlag('less');
        } else {
            setMaxNumber(2);
            setFlag('more');
        }
    }

    let { height, width } = Dimensions.get('window');
    // console.log(width);
    // console.log(height);

    const menu = useRef(null);
    const hideMenu = () => menu.current.hide();
    const showMenu = () => menu.current.show();

    var backCount = 0;
    var backTimer: NodeJS.Timeout;
    function clearTimeout(backTimer: any) {
        backTimer = 0;
    }
    const scale = new Animated.Value(1);

    const onZoomEventFunction = Animated.event(
        [
            {
                nativeEvent: { scale: scale },
            },
        ],
        {
            useNativeDriver: true,
        }
    );

    const onZoomStateChangeFunction = (event) => {
        if (event.nativeEvent.oldState == State.ACTIVE) {
            Animated.spring(scale, {
                toValue: 1,
                useNativeDriver: true,
                bounciness: 5,
            }).start();
        }
    };

    let [liked, setliked] = useState();
    const [save, setSaved] = useState(false);

    async function likebackendDoubletap() {
        var value = await AsyncStorage.getItem('mysuperkey');

        if (liked == false || liked == null) {
            await baseApi
                .post('posts/like_dislike/', {
                    token: value?.split('"')[1],
                    post_id: props.route.params.id,
                })
                .then(function (response) {
                    console.log(response.data.liked);
                    setliked((liked = response.data.liked));
                    likenumber();
                })
                .catch(function (error) {
                    alert(error.message);
                });
        } else {
            return;
        }
    }

    async function likebackend() {
        var value = await AsyncStorage.getItem('mysuperkey');
        //var value = await SecureStore.getItemAsync('myuserid');
        // console.log(value);
        // console.log(props.id);
        await baseApi

            .post('posts/like_dislike/', {
                token: value?.split('"')[1],
                post_id: props.route.params.id,
            })
            .then(function (response) {
                //console.log(response.data.liked);
                setliked((liked = response.data.liked));
                likenumber();
            })
            .catch(function (error) {
                alert(error.message);
            });
    }

    async function likenumber() {
        var value = await AsyncStorage.getItem('myuserid');
        await baseApi
            .get('posts/likes/'.concat(props.route.params.id, '/'))
            .then(function (response) {
                for (var i = 0; i < response.data.length; i++) {
                    if (response.data[i].user.user.id == value) {
                        setliked((liked = true));
                    }
                }
                setGetPostLike((getpostlike = response.data));
                setGetPostLikeNumber(response.data.length);
            })
            .catch(function (error) {
                alert(error.message);
            });
    }

    async function saveBackend() {
        var value = await AsyncStorage.getItem('mysuperkey');
        //var value = await SecureStore.getItemAsync('myuserid');
        // console.log(value);
        // console.log(props.id);
        await baseApi

            .post('posts/saveunsavepost/', {
                token: value?.split('"')[1],
                postID: props.route.params.id,
            })
            .then(function (response) {
                alert('save toggle');
            })
            .catch(function (error) {
                alert(error.message);
            });
    }

    async function savePost() {
        if (save == false) {
            setSaved(true);
            saveBackend();
        } else {
            setSaved(false);
            saveBackend();
        }
    }

    return (
        <View style={{}}>
            <ScrollView
                style={[
                    styles.card,
                    { backgroundColor: dark ? colors.primary : colors.primary },
                ]}
            >
                <View style={styles.cardHeader}>
                    <View style={styles.headerLeft}>
                        {props.route.params.profileimage.slice(
                            props.route.params.profileimage.length - 4
                        ) != 'null' ? (
                            <Image
                                style={styles.userImage}
                                source={{
                                    uri: props.route.params.profileimage,
                                }}
                            />
                        ) : (
                            <TouchableOpacity style={styles.userImage}>
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
                            style={{ flexDirection: 'column', marginStart: 3 }}
                        >
                            <Text
                                onPress={() => {
                                    props.navigation.navigate(
                                        'ClickedProfile',
                                        {
                                            userid: props.route.params.userId,
                                        }
                                    );
                                }}
                                style={[
                                    styles.userName,
                                    { color: dark ? colors.text : colors.text },
                                ]}
                            >
                                {props.route.params.firstname}{' '}
                                {props.route.params.lastname}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 12,
                                    marginStart: 10,
                                    color: dark ? colors.text : colors.text,
                                }}
                            >
                                {props.route.params.username}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Text></Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            position: 'absolute',
                            right: 0,
                            marginTop: 18,
                            marginEnd: 20,
                        }}
                    >
                        <Text
                            style={{
                                marginEnd: 7,
                                fontSize: 10,
                                marginTop: 4,
                                color: dark ? colors.text : colors.text,
                            }}
                        >
                            {moment(
                                new Date(props.route.params.date)
                            ).fromNow()}
                        </Text>
                        <Menu
                            ref={menu}
                            button={
                                <TouchableOpacity
                                    onPress={showMenu}
                                    style={{ marginHorizontal: 10 }}
                                >
                                    <SimpleLineIcons
                                        name='options-vertical'
                                        size={20}
                                        color={dark ? colors.text : colors.text}
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
                </View>
                <View style={{ marginHorizontal: 12, marginVertical: 15 }}>
                    <Text
                        numberOfLines={maxNumber}
                        style={{
                            letterSpacing: 0.4,
                            color: '#000',
                            fontWeight: '600',
                            color: dark ? colors.text : colors.text,
                        }}
                    >
                        {props.route.params.caption}
                    </Text>
                    <TouchableOpacity onPress={expandAndContract}>
                        {String(props.route.params.caption).length > 40 ? (
                            <Text style={{ color: 'blue' }}>Read {flag}</Text>
                        ) : (
                            <Text style={{ fontSize: 0 }}></Text>
                        )}
                    </TouchableOpacity>
                </View>
                <TouchableWithoutFeedback
                    onPress={() => {
                        backCount++;
                        if (backCount == 2) {
                            clearTimeout(backTimer);
                            //alert('Clicked twice');
                            likebackendDoubletap();
                            setLikeAnimation(1);
                            setTimeout(() => {
                                setLikeAnimation(0);
                                ani.setValue(0);
                            }, 1000);
                            Animated.timing(ani, {
                                toValue: 1,
                                duration: 300,
                                useNativeDriver: false,
                            }).start();
                        } else {
                            backTimer = setTimeout(() => {
                                backCount = 0;
                            }, 1000);
                        }
                    }}
                    style={{
                        backgroundColor: '#ececec',
                        borderRadius: 15,
                        marginHorizontal: 5,
                        paddingHorizontal: 0,
                        overflow: 'hidden',
                    }}
                >
                    <PinchGestureHandler
                        onGestureEvent={onZoomEventFunction}
                        onHandlerStateChange={onZoomStateChangeFunction}
                    >
                        <Animated.Image
                            style={[
                                styles.feedImage,
                                { transform: [{ scale: scale }] },
                            ]}
                            source={{ uri: props.route.params.image }}
                            resizeMode='stretch'
                        />
                    </PinchGestureHandler>
                    {likeAnimation == 1 ? (
                        <Animated.View
                            style={[
                                {
                                    position: 'absolute',
                                    flex: 1,
                                    //backgroundColor: 'red',
                                    height: '100%',
                                    width: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    opacity: ani,
                                },
                            ]}
                        >
                            <Svg
                                {...props}
                                xmlns='http://www.w3.org/2000/svg'
                                width={120}
                                height={120}
                                viewBox='0 0 48 48'
                                style={{ alignSelf: 'center' }}
                            >
                                <Defs></Defs>
                                <G data-name='Group 98'>
                                    <G
                                        filter='url(#prefix__a)'
                                        transform='translate(.004)'
                                    >
                                        <Path
                                            data-name='Path 121'
                                            d='M24 6A15 15 0 119 21 15 15 0 0124 6z'
                                            fill='#df554e'
                                        />
                                    </G>
                                    <G
                                        filter='url(#prefix__b)'
                                        transform='translate(.004)'
                                    >
                                        <Path
                                            data-name='like (1)'
                                            d='M24.11 30.1a5.571 5.571 0 01-3.335-1.1c-3.957-2.953-6.088-6.5-6.164-10.256v-.038a5.706 5.706 0 015.7-5.7c1.459 0 2.791 1.518 3.8 2.421 1.009-.9 2.342-2.421 3.8-2.421a5.706 5.706 0 015.7 5.7v.038c-.076 3.756-2.208 7.3-6.164 10.256a5.571 5.571 0 01-3.337 1.1zm-5.7-11.411c.076 3.2 2.562 5.717 4.638 7.267a1.787 1.787 0 002.124 0c2.075-1.549 4.562-4.066 4.638-7.267a1.9 1.9 0 00-3.8.006 1.9 1.9 0 01-3.8 0 1.9 1.9 0 00-3.8-.006z'
                                            fill='#fff'
                                        />
                                    </G>
                                </G>
                            </Svg>
                        </Animated.View>
                    ) : (
                        <></>
                    )}
                </TouchableWithoutFeedback>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignContent: 'center',
                    }}
                >
                    <View style={styles.bottomBarCardLeft}>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                //backgroundColor: 'red',
                                flex: 1,
                                justifyContent: 'flex-start',
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    likebackend();
                                    if (liked == false) {
                                        setLikeAnimation(1);
                                        setTimeout(() => {
                                            setLikeAnimation(0);
                                            ani.setValue(0);
                                        }, 1000);
                                        Animated.timing(ani, {
                                            toValue: 1,
                                            duration: 300,
                                            useNativeDriver: false,
                                        }).start();
                                    }
                                }}
                                activeOpacity={1}
                                style={{
                                    alignItems: 'center',
                                    //flexDirection: 'row',
                                }}
                            >
                                {liked ? (
                                    <Svg
                                        {...props}
                                        xmlns='http://www.w3.org/2000/svg'
                                        width={44}
                                        height={44}
                                        viewBox='0 0 48 48'
                                        style={{ alignSelf: 'center' }}
                                    >
                                        <Defs></Defs>
                                        <G data-name='Group 98'>
                                            <G
                                                filter='url(#prefix__a)'
                                                transform='translate(.004)'
                                            >
                                                <Path
                                                    data-name='Path 121'
                                                    d='M24 6A15 15 0 119 21 15 15 0 0124 6z'
                                                    fill='#df554e'
                                                />
                                            </G>
                                            <G
                                                filter='url(#prefix__b)'
                                                transform='translate(.004)'
                                            >
                                                <Path
                                                    data-name='like (1)'
                                                    d='M24.11 30.1a5.571 5.571 0 01-3.335-1.1c-3.957-2.953-6.088-6.5-6.164-10.256v-.038a5.706 5.706 0 015.7-5.7c1.459 0 2.791 1.518 3.8 2.421 1.009-.9 2.342-2.421 3.8-2.421a5.706 5.706 0 015.7 5.7v.038c-.076 3.756-2.208 7.3-6.164 10.256a5.571 5.571 0 01-3.337 1.1zm-5.7-11.411c.076 3.2 2.562 5.717 4.638 7.267a1.787 1.787 0 002.124 0c2.075-1.549 4.562-4.066 4.638-7.267a1.9 1.9 0 00-3.8.006 1.9 1.9 0 01-3.8 0 1.9 1.9 0 00-3.8-.006z'
                                                    fill='#fff'
                                                />
                                            </G>
                                        </G>
                                    </Svg>
                                ) : (
                                    <Svg
                                        {...props}
                                        xmlns='http://www.w3.org/2000/svg'
                                        width={44}
                                        height={44}
                                        viewBox='0 0 48 48'
                                    >
                                        <Defs></Defs>
                                        <G data-name='Group 97'>
                                            <G data-name='Group 96'>
                                                <G
                                                    filter='url(#prefix__a)'
                                                    transform='translate(.004)'
                                                >
                                                    <Path
                                                        data-name='Path 121'
                                                        d='M24 6A15 15 0 119 21 15 15 0 0124 6z'
                                                        fill='#ededed'
                                                    />
                                                </G>
                                                <G
                                                    filter='url(#prefix__b)'
                                                    transform='translate(.004)'
                                                >
                                                    <Path
                                                        data-name='like (1)'
                                                        d='M24.11 30.1a5.571 5.571 0 01-3.335-1.1c-3.957-2.953-6.088-6.5-6.164-10.256v-.038a5.706 5.706 0 015.7-5.7c1.459 0 2.791 1.518 3.8 2.421 1.009-.9 2.342-2.421 3.8-2.421a5.706 5.706 0 015.7 5.7v.038c-.076 3.756-2.208 7.3-6.164 10.256a5.571 5.571 0 01-3.337 1.1zm-5.7-11.411c.076 3.2 2.562 5.717 4.638 7.267a1.787 1.787 0 002.124 0c2.075-1.549 4.562-4.066 4.638-7.267a1.9 1.9 0 00-3.8.006 1.9 1.9 0 01-3.8 0 1.9 1.9 0 00-3.8-.006z'
                                                        fill='#1f1f1f'
                                                    />
                                                </G>
                                            </G>
                                        </G>
                                    </Svg>
                                )}
                            </TouchableOpacity>
                            <Pressable
                                style={{
                                    marginLeft: 5,
                                    paddingHorizontal: 2,
                                    height: 40,
                                    //backgroundColor: 'green',
                                    paddingVertical: 8,
                                    //position: 'absolute',
                                    //left: 10,
                                }}
                                onPress={() => {
                                    navigation.navigate('LikedPostScreen', {
                                        id: getpostlike,
                                    });
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: dark ? colors.text : colors.text,
                                    }}
                                >
                                    {getpostlikenumber}
                                    {' Like'}
                                </Text>
                            </Pressable>
                        </View>
                        <View
                            style={{
                                display: 'flex',
                                flex: 1,
                                justifyContent: 'center',
                                //backgroundColor: 'green',
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    savePost();
                                }}
                                style={{
                                    flexDirection: 'row',
                                    alignSelf: 'center',
                                    display: 'flex',
                                    alignItems: 'center',
                                    alignContent: 'center',
                                }}
                            >
                                {/* <Svg
                            {...props}
                            xmlns='http://www.w3.org/2000/svg'
                            width={48}
                            height={48}
                            viewBox='0 0 48 48'
                        >
                            <Defs></Defs>
                            <G data-name='Group 99'>
                                <G filter='url(#prefix__a)'>
                                    <Path
                                        data-name='Path 124'
                                        d='M24 6A15 15 0 119 21 15 15 0 0124 6z'
                                        fill='#ededed'
                                    />
                                </G>
                                <G filter='url(#prefix__b)'>
                                    <Path
                                        data-name='star'
                                        d='M28.878 29.466a1.078 1.078 0 01-.439-.093l-4.431-1.97-4.431 1.97a1.08 1.08 0 01-1.5-1.2l.973-4.844-3.383-3.379a1.082 1.082 0 01.552-1.826l4.863-.974 1.937-4.357a1.082 1.082 0 011.978 0l1.937 4.357 4.862.972a1.082 1.082 0 01.554 1.828l-3.38 3.379.969 4.843a1.082 1.082 0 01-1.061 1.294zm-4.87-4.329a1.082 1.082 0 01.439.093l2.96 1.315-.672-3.36a1.082 1.082 0 01.3-.977l2.354-2.358-3.429-.687a1.082 1.082 0 01-.777-.621l-1.175-2.645-1.175 2.645a1.08 1.08 0 01-.777.621l-3.429.687 2.358 2.358a1.082 1.082 0 01.3.977l-.675 3.365 2.959-1.32a1.082 1.082 0 01.439-.093z'
                                        fill='#1f1f1f'
                                    />
                                </G>
                            </G>
                        </Svg> */}
                                <Svg
                                    {...props}
                                    xmlns='http://www.w3.org/2000/svg'
                                    width={42}
                                    height={42}
                                    viewBox='0 0 48 48'
                                >
                                    <Defs></Defs>
                                    <G data-name='Group 100'>
                                        <G
                                            filter='url(#prefix__a)'
                                            data-name='Group 95'
                                        >
                                            <Path
                                                data-name='Path 124'
                                                d='M24 6A15 15 0 119 21 15 15 0 0124 6z'
                                                fill='#ededed'
                                            />
                                        </G>
                                        <G filter='url(#prefix__b)'>
                                            <Path
                                                data-name='star'
                                                d='M28.878 29.466a1.078 1.078 0 01-.439-.093l-4.431-1.97-4.431 1.97a1.08 1.08 0 01-1.5-1.2l.973-4.844-3.383-3.379a1.082 1.082 0 01.552-1.826l4.863-.974 1.937-4.357a1.082 1.082 0 011.978 0l1.937 4.357 4.862.972a1.082 1.082 0 01.554 1.828l-3.38 3.379.969 4.843a1.082 1.082 0 01-1.061 1.294zm-4.87-4.329a1.082 1.082 0 01.439.093l2.96 1.315-1.447-5.115c-.071-.355-.582 2.154-.326 1.9l-5.668-3.669 5.995-.5-.269 1.793-.057.09-1.462 3.95-1.34-6.452c-.143.321 1.684.871 1.34.939l1.787 2.386-4.975.341c.256.256.8-1.773.725-1.418l3.287-1.918 3.442 8.278c.138-.061-4.582-2.013-4.431-2.013z'
                                                fill='#1f1f1f'
                                            />
                                        </G>
                                    </G>
                                </Svg>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                display: 'flex',
                                flex: 1,
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                                alignContent: 'center',
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('Shimmer');
                                }}
                                activeOpacity={1}
                                style={{
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                }}
                            >
                                <Svg
                                    {...props}
                                    xmlns='http://www.w3.org/2000/svg'
                                    width={42}
                                    height={42}
                                    viewBox='0 0 48 48'
                                >
                                    <Defs></Defs>
                                    <G data-name='Group 101'>
                                        <G filter='url(#prefix__a)'>
                                            <Path
                                                data-name='Path 122'
                                                d='M24 6A15 15 0 119 21 15 15 0 0124 6z'
                                                fill='#ededed'
                                            />
                                        </G>
                                        <G filter='url(#prefix__b)'>
                                            <Path
                                                data-name='Path 123'
                                                d='M29 25a1.969 1.969 0 00-1.262.482l-3.049-2.176a2.94 2.94 0 00-.248-3.039l3.567-3.567A1.945 1.945 0 0029 17a2 2 0 10-2-2 1.945 1.945 0 00.3.992l-3.566 3.568a2.97 2.97 0 00-4.369 1.04l-2.408-.8A.983.983 0 0016 19a1 1 0 100 2 .986.986 0 00.652-.256l2.395.8A2.943 2.943 0 0019 22a3 3 0 005.115 2.127l3.03 2.162A1.963 1.963 0 0027 27a2 2 0 102-2z'
                                                fill='#1f1f1f'
                                            />
                                        </G>
                                    </G>
                                </Svg>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View
                    style={[
                        styles.lineStyle,
                        { marginTop: 4, marginBottom: 0 },
                    ]}
                />
                <FlatList
                    inverted
                    data={comments}
                    keyExtractor={({ item, index }) => index}
                    renderItem={({ item }) => {
                        return (
                            <CommentsComponent
                                id={item.id}
                                comment={item.comment}
                                username={item.user.user.username}
                                firstname={item.user.user.first_name}
                                lastname={item.user.user.last_name}
                                userImage={baseImageUrl.concat(
                                    item.user.userimage
                                )}
                                getComments={getcomments}
                                postUserId={props.route.params.userId}
                                commentUserId={item.user.user.id}
                            />
                        );
                    }}
                />
            </ScrollView>
            <View style={styles.container}>
                <TouchableOpacity>
                    <AntDesign name='smile-circle' size={24} color='black' />
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    placeholder='Type a message 😎😎'
                    placeholderTextColor='black'
                    onChangeText={setNewComment}
                    value={newComment}
                />
                <TouchableOpacity onPress={addcomment}>
                    <MaterialIcons name='send' size={24} color='black' />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export const CommentsComponent = (props: any) => {
    const { colors, dark } = useTheme();
    let [userId, setUserId] = useState();
    useEffect(() => {
        getCommentsLikes();
        getUserId();
    }, [userId]);

    async function getUserId() {
        setUserId((userId = await AsyncStorage.getItem('myuserid')));
    }

    const [CommentLikeNumber, setCommentLikeNumber] = useState();

    async function getCommentsLikes() {
        //console.log(props.id);
        await baseApi
            .get(`/posts/get_comment_like/${props.id}/`)
            .then(function (response) {
                //console.log(response.data.length);
                setCommentLikeNumber(response.data.length);
            })
            .catch(function (error) {
                alert(error);
            });
    }

    async function deleteComment() {
        var value = await AsyncStorage.getItem('mysuperkey');
        //console.log(value);
        await baseApi
            .post(`/posts/deletecomment/${props.id}/`, {
                token: value.split('"')[1],
            })
            .then(function (response) {
                //console.log(response.data);
                props.getComments();
            })
            .catch(function (error) {
                console.log('Error', error);
            });
    }

    async function likecomment() {
        //console.log('hhhhh');
        var value = await AsyncStorage.getItem('mysuperkey');
        //console.log(props.id);
        await baseApi
            .post(`/posts/like_dislike_comment/${props.id}/`, {
                token: value.split('"')[1],
            })
            .then(function (response) {
                //console.log(response.data)
                getCommentsLikes();
            })
            .catch(function (error) {
                console.log('Error', error);
            });
    }

    const menu = useRef(null);
    const hideMenu = () => menu.current.hide();
    const showMenu = () => menu.current.show();

    function menuRender() {
        if (userId == props.postUserId && userId == props.commentUserId) {
            return (
                <MenuItem
                    onPress={() => {
                        deleteComment();
                        hideMenu();
                    }}
                >
                    Delete Comment
                </MenuItem>
            );
        } else if (
            userId == props.postUserId &&
            userId != props.commentUserId
        ) {
            return (
                <View>
                    <MenuItem
                        onPress={() => {
                            hideMenu();
                        }}
                    >
                        Report Comment
                    </MenuItem>
                    <MenuItem
                        onPress={() => {
                            deleteComment();
                            hideMenu();
                        }}
                    >
                        Delete Comment
                    </MenuItem>
                </View>
            );
        } else if (
            userId != props.postUserId &&
            userId == props.commentUserId
        ) {
            return (
                <MenuItem
                    onPress={() => {
                        deleteComment();
                        hideMenu();
                    }}
                >
                    Delete Comment
                </MenuItem>
            );
        } else if (
            userId != props.postUserId &&
            userId != props.commentUserId
        ) {
            return (
                <MenuItem
                    onPress={() => {
                        hideMenu();
                    }}
                >
                    Report Comment
                </MenuItem>
            );
        }
    }

    return (
        <View>
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: 7,
                    marginHorizontal: 10,
                    paddingHorizontal: 5,
                    width: '95%',
                    alignSelf: 'center',
                    borderRadius: 8,
                    marginBottom: 5,
                }}
            >
                {props.userImage.slice(props.userImage.length - 4) != 'null' ? (
                    <CircleImage
                        image={props.userImage}
                        style={{
                            marginTop: 3,
                            marginBottom: 10,
                            height: 30,
                            width: 30,
                            borderRadius: 20,
                        }}
                    />
                ) : (
                    <TouchableOpacity>
                        <Svg
                            style={{
                                marginBottom: 10,
                                height: 30,
                                width: 30,
                                borderRadius: 20,
                            }}
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
                        marginHorizontal: 10,
                        flexDirection: 'column',
                        width: '75%',
                    }}
                >
                    <Text
                        style={{
                            fontSize: 14,
                            marginBottom: 2,
                            color: dark ? colors.text : colors.text,
                        }}
                    >
                        {props.username}
                    </Text>
                    <Text
                        style={{
                            fontSize: 8,
                            marginTop: -2,
                            color: dark ? colors.text : colors.text,
                        }}
                    >
                        {props.firstname} {props.lastname}
                    </Text>
                    <Text
                        numberOfLines={10}
                        style={{
                            marginTop: 8,
                            color: dark ? colors.text : colors.text,
                        }}
                    >
                        {props.comment}
                    </Text>
                </View>

                <View
                    style={
                        {
                            // backgroundColor: 'red',
                        }
                    }
                >
                    <Menu
                        ref={menu}
                        button={
                            <TouchableOpacity
                                style={{
                                    display: 'flex',
                                    marginRight: 3,
                                    marginTop: 5,
                                }}
                            >
                                <Entypo
                                    onPress={() => {
                                        showMenu();
                                    }}
                                    style={{
                                        textAlign: 'right',
                                    }}
                                    name='dots-three-vertical'
                                    size={14}
                                    color={dark ? colors.text : colors.text}
                                />
                            </TouchableOpacity>
                        }
                    >
                        {menuRender()}
                    </Menu>
                </View>
            </View>

            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'space-around',
                    marginHorizontal: 20,
                    //backgroundColor: 'red',
                    marginBottom: 7,
                    paddingTop: 6,
                }}
            >
                <Text
                    style={{
                        fontSize: 11,
                        fontWeight: 'bold',
                        opacity: 0.5,
                        color: dark ? colors.text : colors.text,
                    }}
                >
                    18d
                </Text>
                <Text
                    style={{
                        fontSize: 11,
                        fontWeight: 'bold',
                        opacity: 0.5,
                        color: dark ? colors.text : colors.text,
                    }}
                >
                    {CommentLikeNumber}
                    {'  '}Likes
                </Text>
                <Pressable
                    style={{
                        //backgroundColor: 'red',
                        paddingHorizontal: 10,
                    }}
                    onPress={() => {
                        likecomment();
                    }}
                    pressRetentionOffset={{
                        bottom: 20,
                        left: 20,
                        right: 20,
                        top: 20,
                    }}
                >
                    <AntDesign
                        style={{}}
                        name='heart'
                        size={13}
                        color={dark ? colors.text : colors.text}
                    />
                </Pressable>
            </View>
            <View style={styles.lineStyle} />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 3,
        marginVertical: 3,
        borderRadius: 15,
        marginBottom: 70,
    },
    cardHeader: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'flex-start',
        marginHorizontal: 10,
    },
    headerLeft: {
        flexDirection: 'row',
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 30,
        marginTop: 10,
    },
    userName: {
        fontWeight: 'bold',
        marginTop: 12,
        marginLeft: 10,
    },
    moreIcon: {
        fontSize: 20,
        color: '#ddd',
        marginTop: 15,
    },
    feedImage: {
        width: '100%',
        height: 350,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footerLeft: {
        flexDirection: 'row',
    },
    bottomBarCardLeft: {
        marginTop: 5,
        flexDirection: 'row',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        width: '100%',
        height: 40,
        alignItems: 'center',
    },
    bottomBarCardRight: {
        paddingEnd: 10,
        marginTop: 7,
        position: 'absolute',
        right: 0,
        alignItems: 'center',
    },
    icons: {
        marginEnd: 10,
    },
    lastSection: {
        flexDirection: 'row',
        width: '100%',
        height: 40,
        marginTop: 3,
    },
    lastSection1: {
        flexDirection: 'row',
        width: '42%',
        height: 40,
        marginTop: 5,
    },
    lastSection2: {
        paddingEnd: 15,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        width: '57%',
        height: 40,
        marginTop: 5,
    },
    container: {
        width: '95%',
        backgroundColor: '#aabbcd',
        flexDirection: 'row',
        padding: 5,
        alignSelf: 'center',
        borderRadius: 18,
        justifyContent: 'space-between',
        marginTop: 30,
        paddingVertical: 10,
        paddingHorizontal: 10,
        position: 'absolute',
        bottom: 10,
    },
    input: {
        width: '80%',
    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor: 'black',
        opacity: 0.05,
        marginHorizontal: 20,
        marginBottom: 3,
    },
});

export default ViewAllCommentsScreen;
