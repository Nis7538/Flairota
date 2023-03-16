import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    Platform,
} from 'react-native';
import {
    ScrollView,
    TextInput,
    TouchableOpacity,
} from 'react-native-gesture-handler';
import Ripple from 'react-native-material-ripple';
import { Card } from 'react-native-paper';

import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import baseApi from '../api/baseApi';
import {
    useNavigation,
    StackActions,
    useTheme,
} from '@react-navigation/native';

const Camera = (props: any) => {
    const navigation = useNavigation();

    const [caption, setcaption] = useState('');

    const [type, setType] = useState('');

    // console.log(props);

    let [selectedImage, setSelectedImage] = React.useState(null);

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });
        if (pickerResult.cancelled === true) {
            return;
        }

        setSelectedImage({ localUri: pickerResult.uri });
    };

    async function uploadpost() {
        //console.log(caption)00
        var value = await AsyncStorage.getItem('mysuperkey');
        //var value = await SecureStore.getItemAsync('myuserid');
        //console.log(value);
        var img = String(selectedImage.localUri);
        // console.log(selectedImage);
        //console.log(img);
        let form_data = new FormData();
        form_data.append('image', {
            uri: Platform.OS == 'android' ? img : img.replace(`file:/`, ''),
            type: 'image/jpg',
            name: 'image.jpg',
        });
        form_data.append('token', value?.split('"')[1]);
        form_data.append('caption', caption);
        // console.log(img);
        fetch('https://memeapp-backend.herokuapp.com/api/posts/upload/', {
            method: 'POST',
            headers: {
                'content-type': 'multipart/form-data',
            },
            body: form_data,
        })
            .then((res) => {
                setSelectedImage(null);
                navigation.dispatch(StackActions.pop(1));
                navigation.dispatch(StackActions.push('Main'));
            })
            .catch((error) => {
                alert(error);
            });
    }

    async function uploadStory() {
        var value = await AsyncStorage.getItem('mysuperkey');
        var img = String(selectedImage.localUri);
        let form_data = new FormData();
        console.log(img);
        form_data.append('image', {
            uri: Platform.OS == 'android' ? img : img.replace(`file:/`, ''),
            type: 'image/jpg',
            name: 'image.jpg',
        });
        form_data.append('token', value?.split('"')[1]);
        fetch('https://memeapp-backend.herokuapp.com/api/posts/poststory/', {
            method: 'POST',
            headers: {
                'content-type': 'multipart/form-data',
            },
            body: form_data,
        })
            .then((res) => {
                console.log(res);
                setSelectedImage(null);
                navigation.dispatch(StackActions.pop(1));
                navigation.dispatch(StackActions.push('Main'));
            })
            .catch((error) => {
                alert(error);
            });
        console.log(form_data);
    }

    function funsetcaption(captiongot: string) {
        setcaption(captiongot);
    }
    const { colors, dark } = useTheme();

    if (selectedImage !== null) {
        return (
            <View
                style={[
                    styles.container,
                    { backgroundColor: dark ? colors.primary : colors.primary },
                ]}
            >
                <StatusBar
                    barStyle={dark ? 'light-content' : 'dark-content'}
                    backgroundColor={dark ? '#000' : '#fff'}
                />
                <ScrollView>
                    <Image
                        resizeMode='stretch'
                        source={{ uri: selectedImage.localUri }}
                        style={styles.thumbnail}
                    />
                    {/* <Text style={{ color: '#fff' }}>We got the photo</Text> */}

                    <TextInput
                        onChangeText={funsetcaption}
                        placeholder='Enter the caption'
                        placeholderTextColor={dark ? colors.text : colors.text}
                        style={{
                            width: '90%',
                            height: 100,
                            color: dark ? colors.text : colors.text,
                            padding: 10,
                            //backgroundColor: 'red',
                            marginTop: '8%',
                            alignSelf: 'center',
                            borderWidth: 0.3,
                            borderColor: dark ? colors.text : colors.text,
                            borderRadius: 5,
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                        }}
                    />
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                            // backgroundColor: 'red',
                            marginTop: '8%',
                            height: 60,
                            justifyContent: 'space-evenly',
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedImage(null);
                            }}
                            style={{
                                backgroundColor: '#ececec',
                                width: 150,
                                borderRadius: 15,
                                height: 45,
                                padding: 10,
                                justifyContent: 'center',
                            }}
                        >
                            <Text
                                style={{ color: '#000', textAlign: 'center' }}
                            >
                                cancel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                if (type == 'post') {
                                    uploadpost();
                                } else if (type == 'story') {
                                    uploadStory();
                                }
                            }}
                            style={{
                                backgroundColor: '#484ca5',
                                width: 150,
                                height: 45,
                                borderRadius: 15,
                                padding: 10,
                                justifyContent: 'center',
                            }}
                        >
                            <Text
                                style={{ color: '#fff', textAlign: 'center' }}
                            >
                                Post
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
    //{navigation.navigate('Display')}
    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={dark ? 'light-content' : 'dark-content'}
                backgroundColor={dark ? '#000' : '#fff'}
            />
            <View style={styles.mini}>
                <Ripple
                    style={styles.gallery}
                    onPress={() => {
                        setType('post');
                        openImagePickerAsync();
                    }}
                >
                    <Card>
                        <Card.Cover source={require('../assets/pepsi.png')} />
                    </Card>
                </Ripple>
                <Ripple
                    style={styles.templates}
                    onPress={() => {
                        setType('story');
                        openImagePickerAsync();
                    }}
                >
                    <Card>
                        <Card.Cover source={require('../assets/pepsi.png')} />
                    </Card>
                </Ripple>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 50,
        width: 200,
        backgroundColor: '#fff',
        marginTop: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
    },
    mini: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    gallery: {
        alignSelf: 'center',
        width: '50%',
    },
    templates: {
        alignSelf: 'center',
        width: '50%',
        marginTop: 25,
    },
    thumbnail: {
        width: '98%',
        height: 350,
        borderRadius: 15,
        alignSelf: 'center',
        marginTop: '8%',
    },
});

export default Camera;
