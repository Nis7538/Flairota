import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    SafeAreaView,
    Animated,
    Keyboard,
    Dimensions,
    KeyboardAvoidingView,
    StatusBar,
} from 'react-native';

import 'react-native-gesture-handler';
import baseApi from '../api/baseApi';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { BarPasswordStrengthDisplay } from 'react-native-password-strength-meter';
import * as Google from 'expo-google-app-auth';
import axios from 'axios';
import { googleOauth } from '../api/googleOauth';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import { DatePickerModal } from 'react-native-paper-dates';
import { Button } from 'react-native-paper';

import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';

const SignUpScreen = ({ navigation }: any) => {
    let [DOB, setDOB] = useState('');
    var dob: string;
    let { height, width } = Dimensions.get('window');
    const { colors, dark } = useTheme();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [ddd, setDob] = useState(new Date());
    const [number, setNumber] = useState('');
    const [gender, setGender] = useState(0);

    const [checkusernames, setcheckusernames] = useState(true);
    const [icondisplay, seticondisplay] = useState(0);
    const [showpass, setshowpass] = useState(true);
    const [showConfirmPass, setShowConfirmPass] = useState(true);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const [date, setDate] = useState();
    const [month, setMonth] = useState();
    const [year, setYear] = useState();

    async function signInWithGoogleAsync() {
        try {
            const result = await Google.logInAsync({
                androidClientId: googleOauth,
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
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

    async function uservalidation() {
        baseApi
            .post('accounts/signup/', {
                email: email.toString(),
                password: password.toString(),
                username: username.toString(),
                firstname: firstName.toString(),
                lastname: lastName.toString(),
                dob: DOB,
                mobile_no: number,
                gender: gender,
            })
            .then(function (response) {
                console.log(response);
                {
                    _savetoken(JSON.stringify(response.data.key));
                }
                {
                    _saveuserid();
                }
                navigation.navigate('Main');
            })
            .catch(function (error) {
                alert(error);
            });
    }

    async function _saveuserid() {
        let value;
        value = await AsyncStorage.getItem('mysuperkey');
        //var value = await SecureStore.getItemAsync('myuserid');
        console.log(value + ' this is stored token');
        baseApi
            .post('accounts/verify_token/', {
                token: value?.replaceAll('"', ''),
            })
            .then(function (response) {
                // console.log(response)
                var userid = JSON.parse(response.data.login);
                // console.log(userid)
                if (userid != '') {
                    setuserid(userid);
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }

    const setuserid = async (userid: string) => {
        try {
            //await SecureStore.setItemAsync('myuserid', userid);
            await AsyncStorage.setItem('myuserid', userid);
        } catch (error) {
            alert(error);
        }
    };

    const _savetoken = async (response: string) => {
        try {
            await AsyncStorage.setItem('mysuperkey', response);
        } catch (error) {
            alert(error);
        }
    };

    function Validation() {
        Keyboard.dismiss();
        if (username == '') {
            alert('Enter your Username');
        } else if (password == '') {
            alert('Enter Password');
        } else if (username.includes('@')) {
            alert('Avoid using @ in username');
        } else if (checkusernames == false) {
            alert('Username not available');
        } else if (firstName == '') {
            alert('Enter first Name');
        } else if (lastName == '') {
            alert('Enter Last Name');
        } else {
            nextBox();
        }
    }

    function Validation2() {
        Keyboard.dismiss();
        if (email == '') {
            alert('Enter your Email/Number');
        } else if (dob == '') {
            alert('Select DOB');
        } else if (email.includes('@')) {
            uservalidation();
        } else if (gender == 0 || gender > 3) {
            alert('Select Your Gender');
        }
    }

    function nextBox() {
        animatingview();
        animatingview2();
    }

    function checkusername(usernamee: string) {
        setUsername(usernamee);
        baseApi
            .post('accounts/verify_username/', { username: usernamee })
            .then(function (response) {
                //console.log(response)
                //console.log(JSON.stringify(response.data.avaliable) + "ok");
                if (usernamee != '') {
                    seticondisplay(100);
                }
                if (usernamee == '') {
                    seticondisplay(0);
                }

                if (JSON.stringify(response.data.avaliable) == 'true') {
                    const a = true;
                    setcheckusernames(a);
                } else if (JSON.stringify(response.data.avaliable) == 'false') {
                    const b = false;
                    setcheckusernames(b);
                    // console.log(checkusernames)
                }
                if (usernamee.includes('@')) {
                    const b = false;
                    setcheckusernames(b);
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }

    function funshowpass() {
        if (showpass == true) {
            setshowpass(false);
        } else {
            setshowpass(true);
        }
    }

    function funShowConfirmPass() {
        if (showConfirmPass == true) {
            setShowConfirmPass(false);
        } else {
            setShowConfirmPass(true);
        }
    }

    const ani = React.useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    let [a, seta] = useState(0);

    const ani2 = React.useRef(new Animated.Value(0)).current;
    let [b, setb] = useState(0);

    function animatingview() {
        if (a == 0) {
            Animated.timing(ani, {
                toValue: { x: -width, y: 0 },
                duration: 500,
                useNativeDriver: false,
            }).start();
            seta(1);
        } else {
            Animated.timing(ani, {
                toValue: { x: 0, y: 0 },
                delay: 300,
                duration: 800,
                useNativeDriver: false,
            }).start();
            seta(0);
        }
    }

    function animatingview2() {
        if (b == 0) {
            Animated.timing(ani2, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: false,
            }).start();
            setb(1);
        } else {
            Animated.timing(ani2, {
                toValue: 0,
                duration: 1500,
                useNativeDriver: false,
            }).start();
            setb(0);
        }
    }

    const onDismissSingle = React.useCallback(() => {
        setDatePickerVisibility(false);
    }, [setDatePickerVisibility]);

    const onConfirmSingle = React.useCallback(
        (params) => {
            var date = params.date.getDate();
            var month = params.date.getMonth() + 1;
            var year = params.date.getFullYear();
            if (month < 10) month = '0' + month;
            if (date < 10) date = '0' + date;
            dob = `${date}-${month}-${year}`;
            setDatePickerVisibility(false);
            //console.log(dob);
            setDOB((DOB = dob));
            setDate(date);
            setMonth(month);
            setYear(year);
        },
        [setDatePickerVisibility, setDob]
    );

    return (
        <View style={style.container}>
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

            <Animated.View
                key='view1'
                style={[
                    style.box,
                    ani.getLayout(),
                    {
                        marginLeft: width * 0.05,
                        marginTop: (height - 500) * 0.5,
                    },
                ]}
            >
                <TouchableOpacity onPress={() => {}}>
                    <Image
                        style={style.logo}
                        source={require('../assets/pepsi.png')}
                    />
                </TouchableOpacity>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 11,
                        flex: 1,
                        width: '100%',
                        justifyContent: 'center',
                    }}
                >
                    <TextInput
                        autoCapitalize='none'
                        autoCorrect={false}
                        placeholder='Username'
                        style={style.inputusername}
                        onChangeText={(enteredUsername) => {
                            checkusername(enteredUsername);
                        }}
                    />
                    <View
                        style={{
                            padding: 10,
                            borderTopRightRadius: 25,
                            borderBottomRightRadius: 25,
                            right: 3,
                            shadowColor: 'grey',
                            shadowOffset: {
                                width: 0,
                                height: 0.5,
                            },
                            shadowRadius: 1,
                            shadowOpacity: 1.0,
                            elevation: 0.6,
                        }}
                    >
                        {checkusernames ? (
                            <Ionicons
                                style={{ opacity: icondisplay }}
                                name='md-checkmark-circle'
                                size={20}
                                color='green'
                            />
                        ) : (
                            <MaterialIcons
                                style={{ opacity: icondisplay }}
                                name='cancel'
                                size={20}
                                color='red'
                            />
                        )}
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        width: '93%',
                        height: '8%',
                        justifyContent: 'space-around',
                        marginBottom: 12,
                        marginTop: 10,
                    }}
                >
                    <TextInput
                        autoCapitalize='none'
                        autoCorrect={false}
                        placeholder='FirstName'
                        style={[style.input, { width: '45%', height: '100%' }]}
                        onChangeText={setFirstName}
                    />

                    <TextInput
                        autoCapitalize='none'
                        autoCorrect={false}
                        placeholder='LastName'
                        style={[style.input, { width: '45%', height: '100%' }]}
                        onChangeText={setLastName}
                    />
                </View>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 18,
                        flex: 1,
                        width: '100%',
                        justifyContent: 'center',
                    }}
                >
                    <TextInput
                        secureTextEntry={showpass}
                        autoCapitalize='none'
                        autoCorrect={false}
                        placeholder='Password'
                        style={style.inputusername}
                        onChangeText={(enteredPassword) => {
                            setPassword(enteredPassword);
                        }}
                    />
                    <TouchableOpacity
                        activeOpacity={100}
                        onPress={funshowpass}
                        style={{
                            padding: 10,
                            borderTopRightRadius: 25,
                            borderBottomRightRadius: 25,
                            right: 3,
                            shadowColor: 'grey',
                            shadowOffset: {
                                width: 0,
                                height: 0.5,
                            },
                            shadowRadius: 1,
                            shadowOpacity: 1.0,
                            elevation: 0.6,
                            backgroundColor: 'white',
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

                <SafeAreaView style={{ marginTop: 6 }}>
                    <BarPasswordStrengthDisplay
                        width={250}
                        password={password}
                    />
                </SafeAreaView>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 14,
                        flex: 1,
                        width: '100%',
                        justifyContent: 'center',
                    }}
                >
                    <TextInput
                        secureTextEntry={showConfirmPass}
                        autoCapitalize='none'
                        autoCorrect={false}
                        placeholder='Confirm Password'
                        style={style.inputusername}
                        onChangeText={(enteredPassword) => {
                            setConfirmPassword(enteredPassword);
                        }}
                    />
                    <TouchableOpacity
                        activeOpacity={100}
                        onPress={funShowConfirmPass}
                        style={{
                            padding: 10,
                            borderTopRightRadius: 25,
                            borderBottomRightRadius: 25,
                            right: 3,
                            shadowColor: 'grey',
                            shadowOffset: {
                                width: 0,
                                height: 0.5,
                            },
                            shadowRadius: 1,
                            shadowOpacity: 1.0,
                            elevation: 0.6,
                            backgroundColor: 'white',
                        }}
                    >
                        {showConfirmPass ? (
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

                <TouchableOpacity style={style.signupbut} onPress={Validation}>
                    <Text style={{ color: '#fff' }}>Next{'    '}</Text>
                </TouchableOpacity>

                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginTop: 10,
                        marginBottom: 4,
                    }}
                >
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
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginTop: 8,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Text>Already have an account? </Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Login');
                        }}
                    >
                        <Text style={{ color: 'blue' }}>Login Now</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
            {/* //-------------------------------------------------------------------------------------------------------------------- */}
            <Animated.View
                key='view2'
                style={[
                    style.box2,
                    { marginLeft: width * 0.05, opacity: ani2 },
                ]}
            >
                <TouchableOpacity
                    onPress={() => {
                        animatingview();
                        animatingview2();
                    }}
                >
                    <Image
                        style={style.logo}
                        source={require('../assets/pepsi.png')}
                    />
                </TouchableOpacity>

                <TextInput
                    autoCapitalize='none'
                    autoCorrect={false}
                    placeholder='Email'
                    style={[style.input, { height: 40 }]}
                    onChangeText={(enteredEmail) => {
                        setEmail(enteredEmail);
                    }}
                />
                <TextInput
                    autoCapitalize='none'
                    autoCorrect={false}
                    placeholder='PhoneNumber'
                    style={[style.input, { height: 40 }]}
                    keyboardType={'name-phone-pad'}
                    onChangeText={setNumber}
                />

                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 12,
                        marginVertical: 8,
                    }}
                >
                    <Button
                        onPress={() => {
                            setGender(1);
                        }}
                        uppercase={false}
                        mode='outlined'
                        color={gender == 1 ? 'white' : '#484ca5'}
                        style={{
                            borderRadius: 20,
                            shadowColor: 'grey',
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowRadius: 2,
                            shadowOpacity: 1.0,
                            elevation: 1,
                            backgroundColor: gender == 1 ? '#484ca5' : 'white',
                            marginHorizontal: 7,
                        }}
                    >
                        Male
                    </Button>
                    <Button
                        onPress={() => {
                            setGender(2);
                        }}
                        uppercase={false}
                        mode='outlined'
                        color={gender == 2 ? 'white' : '#484ca5'}
                        style={{
                            borderRadius: 20,
                            shadowColor: 'grey',
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowRadius: 2,
                            shadowOpacity: 1.0,
                            elevation: 1,
                            backgroundColor: gender == 2 ? '#484ca5' : 'white',
                            marginHorizontal: 7,
                        }}
                    >
                        Female
                    </Button>
                    <Button
                        onPress={() => {
                            setGender(3);
                        }}
                        uppercase={false}
                        mode='outlined'
                        color={gender == 3 ? 'white' : '#484ca5'}
                        style={{
                            borderRadius: 20,
                            shadowColor: 'grey',
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowRadius: 2,
                            shadowOpacity: 1.0,
                            elevation: 1,
                            backgroundColor: gender == 3 ? '#484ca5' : 'white',
                            marginHorizontal: 7,
                        }}
                    >
                        Others
                    </Button>
                </View>

                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 12,
                        alignItems: 'center',
                        marginVertical: 8,
                    }}
                >
                    <View
                        style={{
                            justifyContent: 'space-between',
                            display: 'flex',
                            flex: 1,
                            marginHorizontal: '10%',
                            flexDirection: 'row',
                        }}
                    >
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                            {date}
                        </Text>
                        <Text>
                            {'  '}/{'  '}
                        </Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                            {month}
                        </Text>
                        <Text>
                            {'  '}/{'  '}
                        </Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                            {year}
                        </Text>
                    </View>
                    <Button
                        onPress={() => setDatePickerVisibility(true)}
                        uppercase={false}
                        mode='outlined'
                        style={{
                            borderRadius: 20,
                            marginRight: '8%',
                            shadowColor: 'grey',
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowRadius: 2,
                            shadowOpacity: 1.0,
                            elevation: 1,
                            backgroundColor: 'white',
                        }}
                    >
                        Pick DOB
                    </Button>
                    <DatePickerModal
                        // locale={'en'} optional, default: automatic
                        mode='single'
                        visible={isDatePickerVisible}
                        onDismiss={onDismissSingle}
                        date={dob}
                        onConfirm={onConfirmSingle}
                        validRange={{
                            startDate: new Date(1921, 1, 1),
                            endDate: new Date(),
                        }}
                    />
                </View>

                <TouchableOpacity
                    style={style.signupbut}
                    onPress={() => {
                        if (password != confirmPassword) {
                            alert('Password and Confirm Password mismatch');
                            return;
                        }
                        Validation2();
                    }}
                >
                    <Text style={{ color: '#fff' }}>SIGN UP</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

