import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ChatComponent = (props: any) => {
    const { colors, dark } = useTheme();
    function nameSender() {
        const headerName = props.item.name;
        props.navigation.navigate('ChatMessage', { headerName: headerName });
    }

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            style={[
                styles.container,
                {
                    backgroundColor: dark ? colors.primary : colors.background,
                },
            ]}
            onPress={nameSender}
        >
            <View
                style={[
                    styles.rowContainer,
                    {
                        backgroundColor: dark
                            ? colors.primary
                            : colors.background,
                    },
                ]}
            >
                <View>
                    <Image
                        style={styles.icon}
                        resizeMode={'stretch'}
                        source={require('../assets/pepsi.png')}
                    />
                </View>
                <View style={styles.userName}>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: 'bold',
                            color: dark ? colors.text : colors.text,
                        }}
                    >
                        {props.item.name}
                    </Text>
                    <Text
                        style={{
                            fontSize: 11,
                            marginTop: 2,
                            color: dark ? colors.text : colors.text,
                        }}
                    >
                        Anytime Depressed
                    </Text>
                </View>
                <View style={styles.info}>
                    <Text style={{ color: dark ? colors.text : colors.text }}>
                        6:00 pm
                    </Text>
                    <View style={styles.circle}>
                        <Text
                            style={{
                                fontSize: 10,
                                color: dark ? colors.text : colors.text,
                            }}
                        >
                            3
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.splitter}></View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 73,
    },
    rowContainer: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingVertical: 4,
        paddingHorizontal: 5,
        paddingBottom: 10,
    },
    icon: {
        width: 50,
        height: 50,
        borderRadius: 200,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    splitter: {
        width: '77%',
        height: 1,
        alignSelf: 'flex-end',
        backgroundColor: '#FFF',
        opacity: 0.1,
        marginEnd: 10,
    },
    userName: {
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginStart: 7,
    },
    info: {
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 10,
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 200,
        backgroundColor: 'rgb(168, 194, 211)',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4,
    },
});

export default ChatComponent;
