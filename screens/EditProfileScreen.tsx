import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    KeyboardAvoidingView,
    Switch,
    StatusBar,
    TouchableWithoutFeedback,
} from 'react-native';
import baseApi from '../api/baseApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import Ripple from 'react-native-material-ripple';
import { useTheme } from '@react-navigation/native';
import { baseImageUrl } from '../images/imageBaseUrl';
import * as ImagePicker from 'expo-image-picker';

const EditProfileScreen = (props: any) => {
    const [isEnabled, setIsEnabled] = useState(false);
    let [bio, setBio] = useState('');
    let [email, setEmail] = useState('');
    const [checkusernames, setcheckusernames] = useState(true);
    const [icondisplay, seticondisplay] = useState(0);
    let [firstname, setFirstName] = useState('');
    let [lastname, setLastName] = useState('');
    let [username, setUserName] = useState('');
    let [userimg, setuserimg] = useState('');
    let [backimg, setbackimg] = useState('');
    let [mobile, setMobile] = useState('');
    const [ref, setref] = useState(0);

    useEffect(() => {
        userinfo();
    }, [ref]);

    //Setting new first name
    function onChangeFirstName(changedFirstName: String) {
        setFirstName(changedFirstName);
    }

    //Setting new last name
    function onChangeLastName(changedLastName: String) {
        setLastName(changedLastName);
    }

    //Setting new user name
    function onChangeUserName(changedUserName: String) {
        setUserName(changedUserName);
    }

    //Setting new bio
    function onChangeBio(changedBio: String) {
        setBio(changedBio);
    }

    //Setting new email
    function onChangeEmail(changedEmail: String) {
        setEmail(changedEmail);
    }

    async function saveUserProfile() {
        var value = await AsyncStorage.getItem('mysuperkey');

        var f = new FormData();
        f.append('coverimage', backimg);

        var p = new FormData();
        p.append('profileimage', backimg);

        console.log(f);
        await baseApi
            .post('accounts/editprofile/', {
                firstname: firstname.toString(),
                lastname: lastname.toString(),
                username: username.toString(),
                bio: bio.toString(),
                email: email.toString(),
                token: value?.split('"')[1],
                mobileno: mobile,
                coverimage: f,
                profileimage: p,
            })
            .then(function (response) {
                console.log(response);
                if (response) {
                    props.navigation.goBack();
                    props.route.params.userinfo();
                }
            })
            .catch(function (error) {
                console.log('Error', error);
            });
    }

    //Checking if username is valid
    function checkusername(usernamee: string) {
        setUserName(usernamee);

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

    async function userinfo() {
        var value = await AsyncStorage.getItem('myuserid');
        //var value = await SecureStore.getItemAsync('myuserid');

        //console.log(value)

        if (value != '') {
            const response = await axios.get(
                'https://memeapp-backend.herokuapp.com/api/accounts/user/'.concat(
                    value.toString(),
                    '/'
                )
            );
            //console.log(response.data);
            if (response) {
                //console.log(response.data);
                setUserName((username = await response.data.user.username));
                setFirstName((firstname = await response.data.user.first_name));
                setLastName((lastname = await response.data.user.last_name));
                setBio((bio = await response.data.bio));
                setuserimg((userimg = await response.data.userimage));
                setEmail((email = await response.data.user.email));
                setbackimg((backimg = await response.data.coverimage));
            }
        }
    }
    const { colors, dark } = useTheme();

    let [selectedImage, setSelectedImage] = React.useState(null);

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

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
        setuserimg((userimg = String(selectedImage.localUri)));
    };

    return (
        <View
            style={{
                height: '100%',
                backgroundColor: '#ececec',
                display: 'flex',
                flex: 1,
            }}
        >
            <StatusBar
                barStyle={dark ? 'light-content' : 'dark-content'}
                backgroundColor={dark ? '#000' : '#fff'}
            />
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.back}
                    onPress={() => {
                        props.navigation.goBack();
                    }}
                >
                    <Text
                        style={{
                            color: 'grey',
                            fontWeight: 'bold',
                            fontSize: 16,
                        }}
                    >
                        Cancel
                    </Text>
                </TouchableOpacity>
                <Text style={styles.headerName}>Edit Profile</Text>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    height: '100%',
                    backgroundColor: dark ? colors.primary : colors.primary,
                }}
            >
                <View style={styles.status}>
                    <View style={styles.accountName}>
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 18,
                                fontWeight: 'bold',
                            }}
                        >
                            Public Profile
                        </Text>
                        <Text
                            style={{
                                color: 'grey',
                                fontWeight: 'bold',
                                fontSize: 13,
                            }}
                        >
                            Your profile data will be public
                        </Text>
                    </View>
                    <Switch
                        style={{
                            height: 14,
                            position: 'absolute',
                            right: 10,
                        }}
                        trackColor={{
                            false: '#767577',
                            true: '#81b0ff',
                        }}
                        thumbColor={'#f5dd4b'}
                        onValueChange={() => {
                            setIsEnabled(!isEnabled);
                        }}
                        value={isEnabled}
                    />
                </View>
                <View
                    style={[
                        styles.imageContainer,
                        {
                            backgroundColor: dark
                                ? colors.primary
                                : colors.primary,
                        },
                    ]}
                >
                    <View style={styles.userImage}>
                        {userimg == '' ? (
                            <Image
                                style={{ width: '100%', height: '100%' }}
                                resizeMode={'stretch'}
                                source={require('../assets/image/7.jpg')}
                            />
                        ) : (
                            <Image
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    zIndex: 1,
                                    borderRadius: 40,
                                }}
                                resizeMode={'stretch'}
                                source={{
                                    uri: baseImageUrl.concat(userimg),
                                }}
                            />
                        )}
                    </View>
                    <View
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '70%',
                            top: 0,
                        }}
                    >
                        {backimg == '' ? (
                            <Image
                                style={{ width: '100%', height: '100%' }}
                                resizeMode={'stretch'}
                                source={require('../assets/image/7.jpg')}
                            />
                        ) : (
                            <Image
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    zIndex: -1,
                                }}
                                resizeMode={'stretch'}
                                source={{ uri: baseImageUrl.concat(backimg) }}
                            />
                        )}
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{
                            height: 35,
                            width: 35,
                            position: 'absolute',
                            right: 20,
                            top: 20,
                            backgroundColor: 'white',
                            borderRadius: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <MaterialIcons name='edit' size={24} color='black' />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={openImagePickerAsync}
                        activeOpacity={0.5}
                        style={{
                            height: 30,
                            width: 30,
                            position: 'absolute',
                            alignSelf: 'center',
                            bottom: -10,
                            backgroundColor: 'white',
                            borderRadius: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <MaterialIcons name='edit' size={20} color='black' />
                    </TouchableOpacity>
                </View>
                <View style={styles.profileDetails}>
                    {/* <Text style={{ fontWeight: 'bold', fontSize: 23 }}>
                        Profile Details
                    </Text> */}
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                        }}
                    >
                        <View
                            style={{
                                width: '50%',
                                marginHorizontal: 2.5,
                            }}
                        >
                            <Text style={{ color: 'grey' }}>First Name</Text>
                            <TextInput
                                style={{
                                    height: 40,
                                    borderRadius: 8,

                                    fontSize: 18,
                                    fontWeight: 'bold',
                                }}
                                placeholder='First Name'
                                value={firstname}
                                onChangeText={onChangeFirstName}
                            />
                        </View>

                        <View style={{ width: '50%', marginHorizontal: 2.5 }}>
                            <Text
                                style={{
                                    color: 'grey',
                                }}
                            >
                                Last Name
                            </Text>
                            <TextInput
                                style={{
                                    height: 40,
                                    borderRadius: 8,
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                }}
                                placeholder='Last Name'
                                value={lastname}
                                onChangeText={onChangeLastName}
                            />
                        </View>
                    </View>
                    <View style={styles.splitter}></View>
                    <View style={{ marginVertical: 10 }}>
                        <Text
                            style={{
                                color: 'grey',
                            }}
                        >
                            Username
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',

                                marginEnd: 20,
                            }}
                        >
                            <TextInput
                                autoCapitalize='none'
                                autoCorrect={false}
                                placeholder='Username'
                                value={username}
                                style={styles.inputusername}
                                onChangeText={(enteredUsername) => {
                                    checkusername(enteredUsername);
                                }}
                            />
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
                    <View style={styles.splitter}></View>
                    <View style={{ marginVertical: 10 }}>
                        <Text
                            style={{
                                color: 'grey',
                            }}
                        >
                            Bio
                        </Text>
                        <TextInput
                            style={{
                                marginTop: -5,
                                height: 40,
                                borderRadius: 8,
                                fontSize: 18,
                                fontWeight: 'bold',
                                textDecorationLine: 'none',
                            }}
                            placeholder='Bio'
                            value={bio}
                            onChangeText={onChangeBio}
                        />
                    </View>
                    <View style={styles.splitter}></View>
                    <View style={{ marginVertical: 10 }}>
                        <Text
                            style={{
                                color: 'grey',
                            }}
                        >
                            Email
                        </Text>
                        <TextInput
                            style={{
                                height: 40,
                                borderRadius: 8,

                                fontSize: 18,
                                fontWeight: 'bold',
                            }}
                            placeholder='Email'
                            value={email}
                            onChangeText={onChangeEmail}
                        />
                    </View>
                    <View style={styles.splitter}></View>

                    <View style={{ marginVertical: 10 }}>
                        <Text
                            style={{
                                color: 'grey',
                            }}
                        >
                            Mobile No.
                        </Text>
                        <TextInput
                            style={{
                                marginTop: -5,
                                height: 40,
                                borderRadius: 8,
                                fontSize: 18,
                                fontWeight: 'bold',
                                textDecorationLine: 'none',
                            }}
                            placeholder='Mobile'
                            value={mobile}
                            keyboardType={'number-pad'}
                            onChangeText={setMobile}
                        />
                    </View>

                    <Ripple
                        onPress={() => {
                            saveUserProfile();
                        }}
                        style={{
                            marginTop: 25,
                            width: '90%',
                            alignSelf: 'center',
                            alignContent: 'center',
                            backgroundColor: '#484ca5',
                            borderRadius: 15,
                            height: 45,
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Text style={{ color: '#fff' }}>Save</Text>
                        </View>
                    </Ripple>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    splitter: {
        width: '100%',
        height: 1,
        backgroundColor: '#000',
        opacity: 0.15,
        marginEnd: 10,
    },
    screen: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    header: {
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
        width: '58%',
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
    status: {
        width: '100%',
        height: '10%',
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#ececec',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    accountName: {
        width: '60%',
        height: '90%',
        justifyContent: 'center',
    },
    imageContainer: {
        width: '100%',
        height: 250,

        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ececec',
    },
    userImage: {
        width: 150,
        height: 150,
        overflow: 'hidden',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 0,
        padding: 5,
        backgroundColor: 'white',
        borderRadius: 100,
    },
    profileDetails: {
        backgroundColor: 'white',
        paddingHorizontal: 25,
        flex: 1,
        height: 600,
        marginTop: 35,
    },
    inputusername: {
        height: 40,
        borderRadius: 8,
        width: '90%',
        marginEnd: 15,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default EditProfileScreen;
