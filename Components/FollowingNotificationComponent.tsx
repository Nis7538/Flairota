import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FollowingNotificationComponent = () => {
    return (
        <View
            style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-around',
                paddingHorizontal: '3%',
                marginTop: 10,
            }}
        >
            <View style={styles.card}>
                <View style={{ width: 70, height: 70, marginTop: 5 }}>
                    <Image
                        style={{ width: 70, height: 70, borderRadius: 50 }}
                        source={require('../assets/image/7.jpg')}
                    />
                    <View
                        style={{
                            width: 15,
                            height: 15,
                            backgroundColor: 'green',
                            position: 'absolute',
                            right: 3,
                            bottom: 3,
                            borderRadius: 15,
                            justifyContent: 'center',
                        }}
                    >
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: 10,
                                color: 'white',
                            }}
                        >
                            5
                        </Text>
                    </View>
                </View>
                <Text
                    style={{ fontSize: 12.5, fontWeight: 'bold', marginTop: 5 }}
                >
                    Sent Requests 5
                </Text>
                <View style={{ width: '80%', marginTop: 10 }}>
                    <Text style={{ fontSize: 13, marginBottom: 5 }}>
                        1.ProgrammerGaurav
                    </Text>
                    <Text style={{ fontSize: 13, marginBottom: 5 }}>
                        2.KshitijD21
                    </Text>
                    <Text style={{ fontSize: 13, marginBottom: 5 }}>
                        3.VNC216
                    </Text>
                </View>
            </View>
            <View style={styles.card}>
                <View style={{ width: 70, height: 70, marginTop: 5 }}>
                    <Image
                        style={{ width: 70, height: 70, borderRadius: 50 }}
                        source={require('../assets/image/7.jpg')}
                    />
                    <View
                        style={{
                            width: 15,
                            height: 15,
                            backgroundColor: 'green',
                            position: 'absolute',
                            right: 3,
                            bottom: 3,
                            borderRadius: 15,
                            justifyContent: 'center',
                        }}
                    >
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: 10,
                                color: 'white',
                            }}
                        >
                            5
                        </Text>
                    </View>
                </View>
                <Text
                    style={{ fontSize: 12.5, fontWeight: 'bold', marginTop: 5 }}
                >
                    Received Requests 5
                </Text>
                <View style={{ width: '80%', marginTop: 10 }}>
                    <Text style={{ fontSize: 13, marginBottom: 5 }}>
                        1.ProgrammerGaurav
                    </Text>
                    <Text style={{ fontSize: 13, marginBottom: 5 }}>
                        2.KshitijD21
                    </Text>
                    <Text style={{ fontSize: 13, marginBottom: 5 }}>
                        3.VNC216
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '45%',
        height: '100%',
        alignSelf: 'center',
        backgroundColor: '#F5F5FF',
        borderRadius: 15,
        shadowColor: 'grey',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowRadius: 2,
        shadowOpacity: 1.0,
        elevation: 5,
        alignItems: 'center',
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

export default FollowingNotificationComponent;
