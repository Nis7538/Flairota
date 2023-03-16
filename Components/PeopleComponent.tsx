import { useTheme } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import baseApi from '../api/baseApi';
import { useDataLayerValue } from '../context-api/DataLayer';
import Svg, { Path } from 'react-native-svg';

const PeopleComponent = (props: any) => {
    const { colors, dark } = useTheme();
    // console.log(props.firstname);
    // console.log(props.lastname);
    // console.log(props.username);
    //console.log(props.image);
    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: dark ? colors.primary : colors.background,
                },
            ]}
        >
            <View style={{ alignItems: 'center' }}>
                {props.image != 'https://res.cloudinary.com/di9lrcrlj/null' ? (
                    <Image
                        style={styles.userimage}
                        source={{ uri: props.image }}
                    />
                ) : (
                    <TouchableOpacity activeOpacity={0.7} style={styles.icon}>
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
                <Image
                    style={styles.badge}
                    source={require('../assets/pepsi1.png')}
                />
            </View>
            <View style={{ alignItems: 'center', marginTop: -13 }}>
                <Text
                    numberOfLines={2}
                    style={{
                        fontWeight: 'bold',
                        fontSize: 13,
                        color: dark ? colors.text : colors.text,
                        maxWidth: '80%',
                        textAlign: 'center',
                    }}
                >
                    {props.username ? props.username : 'username'}
                </Text>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text
                        style={{
                            fontWeight: 'normal',
                            fontSize: 11,
                            color: dark ? colors.text : colors.text,
                        }}
                    >
                        {props.firstname ? props.firstname : 'New'}
                    </Text>
                    <Text
                        style={{
                            fontWeight: 'normal',
                            fontSize: 11,
                            color: dark ? colors.text : colors.text,
                        }}
                    >
                        {'  '}
                        {props.lastname ? props.lastname : 'User'}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        paddingTop: 5,
        margin: '1%',
        maxWidth: '31.5%',
        minWidth: '31.5%',
    },
    userimage: {
        borderRadius: 40,
        height: 60,
        width: 60,
    },
    badge: {
        height: 20,
        width: 20,
        top: -18,
        right: -20,
    },
    icon: {
        width: 60,
        height: 60,
        borderRadius: 200,
        justifyContent: 'center',
        alignSelf: 'center',
    },
});

export default PeopleComponent;
