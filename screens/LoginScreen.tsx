import React, { Component, useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    Image,
    TextInput,
    KeyboardAvoidingView,
    Button,
    Keyboard,
    StatusBar,
} from 'react-native';
import 'react-native-gesture-handler';
import baseApi from '../api/baseApi';
import { MaterialIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import * as Google from 'expo-google-app-auth';
import { googleOauth } from '../api/googleOauth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';
const LoginScreen = ({ navigation }: any) => {
    const { colors, dark } = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showpass, setshowpass] = useState(true);

    async function signInWithGoogleAsync() {
        try {
            const result = await Google.logInAsync({
                androidClientId: googleOauth,
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                console.log(result.user.name);
                signInSendToken(String(result.idToken));
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }

    async function signInSendToken(token: String) {
        await baseApi
            .post('accounts/google/', {
                token: token,
            })
            .then(function (response) {
                _savetoken(JSON.stringify(response.data.token));
                _saveuserid();
                navigation.navigate('Main');
            })
            .catch(function (error) {
                console.log('Error', error);
            });
    }

    function EmailSet(enteredEmail: string) {
        setEmail(enteredEmail);
    }
    function PasswordSet(enteredPassword: string) {
        setPassword(enteredPassword);
    }

    async function uservalidation() {
        if (email.includes('@')) {
            baseApi
                .post('accounts/login/', {
                    email: email,
                    password: password,
                })
                .then(function (response) {
                    {
                        _savetoken(JSON.stringify(response.data.token));
                    }
                    {
                        _saveuserid();
                    }

                    navigation.navigate('Main');
                })
                .catch(function (error) {
                    alert('Invalid login credentials');
                });
        } else {
            baseApi
                .post('accounts/login/', {
                    username: email,
                    password: password,
                })
                .then(function (response) {
                    //console.log(response)
                    {
                        _savetoken(JSON.stringify(response.data.token));
                    }
                    {
                        _saveuserid();
                    }
                    navigation.navigate('Main');
                })
                .catch(function (error) {
                    alert('Invalid login credentials');
                });
        }
    }

    const _savetoken = async (response: string) => {
        // console.log(response);
        try {
            //await SecureStore.setItemAsync('mysuperkey', response.toString());
            await AsyncStorage.setItem('mysuperkey', response.toString());
        } catch (error) {
            alert(error + 'insavetoken');
        }
    };

    async function _saveuserid() {
        var value = await AsyncStorage.getItem('mysuperkey');
        //var value = await SecureStore.getItemAsync('myuserid');
        var token = value?.split('"')[1];
        // console.log(token);
        baseApi
            .post('accounts/verify_token/', {
                token: token,
            })
            .then(function (response) {
                //console.log(response)
                var userid = JSON.parse(response.data.login);
                //console.log(userid)
                if (userid != '') {
                    setuserid(userid);
                }
            })
            .catch(function (error) {
                alert(error + 'insaveid');
            });
    }

    const setuserid = async (userid: string) => {
        try {
            await AsyncStorage.setItem('myuserid', userid.toString());
        } catch (error) {
            alert(error + 'insetid');
        }
    };

    function Validation() {
        Keyboard.dismiss();
        if (email == '' || password == '') {
            alert('Enter login credentials');
        } else {
            {
                uservalidation();
            }
        }
    }
    function funshowpass() {
        if (showpass == true) {
            setshowpass(false);
        } else {
            setshowpass(true);
        }
    }

    return (
        <KeyboardAvoidingView style={style.container}>
            <StatusBar
                barStyle={dark ? 'light-content' : 'dark-content'}
                backgroundColor={dark ? '#000' : '#fff'}
            />
            <Image
                style={{
                    width: '100%',
                    height: '100%',
                    opacity: 0.5,
                    position: 'absolute',
                }}
                source={require('../assets/image/gradient.jpg')}
                resizeMode={'stretch'}
            />

            <View style={style.box}>
                <TouchableOpacity>
                    <Image
                        style={style.logo}
                        source={require('../assets/pepsi.png')}
                    />
                </TouchableOpacity>
                <TextInput
                    autoCapitalize='none'
                    autoCorrect={false}
                    placeholder='Email/Username'
                    style={style.input}
                    onChangeText={EmailSet}
                />
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 20,
                        flex: 1,
                        justifyContent: 'center',
                    }}
                >
                    <TextInput
                        secureTextEntry={showpass}
                        autoCapitalize='none'
                        autoCorrect={false}
                        placeholder='Password'
                        style={style.inputusername}
                        onChangeText={PasswordSet}
                    />

                    <TouchableOpacity
                        activeOpacity={100}
                        onPress={funshowpass}
                        style={{
                            borderStartWidth: 0,
                            padding: 10,
                            borderTopRightRadius: 25,
                            borderBottomRightRadius: 25,
                            right: 3,
                            height: 45,
                            shadowColor: 'grey',
                            shadowOffset: {
                                width: 0,
                                height: 0.5,
                            },
                            shadowRadius: 1,
                            shadowOpacity: 1.0,
                        }}
                    >
                        {showpass ? (
                            <MaterialIcons
                                name='visibility'
                                size={22}
                                color='black'
                            />
                        ) : (
                            <MaterialIcons
                                name='visibility-off'
                                size={22}
                                color='black'
                            />
                        )}
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('ForgotPassword');
                    }}
                    style={{
                        marginTop: 15,
                        alignSelf: 'flex-end',
                        marginRight: 25,
                    }}
                >
                    <Text style={{ color: 'blue', fontSize: 12 }}>
                        Forgot password?
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={style.signinbut}
                    onPress={() => {
                        Validation();
                    }}
                >
                    <Text style={{ color: '#fff' }}>SIGN IN</Text>
                </TouchableOpacity>

                <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                    <TouchableOpacity onPress={signInWithGoogleAsync}>
                        <Image
                            style={style.othermethod}
                            source={require('../assets/pepsi.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            style={style.othermethod}
                            source={require('../assets/pepsi.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', marginTop: 35 }}>
                    <Text>Don't have an account? </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUp')}
                    >
                        <Text style={{ color: 'blue' }}>Sign Up Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const style = StyleSheet.create({
    logo: {
        backgroundColor: '#fa1234',
        borderRadius: 40,
        width: 70,
        height: 70,
        marginBottom: 15,
        marginTop: 10,
    },
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
    },
    box: {
        width: '90%',
        height: 440,
        backgroundColor: '#ebf2ff',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    input: {
        marginTop: 11,
        borderColor: 'black',
        //borderWidth: 1,
        shadowColor: 'grey',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowRadius: 2,
        shadowOpacity: 1.0,
        elevation: 2,
        backgroundColor: 'white',
        width: '80%',
        height: 45,
        borderRadius: 23,
        paddingLeft: 12,
    },
    signinbut: {
        backgroundColor: '#484ca5',
        borderRadius: 30,
        marginTop: 25,
        padding: 25,
        height: 20,
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    othermethod: {
        backgroundColor: '#fa1234',
        borderRadius: 30,
        width: 60,
        height: 60,
        margin: 5,
    },
    inputusername: {
        borderColor: 'black',
        backgroundColor: 'white',
        width: '69%',
        height: 45,
        paddingLeft: 12,
        borderTopLeftRadius: 23,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 23,
        borderBottomRightRadius: 0,
        borderRightWidth: 0,
        shadowColor: 'grey',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowRadius: 2,
        shadowOpacity: 1.0,
        elevation: 2,
    },
});

export default LoginScreen;
