import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import CircleImage from './CircleImage';
import ClickedProfileScreen from '../screens/ClickedProfileScreen';
import Ripple from 'react-native-material-ripple';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseImageUrl } from '../images/imageBaseUrl';
import Svg, { SvgProps, Path, Circle, G } from 'react-native-svg';
import { useTheme } from '@react-navigation/native';

const TrendingPostComponent = (props: any) => {
    const { colors, dark } = useTheme();
    let [userId, setUserId] = useState();
    //console.log(props.navigation);
    //console.log(props.userid);

    useEffect(() => {
        getUserId();
    }, [userId]);

    async function getUserId() {
        setUserId((userId = await AsyncStorage.getItem('myuserid')));
    }

    return (
        <View
            style={[
                styles.card,
                {
                    backgroundColor: dark
                        ? colors.background
                        : colors.background,
                },
            ]}
        >
            <Ripple
                style={{ height: '72%', borderRadius: 15 }}
                onPress={() => {
                    props.navigation.navigate('ExploreRedirectPost', {
                        title: 'Explore',
                        id: props.id,
                    });
                }}
            >
                <Image
                    style={styles.feedImage}
                    source={
                        props.imagepost
                            ? { uri: props.imagepost }
                            : require('../assets/qqq.jpeg')
                    }
                    resizeMode='stretch'
                />
            </Ripple>
            <View
                style={{
                    display: 'flex',
                    flex: 1,
                }}
            >
                <Ripple
                    onPress={() => {
                        //console.log(props.userid);
                        if (props.userid == userId) {
                            props.navigation.navigate('Profile');
                        } else {
                            props.navigation.navigate('ClickedProfile', {
                                userid: props.userid,
                            });
                        }
                    }}
                    style={styles.cardHeader}
                >
                    <View
                        style={{
                            flexDirection: 'column',
                            marginEnd: 5,
                            maxWidth: '70%',
                        }}
                    >
                        <Text
                            numberOfLines={1}
                            style={{
                                fontSize: 13,
                                paddingLeft: 5,
                                color: dark ? colors.text : colors.text,
                            }}
                        >
                            {props.username ? props.username : 'USERNAME'}
                        </Text>
                        <Text
                            numberOfLines={1}
                            style={[
                                styles.userName,
                                { color: dark ? colors.text : colors.text },
                            ]}
                        >
                            {props.firstname ? props.firstname : 'Programmer'}
                            {/* {'\n'} */}{' '}
                            {props.lastname ? props.lastname : 'Gaurav'}
                        </Text>
                    </View>

                    {props.userimage.slice(props.userimage.length - 4) !=
                    'null' ? (
                        <Image
                            style={styles.userImage}
                            source={{ uri: props.userimage }}
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
                </Ripple>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        marginVertical: 6,
        borderRadius: 15,
        width: '31%',
        height: 160,
        shadowColor: 'grey',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowRadius: 2,
        shadowOpacity: 1.0,
        elevation: 5,
    },
    cardHeader: {
        paddingHorizontal: 3,
        width: '100%',
        maxWidth: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        alignItems: 'center',
        //backgroundColor: 'red',
    },
    headerLeft: {
        flexDirection: 'row',
    },
    userImage: {
        width: 23,
        height: 23,
        borderRadius: 20,
        right: 5,
        marginLeft: 5,
    },
    userName: {
        fontSize: 9,
        maxWidth: '100%',
        paddingLeft: 5,
    },

    feedImage: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor: 'black',
        opacity: 0.1,
        marginHorizontal: 10,
        marginTop: 3,
    },
});

export default TrendingPostComponent;
