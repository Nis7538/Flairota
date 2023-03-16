import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    StatusBar,
    Switch,
    Image,
    Button,
    Dimensions,
} from 'react-native';
import Header from '../Components/Header';
import {
    MaterialIcons,
    Ionicons,
    Entypo,
    EvilIcons,
    MaterialCommunityIcons,
    FontAwesome,
    AntDesign,
} from '@expo/vector-icons';
import {
    ScrollView,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Ripple from 'react-native-material-ripple';
import { color } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    StackActions,
    useNavigation,
    useTheme,
} from '@react-navigation/native';
import { EventRegister } from 'react-native-event-listeners';
import { Modalize } from 'react-native-modalize';
import baseApi from '../api/baseApi';

const SettingScreen = () => {
    const { colors, dark } = useTheme();
    const [isEnabled, setIsEnabled] = useState(false);
    //const toggleSwitch = () => setIsEnabled((isEnabled) => !isEnabled);

    const navigation = useNavigation();
    const modalizeRef = useRef<Modalize>(null);

    const [showOldPass, setShowOldPass] = useState(true);
    const [showNewPass, setShowNewPass] = useState(true);
    const [showConfirmNewPass, setShowConfirmNewPass] = useState(true);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const onOpen = () => {
        modalizeRef.current?.open();
    };
    const onClose = () => {
        modalizeRef.current?.close();
    };
    let { height, width } = Dimensions.get('window');

    useEffect(() => {
        if (dark == true) {
            theme();
        }
    }, [isEnabled]);

    async function theme() {
        setIsEnabled(true);
    }

    const validation = () => {
        if (oldPassword == '') {
            alert('Fill Old Password Field');
        } else if (newPassword == '') {
            alert('Fill New Password Field');
        } else if (confirmNewPassword == '') {
            alert('Fill Confirm New Password Field');
        }
    };

    async function changePassword() {
        var value = await AsyncStorage.getItem('mysuperkey');
        await baseApi
            .post('/accounts/change_password/', {
                token: value?.split('"')[1],
                password: oldPassword,
                newpassword: newPassword,
            })
            .then(function (response) {
                if (response.data.changed) {
                    setOldPassword('');
                    setNewPassword('');
                    setConfirmNewPassword('');
                    modalizeRef.current?.close();
                    alert('Password Changed Successfully');
                } else {
                    alert('Password does not match');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <View
            style={{
                backgroundColor: dark ? colors.primary : colors.background,
                height: '100%',
                display: 'flex',
                alignContent: 'center',
            }}
        >
            <StatusBar
                barStyle={dark ? 'light-content' : 'dark-content'}
                backgroundColor={dark ? '#000' : '#fff'}
            />

            <Modalize
                ref={modalizeRef}
                overlayStyle={{
                    backgroundColor: '#00000080',
                    height: '100%',
                }}
                modalStyle={{
                    margin: 20,
                    backgroundColor: '#cac9dd',
                    borderRadius: 20,
                    shadowOpacity: 0,
                    display: 'flex',
                    flex: 1,
                }}
                handleStyle={{
                    width: 150,
                    backgroundColor: '#b0afbc',
                }}
                modalHeight={height - height * 0.5}
                handlePosition={'outside'}
                openAnimationConfig={{
                    timing: { duration: 400 },
                    spring: { speed: 20, bounciness: 10 },
                }}
                closeAnimationConfig={{
                    timing: { duration: 400 },
                }}
            >
                <View style={{ padding: 25 }}>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: 22,
                            marginBottom: 15,
                        }}
                    >
                        Change Password
                    </Text>
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
                            style={{
                                width: '82%',
                                height: 40,
                                borderTopLeftRadius: 15,
                                borderBottomLeftRadius: 15,
                                backgroundColor: '#fff',
                                color: '#000',
                                marginBottom: 10,
                                paddingHorizontal: 5,
                            }}
                            placeholder='Old Password'
                            placeholderTextColor='grey'
                            onChangeText={(enteredText) =>
                                setOldPassword(enteredText)
                            }
                            autoCapitalize='none'
                            autoCorrect={false}
                            secureTextEntry={showOldPass}
                        />
                        <TouchableOpacity
                            activeOpacity={100}
                            onPress={() => setShowOldPass(!showOldPass)}
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
                                height: 40,
                                backgroundColor: 'white',
                            }}
                        >
                            {showOldPass ? (
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
                    {/* <Text>New Password</Text> */}
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
                            style={{
                                width: '82%',
                                height: 40,
                                borderTopLeftRadius: 15,
                                borderBottomLeftRadius: 15,
                                backgroundColor: '#fff',
                                color: '#000',
                                marginBottom: 10,
                                paddingHorizontal: 5,
                            }}
                            placeholder='New Password'
                            placeholderTextColor='grey'
                            onChangeText={(enteredText) =>
                                setNewPassword(enteredText)
                            }
                            autoCapitalize='none'
                            autoCorrect={false}
                            secureTextEntry={showNewPass}
                        />
                        <TouchableOpacity
                            activeOpacity={100}
                            onPress={() => setShowNewPass(!showNewPass)}
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
                                height: 40,
                                backgroundColor: 'white',
                            }}
                        >
                            {showNewPass ? (
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
                    {/* <Text>Confirm New Password</Text> */}
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
                            style={{
                                width: '82%',
                                height: 40,
                                borderTopLeftRadius: 15,
                                borderBottomLeftRadius: 15,
                                backgroundColor: '#fff',
                                color: '#000',
                                marginBottom: 10,
                                paddingHorizontal: 5,
                            }}
                            placeholder='Confirm New Password'
                            placeholderTextColor='grey'
                            onChangeText={(enteredText) =>
                                setConfirmNewPassword(enteredText)
                            }
                            autoCapitalize='none'
                            autoCorrect={false}
                            secureTextEntry={showConfirmNewPass}
                        />
                        <TouchableOpacity
                            activeOpacity={100}
                            onPress={() =>
                                setShowConfirmNewPass(!showConfirmNewPass)
                            }
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
                                height: 40,
                                backgroundColor: 'white',
                            }}
                        >
                            {showConfirmNewPass ? (
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
                        style={{
                            alignSelf: 'center',
                            backgroundColor: '#fa1234',
                            borderRadius: 30,
                            marginTop: 10,
                            padding: 25,
                            height: '2%',
                            width: '70%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={() => {
                            if (newPassword != confirmNewPassword) {
                                alert(
                                    'New Password and Confirm New Password Mismatch'
                                );
                                return;
                            }
                            validation();
                            changePassword();
                        }}
                    >
                        <Text style={{ color: '#fff' }}>Change Password</Text>
                    </TouchableOpacity>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            navigation.navigate('ForgotPassword');
                        }}
                    >
                        <Text
                            style={{
                                color: 'blue',
                                fontSize: 14,
                                textAlign: 'center',
                                marginTop: 40,
                            }}
                        >
                            Forgot Password ?
                        </Text>
                    </TouchableWithoutFeedback>
                </View>
            </Modalize>

            <View
                style={{
                    width: '100%',
                    alignItems: 'center',
                    marginTop: 10,
                }}
            >
                <Text
                    style={{
                        fontSize: 27,
                        fontWeight: 'bold',
                        color: dark ? colors.text : '#000',
                    }}
                >
                    Settings
                </Text>
            </View>

            <View
                style={[styles.line, { marginTop: 6, marginHorizontal: '4%' }]}
            ></View>

            {/* ..................................................................... */}

            <ScrollView
                style={{
                    display: 'flex',
                    alignContent: 'center',
                    marginBottom: 10,
                }}
                showsVerticalScrollIndicator={false}
            >
                <View
                    style={{
                        display: 'flex',
                        paddingHorizontal: 20,
                        paddingTop: 15,
                    }}
                >
                    <View
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            height: 55,
                            backgroundColor: '#E2E2FF',
                            borderRadius: 25,

                            paddingVertical: 13,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 17,
                                paddingHorizontal: 20,
                            }}
                        >
                            Account
                        </Text>
                    </View>
                    <View
                        style={{
                            // marginHorizontal: 18,
                            marginVertical: 5,
                            marginBottom: 40,
                            marginRight: 18,
                        }}
                    >
                        <Ripple
                            onPress={() => {
                                onOpen();
                            }}
                            rippleContainerBorderRadius={20}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: 10,
                                paddingHorizontal: 18,
                            }}
                        >
                            <MaterialIcons
                                name='track-changes'
                                size={27}
                                color='red'
                            />
                            <Text
                                style={{
                                    marginLeft: 14,
                                    fontSize: 14,
                                    color: dark ? colors.text : '#000',
                                }}
                            >
                                Change Password
                            </Text>

                            <EvilIcons
                                style={{
                                    marginTop: 3,
                                    right: 0,
                                    position: 'absolute',
                                }}
                                name='chevron-right'
                                size={35}
                                color='grey'
                            />
                        </Ripple>

                        <Ripple
                            rippleContainerBorderRadius={20}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: 12,
                                paddingHorizontal: 18,
                            }}
                        >
                            <MaterialIcons
                                name='online-prediction'
                                size={27}
                                color='green'
                            />
                            <Text
                                style={{
                                    marginLeft: 14,
                                    fontSize: 14,
                                    color: dark ? colors.text : '#000',
                                }}
                            >
                                Current Status
                            </Text>

                            <EvilIcons
                                style={{
                                    marginTop: 3,
                                    right: 0,
                                    position: 'absolute',
                                }}
                                name='chevron-right'
                                size={35}
                                color='grey'
                            />
                        </Ripple>
                        <Ripple
                            rippleContainerBorderRadius={20}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: 10,
                                paddingHorizontal: 18,
                            }}
                        >
                            <Ionicons
                                name='lock-closed'
                                size={27}
                                color='white'
                            />
                            <Text
                                style={{
                                    marginLeft: 14,
                                    fontSize: 14,
                                    color: dark ? colors.text : '#000',
                                }}
                            >
                                Deactivate Account
                            </Text>

                            <EvilIcons
                                style={{
                                    marginTop: 3,
                                    right: 0,
                                    position: 'absolute',
                                }}
                                name='chevron-right'
                                size={35}
                                color='grey'
                            />
                        </Ripple>

                        <Ripple
                            rippleContainerBorderRadius={20}
                            onPress={() => {
                                navigation.navigate('EditProfile');
                            }}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: 10,
                                paddingHorizontal: 18,
                            }}
                        >
                            <AntDesign
                                name='deleteuser'
                                size={27}
                                color='white'
                            />
                            <Text
                                style={{
                                    marginLeft: 14,
                                    fontSize: 14,
                                    color: dark ? colors.text : '#000',
                                }}
                            >
                                Edit Profile
                            </Text>

                            <EvilIcons
                                style={{
                                    marginTop: 3,
                                    right: 0,
                                    position: 'absolute',
                                }}
                                name='chevron-right'
                                size={35}
                                color='grey'
                            />
                        </Ripple>
                    </View>

                    {/* ..................................................... */}

                    <View
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            height: 55,
                            backgroundColor: '#E2E2FF',
                            borderRadius: 25,
                            marginBottom: 10,
                            paddingVertical: 13,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 17,
                                paddingHorizontal: 20,
                            }}
                        >
                            Notification
                        </Text>
                    </View>

                    {/* .......................................... */}

                    <View
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            height: 55,
                            backgroundColor: '#E2E2FF',
                            borderRadius: 25,
                            paddingVertical: 13,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 17,
                                paddingHorizontal: 20,
                            }}
                        >
                            Theme
                        </Text>
                    </View>
                    <View
                        style={{
                            //marginHorizontal: 18,
                            marginTop: 5,
                            marginBottom: 40,
                            marginRight: 18,
                        }}
                    >
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                alignContent: 'center',
                                marginBottom: 4,
                                paddingVertical: 5,
                                paddingHorizontal: 18,
                            }}
                        >
                            <MaterialIcons
                                name='highlight'
                                size={36}
                                color='white'
                            />
                            <Text
                                style={{
                                    marginLeft: 14,
                                    fontSize: 14,
                                    color: dark ? colors.text : '#000',
                                }}
                            >
                                Dark Mode
                            </Text>
                            <Switch
                                style={{
                                    height: 14,
                                    position: 'absolute',
                                    right: 0,
                                }}
                                trackColor={{
                                    false: '#767577',
                                    true: '#81b0ff',
                                }}
                                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                                onValueChange={() => {
                                    setIsEnabled(!isEnabled);
                                    EventRegister.emit(
                                        'changeThemeEvent',
                                        isEnabled
                                    );
                                }}
                                value={isEnabled}
                            />
                        </View>
                    </View>

                    {/* .......................................................... */}

                    <View
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            height: 55,
                            backgroundColor: '#E2E2FF',
                            borderRadius: 25,
                            marginBottom: 10,
                            paddingVertical: 13,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 17,
                                paddingHorizontal: 20,
                            }}
                        >
                            Others
                        </Text>
                    </View>

                    {/* ...................................................... */}

                    <View
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            height: 55,
                            backgroundColor: '#E2E2FF',
                            borderRadius: 25,
                            paddingVertical: 13,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                paddingHorizontal: 20,
                            }}
                        >
                            Regarding Us
                        </Text>
                    </View>
                    <View
                        style={{
                            // marginHorizontal: 18,
                            marginVertical: 5,
                            marginBottom: 40,
                            marginRight: 18,
                        }}
                    >
                        <Ripple
                            rippleContainerBorderRadius={20}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: 10,
                                paddingHorizontal: 18,
                            }}
                        >
                            <FontAwesome name='bug' size={27} color='white' />
                            <Text
                                style={{
                                    marginLeft: 14,
                                    fontSize: 14,
                                    color: dark ? colors.text : '#000',
                                }}
                            >
                                Report Bug
                            </Text>

                            <EvilIcons
                                style={{
                                    marginTop: 3,
                                    right: 0,
                                    position: 'absolute',
                                }}
                                name='chevron-right'
                                size={35}
                                color='grey'
                            />
                        </Ripple>

                        {/* <View
                        style={[
                            styles.line,
                            { marginTop: 6, marginLeft: 40, marginRight: 12 },
                        ]}
                    ></View> */}

                        <Ripple
                            rippleContainerBorderRadius={20}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: 10,
                                paddingHorizontal: 18,
                            }}
                        >
                            <MaterialCommunityIcons
                                name='emoticon-cool-outline'
                                size={27}
                                color='white'
                            />
                            <Text
                                style={{
                                    marginLeft: 14,
                                    fontSize: 14,
                                    color: dark ? colors.text : '#000',
                                }}
                            >
                                About Us
                            </Text>

                            <EvilIcons
                                style={{
                                    marginTop: 3,
                                    right: 0,
                                    position: 'absolute',
                                }}
                                name='chevron-right'
                                size={35}
                                color='grey'
                            />
                        </Ripple>
                    </View>

                    <View
                        style={{
                            width: '80%',

                            alignSelf: 'center',
                        }}
                    >
                        <Ripple
                            onPress={() => {
                                AsyncStorage.clear();
                                setTimeout(() => {
                                    navigation.navigate('Home');
                                }, 3000);
                            }}
                            style={{
                                width: '100%',
                                alignSelf: 'center',
                                alignContent: 'center',
                                backgroundColor: '#484ca5',
                                borderRadius: 10,
                                height: 50,
                                marginTop: 15,
                                marginBottom: 15,
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Text style={{ color: '#fff', fontSize: 20 }}>
                                    Sign out
                                </Text>
                            </View>
                        </Ripple>
                    </View>
                </View>
            </ScrollView>
            {/* signout */}
        </View>
    );
};

const styles = StyleSheet.create({
    line: {
        backgroundColor: 'black',
        height: 1,
        opacity: 0.2,
    },
});

export default SettingScreen;
