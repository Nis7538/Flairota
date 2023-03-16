/*

Concept: https://dribbble.com/shots/5476562-Forgot-Password-Verification/attachments

*/
import {
    Animated,
    Image,
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    StatusBar,
} from 'react-native';
import React, { useState } from 'react';

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {
    ScrollView,
    TextInput,
    TouchableOpacity,
} from 'react-native-gesture-handler';
import baseApi from '../api/baseApi';
import { useNavigation, useTheme } from '@react-navigation/native';

const CELL_SIZE = 55;
const CELL_BORDER_RADIUS = 8;
const DEFAULT_CELL_BG_COLOR = '#fff';
const NOT_EMPTY_CELL_BG_COLOR = '#3557b7';
const ACTIVE_CELL_BG_COLOR = '#f7fafe';

const { Value, Text: AnimatedText } = Animated;

const CELL_COUNT = 4;
const source = {
    uri:
        'https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png',
};

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({ hasValue, index, isFocused }: any) => {
    Animated.parallel([
        Animated.timing(animationsColor[index], {
            useNativeDriver: false,
            toValue: isFocused ? 1 : 0,
            duration: 250,
        }),
        Animated.spring(animationsScale[index], {
            useNativeDriver: false,
            toValue: hasValue ? 0 : 1,
            duration: hasValue ? 300 : 250,
        }),
    ]).start();
};

const ForgotPasswordScreen = () => {
    const navigation = useNavigation();
    const { colors, dark } = useTheme();
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [disable, setDisable] = useState(true);

    const renderCell = ({ index, symbol, isFocused }: any) => {
        const hasValue = Boolean(symbol);
        const animatedCellStyle = {
            backgroundColor: hasValue
                ? animationsScale[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [
                          NOT_EMPTY_CELL_BG_COLOR,
                          ACTIVE_CELL_BG_COLOR,
                      ],
                  })
                : animationsColor[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [
                          DEFAULT_CELL_BG_COLOR,
                          ACTIVE_CELL_BG_COLOR,
                      ],
                  }),
            borderRadius: animationsScale[index].interpolate({
                inputRange: [0, 1],
                outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
            }),
            transform: [
                {
                    scale: animationsScale[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.2, 1],
                    }),
                },
            ],
        };

        // Run animation on next event loop tik
        // Because we need first return new style prop and then animate this value
        setTimeout(() => {
            animateCell({ hasValue, index, isFocused });
        }, 0);

        return (
            <AnimatedText
                key={index}
                style={[styles.cell, animatedCellStyle]}
                onLayout={getCellOnLayoutHandler(index)}
            >
                {symbol || (isFocused ? <Cursor /> : null)}
            </AnimatedText>
        );
    };

    async function reqOtp() {
        await baseApi
            .post('accounts/forgot_password/', {
                email: email,
            })
            .then(function (response) {
                alert(response.data);
                setDisable(false);
            })
            .catch(function (err) {
                alert(err.message);
            });
    }

    function verify() {
        if (disable == false) {
            if (confirmPassword !== newPassword) {
                alert('Password Mismatched');
            } else if (value.length != 4) {
                alert('Enter 4-digit OTP');
            } else {
                verifyOTP();
            }
        } else {
            alert('First request the Otp');
        }
    }

    async function verifyOTP() {
        await baseApi
            .post('accounts/update_password/', {
                email: email,
                otp: value,
                password: confirmPassword,
            })
            .then(function (response) {
                alert(response.data);
            })
            .catch(function (err) {
                alert(err.message);
            });
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical
            style={[
                styles.root,
                { backgroundColor: dark ? colors.primary : colors.primary },
            ]}
        >
            <StatusBar
                barStyle={dark ? 'light-content' : 'dark-content'}
                backgroundColor={dark ? '#000' : '#fff'}
            />
            <Text
                style={[
                    styles.title,
                    { color: dark ? colors.text : colors.text },
                ]}
            >
                Verification
            </Text>
            <Image style={[styles.icon]} source={source} />
            <Text
                style={[
                    styles.subTitle,
                    { color: dark ? colors.text : colors.text },
                ]}
            >
                Enter the email id that{'\n'}
                your account is registered with
            </Text>

            <TextInput
                placeholder={' Email'}
                onChangeText={setEmail}
                style={{
                    textDecorationLine: 'none',
                    alignSelf: 'center',
                    height: 50,
                    width: '95%',
                    borderRadius: 10,
                    marginTop: 20,
                    backgroundColor: '#ececec',
                    paddingHorizontal: 20,
                }}
            />

            <TouchableOpacity
                onPress={reqOtp}
                activeOpacity={0.8}
                style={styles.nextButton}
            >
                <Text style={styles.nextButtonText}>Request OTP</Text>
            </TouchableOpacity>

            <Text
                style={[
                    styles.subTitle,
                    {
                        paddingTop: 0,
                        marginBottom: 20,
                        color: dark ? colors.text : colors.text,
                    },
                ]}
            >
                Enter the verification code{'\n'}
                we send to your email address
            </Text>

            <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFiledRoot}
                keyboardType='number-pad'
                textContentType='oneTimeCode'
                renderCell={renderCell}
            />
            <TextInput
                placeholder={' New Password'}
                onChangeText={setNewPassword}
                style={{
                    textDecorationLine: 'none',

                    alignSelf: 'center',
                    height: 50,
                    width: '95%',
                    borderRadius: 10,
                    marginTop: 20,
                    backgroundColor: '#ececec',
                    paddingHorizontal: 20,
                }}
            />
            <TextInput
                placeholder={' Confirm Password'}
                onChangeText={setConfirmPassword}
                style={{
                    alignSelf: 'center',
                    height: 50,
                    width: '95%',
                    borderRadius: 10,
                    marginTop: 20,
                    backgroundColor: '#ececec',
                    paddingHorizontal: 20,
                }}
            />
            <TouchableOpacity
                onPress={verify}
                activeOpacity={0.8}
                //disabled={disable}
                style={[styles.nextButton]}
            >
                <Text style={styles.nextButtonText}>Verify</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    codeFiledRoot: {
        height: CELL_SIZE,

        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    cell: {
        marginHorizontal: 8,
        height: CELL_SIZE,
        width: CELL_SIZE,
        lineHeight: CELL_SIZE - 5,
        fontSize: 30,
        textAlign: 'center',
        borderRadius: CELL_BORDER_RADIUS,
        color: '#3759b8',
        backgroundColor: '#fff',

        // IOS
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        // Android
        elevation: 3,
    },

    // =======================

    root: {
        padding: 20,
    },
    title: {
        paddingTop: 20,
        color: '#000',
        fontSize: 25,
        fontWeight: '700',
        textAlign: 'center',
        paddingBottom: 40,
    },
    icon: {
        width: 217 / 2.4,
        height: 158 / 2.4,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    subTitle: {
        paddingTop: 30,
        color: '#000',
        textAlign: 'center',
    },
    nextButton: {
        marginTop: 25,
        borderRadius: 60,
        height: 50,
        backgroundColor: '#3557b7',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '80%',
        marginBottom: 45,
    },
    nextButtonText: {
        textAlign: 'center',
        fontSize: 20,
        color: '#fff',
        fontWeight: '700',
    },
});

export default ForgotPasswordScreen;