const style = StyleSheet.create({
    logo: {
        backgroundColor: '#fa1234',
        borderRadius: 40,
        width: 60,
        height: 60,
        marginBottom: 15,
        marginTop: 10,
    },
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        // flex: 1,
        // paddingLeft: 15,
        // paddingRight: 15,
    },
    box: {
        width: '90%',
        height: 500,
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        position: 'absolute',
    },
    box2: {
        width: '90%',
        height: 420,
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        position: 'absolute',
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
        width: '90%',
        height: '8%',
        borderRadius: 15,
        paddingLeft: 12,
        marginBottom: 8,
    },
    inputusername: {
        borderColor: 'black',
        backgroundColor: 'white',
        width: '77%',
        height: '100%',
        paddingLeft: 12,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 15,
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
    coninput: {
        marginTop: 13,
        borderColor: 'black',
        backgroundColor: 'white',
        width: '90%',
        height: '8%',
        borderRadius: 15,
        paddingLeft: 8,
        shadowColor: 'grey',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowRadius: 2,
        shadowOpacity: 1.0,
        elevation: 5,
    },
    signupbut: {
        backgroundColor: '#484ca5',
        borderRadius: 30,
        marginTop: 17,
        padding: 20,
        height: 45,
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    othermethod: {
        backgroundColor: '#fa1234',
        borderRadius: 30,
        width: 50,
        height: 50,
        margin: 5,
    },
});

export default SignUpScreen;
