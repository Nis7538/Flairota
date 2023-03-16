import React, { useEffect, useState } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useTheme } from '@react-navigation/native';
import baseApi from '../api/baseApi';
import { baseImageUrl } from '../images/imageBaseUrl';
import Svg, { Path } from 'react-native-svg';

const StoriesIcon = (props: any) => {
    const { colors, dark } = useTheme();
    useEffect(() => {
        // console.log(props.indexx);
        getUserData();
    });

    const navigation = useNavigation();

    let [userName, setUserName] = useState();
    let [userImage, setUserImage] = useState();
    let [userI, setuserI] = useState('');

    async function getUserData() {
        const response = await baseApi.get(`/accounts/user/${props.userId}`);
        if (response) {
            setUserName((userName = await response.data.user.username));
            setUserImage((userImage = await response.data.userimage));
            setuserI((userI = props.indexx));
            //console.log(props.indexx);
        }
    }

    return (
        <TouchableOpacity
            onPress={() => {
                //console.log(props.indexx);
                //console.log(userI, 'IIII');
                navigation.navigate('FleetScreen', {
                    userId: props.userId,
                    index: props.indexx,
                });
            }}
            activeOpacity={0.5}
            style={[
                styles.container,
                { backgroundColor: dark ? colors.primary : colors.background },
            ]}
        >
            {userImage ? (
                <Image
                    source={{ uri: baseImageUrl.concat(userImage) }}
                    style={styles.icon}
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
            <Text
                numberOfLines={1}
                style={{
                    alignSelf: 'center',
                    color: dark ? colors.text : colors.text,
                }}
            >
                {userName}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginHorizontal: 5,
        padding: 7,
        elevation: 5,
        backgroundColor: 'white',
        width: 75,
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 2,
        height: 110,
        borderWidth: 1,
        borderColor: '#CBCBFF',
    },
    icon: {
        width: 43,
        height: 43,
        borderRadius: 43,
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 7,
    },
    status: {
        width: 5,
        height: 5,
        borderRadius: 500,
        backgroundColor: 'rgb(49, 162, 76)',
    },
    userImage: {
        width: 43,
        height: 43,
        borderRadius: 43,
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 7,
    },
});

export default StoriesIcon;
