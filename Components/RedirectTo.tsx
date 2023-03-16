import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { SplashScreen } from '../App';

export default function RedirectTo() {
    const navigation = useNavigation();

    useEffect(() => {
        async function directlogin() {
            var value = await AsyncStorage.getItem('myuserid');
            //var value = await SecureStore.getItemAsync('myuserid');
            if (
                value != 0 &&
                value != '0' &&
                value != null &&
                value != undefined
            ) {
                navigation.navigate('Main');
            } else {
                navigation.navigate('Home');
            }
        }
        directlogin();
    });

    return (
        <View>
            <Image
                source={require('../assets/pepsi.png')}
                style={{ width: '100%', height: '100%' }}
                resizeMode='center'
            />
        </View>
    );
}
