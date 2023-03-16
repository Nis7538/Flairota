import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import Svg, { Defs, G, Path } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';

const NotificationCardComponent = (props: any) => {
    return (
        <View style={styles.card}>
            <View style={styles.likes}>
                <View
                    style={{
                        flexDirection: 'row',
                        width: 65,
                        justifyContent: 'center',
                        alignSelf: 'center',
                        marginBottom: 5,
                    }}
                >
                    <Image
                        style={{
                            width: 37,
                            height: 37,
                            borderRadius: 37,
                            position: 'absolute',
                            left: 0,
                            borderWidth: 2,
                            borderColor: 'white',
                        }}
                        source={require('../assets/image/11.jpg')}
                    />
                    <Image
                        style={{
                            width: 37,
                            height: 37,
                            borderRadius: 37,
                            position: 'absolute',
                            left: 20,
                            borderWidth: 2,
                            borderColor: 'white',
                        }}
                        source={require('../assets/image/10.jpg')}
                    />
                    <Image
                        style={{
                            width: 37,
                            height: 37,
                            borderRadius: 37,
                            position: 'absolute',
                            left: 40,
                            borderWidth: 2,
                            borderColor: 'white',
                        }}
                        source={require('../assets/image/9.jpg')}
                    />
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Ionicons
                        name='ios-heart-outline'
                        size={20}
                        color='black'
                    />
                    <Text style={{ textAlign: 'center', marginLeft: 8 }}>
                        69
                    </Text>
                </View>
            </View>
            {/* <View style={styles.partition}></View> */}
            <View style={styles.comments}>
                <View
                    style={{
                        flexDirection: 'row',
                        width: 65,
                        justifyContent: 'center',
                        alignSelf: 'center',
                        marginBottom: 5,
                    }}
                >
                    <Image
                        style={{
                            width: 37,
                            height: 37,
                            borderRadius: 37,
                            position: 'absolute',
                            left: 0,
                            borderWidth: 2,
                            borderColor: 'white',
                        }}
                        source={require('../assets/image/11.jpg')}
                    />
                    <Image
                        style={{
                            width: 37,
                            height: 37,
                            borderRadius: 37,
                            position: 'absolute',
                            left: 20,
                            borderWidth: 2,
                            borderColor: 'white',
                        }}
                        source={require('../assets/image/10.jpg')}
                    />
                    <Image
                        style={{
                            width: 37,
                            height: 37,
                            borderRadius: 37,
                            position: 'absolute',
                            left: 40,
                            borderWidth: 2,
                            borderColor: 'white',
                        }}
                        source={require('../assets/image/9.jpg')}
                    />
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <EvilIcons name='comment' size={24} color='black' />
                    <Text style={{ textAlign: 'center', marginLeft: 8 }}>
                        69
                    </Text>
                </View>
            </View>
            {/* <View style={styles.partition}></View> */}
            <View style={styles.post}>
                <View
                    style={{
                        width: '65%',
                        height: '65%',
                        alignSelf: 'center',
                        borderRadius: 25,
                    }}
                >
                    <Image
                        source={require('../assets/image/7.jpg')}
                        resizeMode='stretch'
                        style={{
                            width: '100%',
                            height: '100%',
                            alignSelf: 'center',
                            justifyContent: 'center',
                            borderRadius: 25,
                            marginLeft: 20,
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '90%',
        height: '12%',
        alignSelf: 'center',
        flexDirection: 'row',
        backgroundColor: '#F5F5FF',
        borderRadius: 15,
        shadowColor: 'grey',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowRadius: 2,
        shadowOpacity: 1.0,
        marginTop: 10,
        elevation: 5,
    },
    likes: {
        width: '33%',
        height: '100%',
        justifyContent: 'space-around',
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
    },
    comments: {
        width: '33%',
        height: '100%',
        justifyContent: 'space-around',
    },
    post: {
        width: '28%',
        height: '100%',
        justifyContent: 'center',
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
    },
    partition: {
        width: 1,
        height: '80%',
        backgroundColor: 'grey',
        alignSelf: 'center',
    },
});

export default NotificationCardComponent;
