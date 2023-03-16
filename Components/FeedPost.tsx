import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Button,
    Dimensions,
    TextInput,
    FlatList,
    Keyboard,
    Pressable,
    Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import CircleImage from './CircleImage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import * as SecureStore from 'expo-secure-store';
import baseApi from '../api/baseApi';
import Ripple from 'react-native-material-ripple';
import { CommentsComponent } from '../screens/ViewAllCommentsScreen';
import Svg, { Circle, Defs, G, Path, Rect } from 'react-native-svg';

import { baseImageUrl } from '../images/imageBaseUrl';
import moment from 'moment';
import { useNavigation, useTheme } from '@react-navigation/native';
import { EventRegister } from 'react-native-event-listeners';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';

const FeedPost = (props: any) => {
    const { colors, dark } = useTheme();
    const navigation = useNavigation();

    const commentNumber = 99;
    const [maxNumber, setMaxNumber] = useState(2);
    const [flag, setFlag] = useState('more');

    let [inputcomment, setinputcomment] = useState('');
    let [fetchedcomments, setfetchedcomments] = useState();
    let [refresh, setrefresh] = useState(0);

    let [firstComment, setFirstComment] = useState('');
    let [firstCommentfirstname, setFirstCommentfirstname] = useState('');
    let [firstCommentlastname, setFirstCommentlastname] = useState('');
    let [firstCommentusername, setFirstCommentusername] = useState('');
    let [firstCommentuserimage, setFirstCommentuserimage] = useState('');
    let [firstCommentUserId, setFirstCommentUserId] = useState('');
    let [firstCommentId, setFirstCommentId] = useState();
    let [getpostlike, setGetPostLike] = useState();
    let [getpostlikenumber, setGetPostLikeNumber] = useState(0);
    const [likeAnimation, setLikeAnimation] = useState(0);

    let [userId, setUserId] = useState();

    const [myUId, setmyUId] = useState(AsyncStorage.getItem('myuserid'));
    const [userUId, setuserUId] = useState(props.userId);

    useEffect(() => {
        getcomments();
        likenumber();
        getUserId();
    }, [userId]);

    async function getUserId() {
        setUserId((userId = await AsyncStorage.getItem('myuserid')));
    }

    useEffect(() => {
        firstComment = firstComment;
    }, [firstComment]);

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

    let [liked, setliked] = useState();
    const [save, setSaved] = useState(false);

    async function likebackend() {
        var value = await AsyncStorage.getItem('mysuperkey');
        //var value = await SecureStore.getItemAsync('myuserid');
        // console.log(value);
        // console.log(props.id);
        await baseApi

            .post('posts/like_dislike/', {
                token: value?.split('"')[1],
                post_id: props.id,
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

    async function likebackendDoubletap() {
        var value = await AsyncStorage.getItem('mysuperkey');

        if (liked == false || liked == null) {
            await baseApi
                .post('posts/like_dislike/', {
                    token: value?.split('"')[1],
                    post_id: props.id,
                })
                .then(function (response) {
                    //console.log(response.data.liked);
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

    const ani = React.useRef(new Animated.Value(0)).current;

    async function saveBackend() {
        var value = await AsyncStorage.getItem('mysuperkey');
        //var value = await SecureStore.getItemAsync('myuserid');
        // console.log(value);
        // console.log(props.id);
        await baseApi

            .post('posts/saveunsavepost/', {
                token: value?.split('"')[1],
                postID: props.id,
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

    async function likenumber() {
        var value = await AsyncStorage.getItem('myuserid');
        await baseApi
            .get('posts/likes/'.concat(props.id, '/'))
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

    async function addcomment() {
        if (inputcomment != '') {
            var value = await AsyncStorage.getItem('mysuperkey');
            await baseApi
                .post('posts/addcomment/', {
                    token: value?.split('"')[1],
                    postID: props.id,
                    comment: inputcomment,
                })
                .then(function (response) {
                    //console.log(response);
                    setinputcomment('');
                    setrefresh((refresh = 0));
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
        if (refresh == 0) {
            setrefresh(1);
            await baseApi
                .post('posts/comments/', {
                    postID: props.id,
                })
                .then(function (response) {
                    setfetchedcomments((fetchedcomments = response.data));
                    try {
                        setFirstComment(
                            (firstComment = response.data[0].comment)
                        );
                        setFirstCommentfirstname(
                            (firstCommentfirstname =
                                response.data[0].user.user.first_name)
                        );
                        setFirstCommentlastname(
                            (firstCommentlastname =
                                response.data[0].user.user.last_name)
                        );
                        setFirstCommentusername(
                            (firstCommentusername =
                                response.data[0].user.user.username)
                        );
                        setFirstCommentuserimage(
                            (firstCommentuserimage =
                                response.data[0].user.userimage)
                        );
                        setFirstCommentId(
                            (firstCommentId = response.data[0].id)
                        );
                        setFirstCommentUserId(
                            (firstCommentUserId = response.data[0].user.user.id)
                        );
                    } catch (error) {}
                })
                .catch(function (error) {
                    alert(error);
                });
        }
    }

    async function reportPost() {
        await baseApi
            .post(`posts/report/${props.id}/`)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                alert(error.message);
            });
    }

    async function deletePost() {
        var value = await AsyncStorage.getItem('mysuperkey');
        console.log(props.id);
        await baseApi
            .post(`posts/deletepost/${props.id}/`, {
                token: value?.split('"')[1],
            })
            .then(function (response) {
                props.getFeedPosts();
            })
            .catch(function (error) {
                alert(error.message);
            });
    }

    const menu1 = useRef(null);
    const hideMenu1 = () => menu1.current.hide();
    const showMenu1 = () => menu1.current.show();

    const menu2 = useRef(null);
    const hideMenu2 = () => menu2.current.hide();
    const showMenu2 = () => menu2.current.show();

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

    function menuRender() {
        if (userId == props.userId && userId == firstCommentUserId) {
            return (
                <MenuItem
                    onPress={() => {
                        deleteComment();
                        hideMenu2();
                    }}
                >
                    Delete Comment
                </MenuItem>
            );
        } else if (userId == props.userId && userId != firstCommentUserId) {
            return (
                <View>
                    <MenuItem
                        onPress={() => {
                            hideMenu2();
                        }}
                    >
                        Report Comment
                    </MenuItem>
                    <MenuItem
                        onPress={() => {
                            deleteComment();
                            hideMenu2();
                        }}
                    >
                        Delete Comment
                    </MenuItem>
                </View>
            );
        } else if (userId != props.userId && userId == firstCommentUserId) {
            return (
                <MenuItem
                    onPress={() => {
                        deleteComment();
                        hideMenu2();
                    }}
                >
                    Delete Comment
                </MenuItem>
            );
        } else if (userId != props.userId && userId != firstCommentUserId) {
            return (
                <MenuItem
                    onPress={() => {
                        hideMenu2();
                    }}
                >
                    Report Comment
                </MenuItem>
            );
        }
    }

    async function deleteComment() {
        var value = await AsyncStorage.getItem('mysuperkey');
        // console.log(firstCommentId);
        await baseApi
            .post(`/posts/deletecomment/${firstCommentId}/`, {
                token: value.split('"')[1],
            })
            .then(function (response) {
                //console.log(response.data);
                setrefresh((refresh = 0));
                setFirstComment((firstComment = ''));
                setFirstCommentfirstname((firstCommentfirstname = ''));
                setFirstCommentlastname((firstCommentlastname = ''));
                setFirstCommentusername((firstCommentusername = ''));
                setFirstCommentuserimage((firstCommentuserimage = ''));
                setFirstCommentId((firstCommentId = undefined));
                setFirstCommentUserId((firstCommentUserId = ''));
                getcomments();
            })
            .catch(function (error) {
                console.log('Error', error);
            });
    }

    return (
        <View
            style={[
                styles.card,
                {
                    backgroundColor: dark ? colors.primary : colors.background,
                },
            ]}
        >
            <View style={styles.cardHeader}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        {
                            EventRegister.emit('clickedUserFeed', props.userId);
                        }
                        if (props.userId == userId) {
                            props.navigation.navigate('Profile');
                        } else {
                            props.navigation.navigate('ClickedProfile', {
                                userid: props.userId,
                            });
                            EventRegister.emitEvent(
                                'clickedProfileUserId',
                                props.userId
                            );
                        }
                    }}
                    style={styles.headerLeft}
                >
                    {props.profileimage.slice(props.profileimage.length - 4) !=
                    'null' ? (
                        <Image
                            style={styles.userImage}
                            source={{ uri: props.profileimage }}
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
                    <View style={{ flexDirection: 'column', marginStart: 3 }}>
                        <Text
                            style={[
                                styles.userName,
                                { color: dark ? colors.text : colors.text },
                            ]}
                        >
                            {props.username}
                        </Text>
                        <Text
                            style={{
                                fontSize: 12,
                                marginStart: 10,
                                color: dark ? colors.text : colors.text,
                            }}
                        >
                            {props.firstname} {props.lastname}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
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
                        {moment(new Date(props.date)).fromNow()}
                    </Text>
                    <Menu
                        ref={menu1}
                        button={
                            <TouchableOpacity
                                onPress={showMenu1}
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
                        {props.userId == userId ? (
                            <View>
                                <MenuItem
                                    onPress={() => {
                                        hideMenu1();
                                        deletePost();
                                    }}
                                >
                                    Delete Post
                                </MenuItem>

                                <MenuItem
                                    onPress={() => {
                                        hideMenu1();
                                        props.navigation.navigate('PostEdit', {
                                            caption: props.caption,
                                            postId: props.id,
                                            navigation: props.navigation,
                                        });
                                    }}
                                >
                                    EDIT
                                </MenuItem>
                            </View>
                        ) : (
                            <View>
                                <MenuItem
                                    onPress={() => {
                                        hideMenu1();
                                        reportPost();
                                    }}
                                >
                                    Report Post
                                </MenuItem>
                            </View>
                        )}
                    </Menu>
                </View>
            </View>
            <View style={{ marginHorizontal: 12, marginVertical: 15 }}>
                <Text
                    numberOfLines={maxNumber}
                    style={{
                        letterSpacing: 0.4,
                        color: dark ? colors.text : colors.text,
                        fontWeight: '600',
                    }}
                >
                    {props.caption}
                </Text>
                <TouchableOpacity onPress={expandAndContract}>
                    {String(props.caption).length > 40 ? (
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
                        source={{ uri: props.image }}
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

            {firstComment ? (
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: 3,
                        marginHorizontal: 10,
                        backgroundColor: dark ? '#2b2b2b' : '#F5F5FF',
                        // borderColor: '#fff',
                        // borderWidth: 0.15,
                        padding: 8,
                        width: '95%',
                        alignSelf: 'center',
                        borderRadius: 8,
                        marginBottom: 5,
                    }}
                >
                    <CircleImage
                        image={baseImageUrl.concat(firstCommentuserimage)}
                        style={{
                            marginTop: 3,
                            marginBottom: 10,
                            height: 30,
                            width: 30,
                            borderRadius: 20,
                        }}
                    />
                    <View
                        style={{
                            marginHorizontal: 10,
                            flexDirection: 'column',
                            width: '70%',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 14,
                                color: dark ? colors.text : colors.text,
                            }}
                        >
                            {firstCommentusername}
                        </Text>
                        <Text
                            style={{
                                fontSize: 9,
                                marginTop: -2,
                                color: dark ? colors.text : colors.text,
                            }}
                        >
                            {firstCommentfirstname} {firstCommentlastname}
                        </Text>
                        <Text
                            numberOfLines={10}
                            style={{
                                marginTop: 8,
                                color: dark ? colors.text : colors.text,
                            }}
                        >
                            {firstComment}
                        </Text>
                    </View>

                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            flex: 1,
                            // backgroundColor: 'red',
                        }}
                    >
                        <Menu
                            ref={menu2}
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
                                            showMenu2();
                                        }}
                                        style={{
                                            textAlign: 'right',
                                        }}
                                        name='dots-three-vertical'
                                        size={14}
                                        color='black'
                                    />
                                </TouchableOpacity>
                            }
                        >
                            {menuRender()}
                        </Menu>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignSelf: 'baseline',
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                            }}
                        >
                            <AntDesign
                                style={{ marginLeft: 5 }}
                                name='heart'
                                size={18}
                                color='black'
                            />
                        </View>
                    </View>
                    {/* </View> */}
                </View>
            ) : (
                <></>
            )}

            <View
                style={{
                    flexDirection: 'row',
                    //marginTop: 2,
                    marginHorizontal: 10,
                    justifyContent: 'space-evenly',
                    backgroundColor: dark ? '#212121' : '#E2E2FF',
                    // borderColor: '#fff',
                    // borderWidth: 0.15,
                    padding: 3,
                    width: '95%',
                    alignSelf: 'center',
                    borderRadius: 10,
                    paddingHorizontal: 10,
                }}
            >
                <SimpleLineIcons
                    name='emotsmile'
                    size={18}
                    color={dark ? colors.text : colors.text}
                    style={{ alignSelf: 'center', marginRight: 8 }}
                />
                <TextInput
                    onChangeText={setinputcomment}
                    value={inputcomment}
                    maxLength={240}
                    multiline={true}
                    placeholderTextColor={dark ? '#757575' : colors.text}
                    placeholder={'Type your Comment here '}
                    underlineColorAndroid='transparent'
                    style={{
                        marginHorizontal: 2,
                        width: '78%',
                        backgroundColor: 'transparent',
                        fontStyle: 'normal',
                        lineHeight: 30,
                        paddingVertical: 3,
                    }}
                />

                <Ripple
                    onPress={() => {
                        addcomment();
                    }}
                    style={{
                        display: 'flex',
                        // alignContent: 'center',
                        // alignItems: 'center',
                        // backgroundColor: 'red',
                        width: 30,
                        borderRadius: 20,
                        height: '100%',
                    }}
                >
                    <Feather
                        name='send'
                        size={18}
                        color={dark ? colors.text : colors.text}
                        style={{ position: 'absolute', top: '23%' }}
                    />
                </Ripple>
            </View>
            <View
                style={{
                    marginVertical: 7,
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.navigate('AllComments', {
                            image: props.image,
                            comments: fetchedcomments,
                            id: props.id,
                            username: props.username,
                            date: props.date,
                            firstname: props.firstname,
                            lastname: props.lastname,
                            userId: props.userId,
                            profileimage: props.profileimage,
                            caption: props.caption,
                            gosavepost: savePost,
                        });
                    }}
                    activeOpacity={0.5}
                    style={{
                        backgroundColor: dark ? colors.background : colors.card,
                        width: '55%',
                        alignSelf: 'center',
                        borderRadius: 10,
                        height: 29,
                        // borderColor: '#fff',
                        // borderWidth: 0.2,
                        justifyContent: 'center',
                        shadowColor: 'grey',
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowRadius: 2,
                        shadowOpacity: 1.0,
                        elevation: 5,
                    }}
                >
                    <Text
                        numberOfLines={1}
                        style={{
                            padding: 3,
                            color: dark ? colors.text : colors.text,
                            alignSelf: 'center',
                            opacity: 0.7,
                        }}
                    >
                        View all {commentNumber} comments
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 3,
        marginVertical: 3,
        borderRadius: 15,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
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
        flex: 1,
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
        paddingHorizontal: 18,
        //justifyContent: '',
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
    lineStyle: {
        borderWidth: 0.5,
        borderColor: 'black',
        opacity: 0.1,
        marginHorizontal: 20,
        marginTop: 3,
    },
});

export default FeedPost;
