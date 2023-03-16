import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    Image,
    ScrollView,
    TextInput,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CovidRelief1 = () => {
    const navigation = useNavigation();
    const { colors, dark } = useTheme();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Individual', value: 'Individual' },
        { label: 'Organization', value: 'Organization' },
    ]);

    const [open1, setOpen1] = useState(false);
    const [value1, setValue1] = useState(null);
    const [items1, setItems1] = useState([
        { label: 'Andhra Pradesh', value: 'Andhra Pradesh' },
        { label: 'Arunachal Pradesh', value: 'Arunachal Pradesh' },
        { label: 'Assam', value: 'Assam' },
        { label: 'Bihar', value: 'Bihar' },
        { label: 'Chhattisgarh', value: 'Chhattisgarh' },
        { label: 'Goa', value: 'Goa' },
        { label: 'Gujarat', value: 'Gujarat' },
        { label: 'Haryana', value: 'Haryana' },
        { label: 'Himachal Pradesh', value: 'Himachal Pradesh' },
        { label: 'Jammu and Kashmir', value: 'Jammu and Kashmir' },
        { label: 'Jharkhand', value: 'Jharkhand' },
        { label: 'Karnataka', value: 'Karnataka' },
        { label: 'Kerala', value: 'Kerala' },
        { label: 'Madhya Pradesh', value: 'Madhya Pradesh' },
        { label: 'Maharashtra', value: 'Maharashtra' },
        { label: 'Manipur', value: 'Manipur' },
        { label: 'Meghalaya', value: 'Meghalaya' },
        { label: 'Mizoram', value: 'Mizoram' },
        { label: 'Nagaland', value: 'Nagaland' },
        { label: 'Odisha', value: 'Odisha' },
        { label: 'Punjab', value: 'Punjab' },
        { label: 'Rajasthan', value: 'Rajasthan' },
        { label: 'Sikkim', value: 'Sikkim' },
        { label: 'Tamil Nadu', value: 'Tamil Nadu' },
        { label: 'Telangana', value: 'Telangana' },
        { label: 'Tripura', value: 'Tripura' },
        { label: 'Uttarakhand', value: 'Uttarakhand' },
        { label: 'Uttar Pradesh', value: 'Uttar Pradesh' },
        { label: 'West Bengal', value: 'West Bengal' },
        {
            label: 'Andaman and Nicobar Islands',
            value1: 'Andaman and Nicobar Islands',
        },
        { label: 'Chandigarh', value1: 'Chandigarh' },
        { label: 'Dadra and Nagar Haveli', value1: 'Dadra and Nagar Haveli' },
        { label: 'Daman and Diu', value1: 'Daman and Diu' },
        { label: 'Delhi', value1: 'Delhi' },
        { label: 'Lakshadweep', value1: 'Lakshadweep' },
        { label: 'Puducherry', value1: 'Puducherry' },
    ]);
    const [scroll, setscroll] = useState(true);

    const [open2, setOpen2] = useState(false);
    const [value2, setValue2] = useState(null);
    const [items2, setItems2] = useState([
        { label: 'Food', value: 'Food' },
        { label: 'Oxygen Cylinder', value: 'Oxygen Cylinder' },
    ]);

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
            aspect: [1, 1],
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
        // let form_data = new FormData();
        // form_data.append('image', {
        //     uri: Platform.OS == 'android' ? img : img.replace(`file:/`, ''),
        //     type: 'image/jpg',
        //     name: 'image.jpg',
        // });
        // form_data.append('token', value?.split('"')[1]);
        // form_data.append('caption', caption);
        // console.log(img);
        // fetch('https://memeapp-backend.herokuapp.com/api/posts/upload/', {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'multipart/form-data',
        //     },
        //     body: form_data,
        // })
        //     .then((res) => {
        //         setSelectedImage(null);
        //         navigation.dispatch(StackActions.pop(1));
        //         navigation.dispatch(StackActions.push('Main'));
        //     })
        //     .catch((error) => {
        //         alert(error);
        //     });
    }

    return (
        <View
            style={{
                height: '100%',
                backgroundColor: dark ? colors.primary : colors.primary,
                display: 'flex',
                flex: 1,
            }}
        >
            <StatusBar
                barStyle={dark ? 'light-content' : 'dark-content'}
                backgroundColor={dark ? '#000' : '#fff'}
            />
            <View
                style={[
                    styles.header,
                    { backgroundColor: dark ? colors.primary : colors.primary },
                ]}
            >
                <TouchableOpacity
                    style={styles.back}
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Text
                        style={{
                            color: dark ? colors.text : colors.text,
                            fontWeight: 'bold',
                            fontSize: 16,
                        }}
                    >
                        Cancel
                    </Text>
                </TouchableOpacity>
                <Text
                    style={[
                        styles.headerName,
                        { color: dark ? colors.text : colors.text },
                    ]}
                >
                    Covid Relief
                </Text>
                <TouchableOpacity
                    style={styles.back}
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Text
                        style={{
                            color: 'blue',
                            fontWeight: 'bold',
                            fontSize: 16,
                        }}
                    >
                        Skip
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    backgroundColor: dark ? colors.primary : colors.primary,
                }}
                scrollEnabled={
                    open == true ? false : open1 == true ? false : true
                }
            >
                <View style={styles.imageContainer}>
                    <View style={styles.userImage}>
                        {selectedImage != null ? (
                            <Image
                                style={{ width: '100%', height: '100%' }}
                                resizeMode={'stretch'}
                                source={{ uri: selectedImage.localUri }}
                            />
                        ) : (
                            <Image
                                style={{ width: '100%', height: '100%' }}
                                resizeMode={'stretch'}
                                source={require('../assets/image/11.jpg')}
                            />
                        )}
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            openImagePickerAsync();
                        }}
                        style={{
                            backgroundColor: '#ececec',
                            borderRadius: 10,
                            marginHorizontal: '33%',
                            marginTop: 10,
                            padding: 5,
                        }}
                    >
                        <Text style={{ textAlign: 'center' }}>Add a Photo</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.profileDetails}>
                    <DropDownPicker
                        placeholder={'Organization/Individual'}
                        max={1}
                        style={{ marginVertical: 15 }}
                        open={open}
                        value={value}
                        items={items}
                        setValue={setValue}
                        setItems={setItems}
                        setOpen={setOpen}
                        searchPlaceholder={'Search'}
                    />
                    {/* {console.log(value)} */}
                    <View style={styles.splitter}></View>
                    <View style={{ marginVertical: 10 }}>
                        <TextInput
                            style={{
                                height: 40,
                                borderRadius: 8,

                                fontSize: 18,
                                fontWeight: 'bold',
                            }}
                            placeholder='Your Name'
                            // value={email}
                            // onChangeText={onChangeEmail}
                        />
                    </View>
                    <View style={styles.splitter}></View>
                    <View style={{ marginVertical: 10 }}>
                        <TextInput
                            style={{
                                height: 40,
                                borderRadius: 8,

                                fontSize: 18,
                                fontWeight: 'bold',
                            }}
                            placeholder='Organization Name'
                            // value={email}
                            // onChangeText={onChangeEmail}
                        />
                    </View>

                    <View style={styles.splitter}></View>
                    <DropDownPicker
                        placeholder={'Select State'}
                        style={{ marginVertical: 15 }}
                        open={open1}
                        max={1}
                        value={value1}
                        items={items1}
                        setValue={setValue1}
                        setItems={setItems1}
                        setOpen={setOpen1}
                        searchPlaceholder={'Search State'}
                    />
                    {/* {console.log(value)}
                    {console.log(value1)} */}
                    <View style={styles.splitter}></View>
                    <View style={{ marginVertical: 10 }}>
                        <TextInput
                            style={{
                                height: 40,
                                borderRadius: 8,

                                fontSize: 18,
                                fontWeight: 'bold',
                            }}
                            placeholder='Address'
                            // value={email}
                            // onChangeText={onChangeEmail}
                        />
                    </View>
                    <View style={styles.splitter}></View>
                    <View style={{ marginVertical: 10 }}>
                        <TextInput
                            style={{
                                height: 40,
                                borderRadius: 8,
                                fontSize: 14,
                                fontWeight: 'bold',
                            }}
                            placeholder='Pincodes in which you Can help People'
                            // value={email}
                            // onChangeText={onChangeEmail}
                        />
                    </View>
                    <View style={styles.splitter}></View>

                    <View style={{ marginVertical: 10 }}>
                        <TextInput
                            style={{
                                height: 40,
                                borderRadius: 8,

                                fontSize: 18,
                                fontWeight: 'bold',
                            }}
                            placeholder='Additional Information'
                            // value={email}
                            // onChangeText={onChangeEmail}
                        />
                    </View>
                    <View style={styles.splitter}></View>
                    <DropDownPicker
                        placeholder={'Items You Can Help With'}
                        style={{ marginVertical: 15 }}
                        open={open2}
                        min={1}
                        multiple={true}
                        value={value2}
                        items={items2}
                        setValue={setValue2}
                        setItems={setItems2}
                        setOpen={setOpen2}
                        searchPlaceholder={'Search State'}
                    />
                    <View style={styles.splitter}></View>
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
        backgroundColor: 'white',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ececec',
    },
    userImage: {
        width: 150,
        height: 150,
        borderRadius: 20,
        overflow: 'hidden',
        alignSelf: 'center',
    },
    profileDetails: {
        backgroundColor: 'white',
        paddingHorizontal: 25,
        flex: 1,
        marginBottom: 80,
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

export default CovidRelief1;
