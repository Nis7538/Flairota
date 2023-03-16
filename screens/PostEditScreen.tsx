import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StatusBar,
} from 'react-native';
import baseApi from '../api/baseApi';

const PostEditScreen = (props: any, navigation: any) => {
    // useEffect(() => {
    //     var value = String(AsyncStorage.getItem('mysuperkey'));
    // }, [])

    const [caption, setcaption] = useState(String(props.route.params.caption));
    const [id, setid] = useState(props.route.params.postId);

    async function saveUserPost() {
        var value = await AsyncStorage.getItem('mysuperkey');
        // console.log(caption);
        // console.log(value);
        // console.log(value?.split('"')[1]);
        // console.log('..........................................');
        // console.log(props.route.params.postId);
        await baseApi
            .post('posts/editpost/'.concat(id, '/'), {
                caption: caption,
                token: value?.split('"')[1],
            })
            .then(function (response) {
                //console.log(response.data);
                if (response) {
                    console.log(props.route.params.navigation);
                    props.route.params.navigation.goBack();
                }
            })
            .catch(function (error) {
                console.log('Error', error);
            });
    }
    const { colors, dark } = useTheme();
    return (
        <View style={{ height: '100%', backgroundColor: '#ececec' }}>
            <StatusBar
                barStyle={dark ? 'light-content' : 'dark-content'}
                backgroundColor={dark ? '#000' : '#fff'}
            />
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.back}
                    onPress={() => {
                        props.route.params.navigation.goBack();
                    }}
                >
                    <Text
                        style={{
                            color: 'grey',
                            fontWeight: 'bold',
                            fontSize: 18,
                        }}
                    >
                        Cancel
                    </Text>
                </TouchableOpacity>
                <Text style={styles.headerName}>Edit Profile</Text>
                <TouchableOpacity style={styles.save} onPress={saveUserPost}>
                    <Text
                        style={{
                            color: 'blue',
                            fontWeight: 'bold',
                            fontSize: 18,
                        }}
                    >
                        Save
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.imageContainer}>
                <View style={styles.userImage}>
                    <Image
                        style={{ width: '100%', height: '100%' }}
                        resizeMode={'stretch'}
                        source={require('../assets/image/7.jpg')}
                    />
                </View>
            </View>
            <View style={styles.profileDetails}>
                <View
                    style={{
                        display: 'flex',
                        width: '98%',
                    }}
                >
                    <Text
                        style={{
                            color: 'grey',
                            fontWeight: 'bold',
                            fontSize: 16,
                        }}
                    >
                        Caption :
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 8,
                        }}
                    >
                        <TextInput
                            multiline={true}
                            numberOfLines={8}
                            autoCapitalize='none'
                            autoCorrect={false}
                            placeholder='Caption'
                            value={caption}
                            onChangeText={setcaption}
                            style={styles.inputusername}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        width: '100%',
        height: '100%',
    },
    header: {
        marginTop: 30,
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
        width: '60%',
        fontWeight: 'bold',
    },
    back: {
        justifyContent: 'flex-start',
        width: '20%',
        alignSelf: 'center',
        marginStart: 10,
    },
    save: {
        justifyContent: 'flex-end',
        width: '20%',
        alignSelf: 'center',
        marginEnd: 10,
        textAlign: 'right',
    },

    accountName: {
        width: '60%',
        height: '90%',
        justifyContent: 'center',
    },
    imageContainer: {
        width: '100%',
        height: 250,
        backgroundColor: 'white',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ececec',
    },
    userImage: {
        width: 190,
        height: 190,
        borderRadius: 20,
        overflow: 'hidden',
        alignSelf: 'center',
    },
    profileDetails: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        flex: 1,
    },
    inputusername: {
        borderWidth: 1,
        borderColor: 'grey',
        height: 80,
        borderRadius: 8,
        width: '100%',
        fontSize: 16,
        padding: 7,
    },
});

export default PostEditScreen;
