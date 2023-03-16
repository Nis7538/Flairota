import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useTheme } from '@react-navigation/native';

const Header = (props: any) => {
    const { colors, dark } = useTheme();
    const navigation = useNavigation();
    return (
        <View
            {...props}
            style={[
                { ...styles.header, ...props.style },
                {
                    backgroundColor: dark ? colors.primary : colors.background,
                },
            ]}
        >
            <Text
                style={[
                    styles.headerName,
                    { color: dark ? colors.text : colors.text },
                ]}
            >
                {props.HeaderName}
            </Text>
            <TouchableOpacity
                style={{ display: 'flex', alignSelf: 'center' }}
                onPress={() => {
                    navigation.navigate(props.screen);
                }}
            >
                <FontAwesome
                    name='search'
                    size={24}
                    color={dark ? colors.text : colors.text}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        justifyContent: 'space-around',
        display: 'flex',
        flexDirection: 'row',
        shadowColor: 'grey',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowRadius: 2,
        shadowOpacity: 1.0,
        elevation: 9,
    },
    headerName: {
        textAlign: 'center',
        fontSize: 22,
        color: 'black',
        alignSelf: 'center',
    },
    searchicon: {
        marginTop: 8,
    },
});

export default Header;
