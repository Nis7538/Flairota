import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Button,
    Dimensions,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import CircleImage from './CircleImage';
import Ripple from 'react-native-material-ripple';
import { useTheme } from '@react-navigation/native';

const ExplorePostComponent = () => {
    const { colors, dark } = useTheme();
    return (
        <View
            style={[
                styles.card,
                {
                    backgroundColor: dark
                        ? colors.background
                        : colors.background,
                },
            ]}
        >
            <Ripple
                style={{ height: '70%' }}
                onPress={() => {
                    //console.log(props.userid);
                    // if (props.userid === 46) {
                    //     props.navigation.navigate('Profile');
                    // } else {
                    //     props.navigation.navigate('ClickedProfile', {
                    //         userid: props.userid,
                    //     });
                    // }
                }}
            >
                <Image
                    style={styles.feedImage}
                    source={require('../assets/image/7.jpg')}
                    resizeMode='stretch'
                />
            </Ripple>
            <View
                style={{
                    display: 'flex',
                    flex: 1,
                }}
            >
                <View style={styles.lineStyle} />
                <Ripple onPress={() => {}} style={styles.cardHeader}>
                    <View
                        style={{
                            flexDirection: 'column',
                            marginEnd: 5,
                            maxWidth: '70%',
                        }}
                    >
                        <Text
                            numberOfLines={1}
                            style={{
                                fontSize: 13,
                                paddingLeft: 5,
                                color: dark ? colors.text : colors.text,
                            }}
                        >
                            pirogrammer
                        </Text>
                        <Text
                            numberOfLines={1}
                            style={[
                                styles.userName,
                                { color: dark ? colors.text : colors.text },
                            ]}
                        >
                            Gaurav Gupta
                        </Text>
                    </View>
                    <Image
                        style={styles.userImage}
                        //source={require('../assets/qqq.jpeg')}
                        source={require('../assets/qqq.jpeg')}
                    />
                </Ripple>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        marginVertical: 6,
        borderRadius: 15,
        width: '31%',
        height: 160,
        shadowColor: 'grey',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowRadius: 2,
        shadowOpacity: 1.0,
        elevation: 5,
    },
    cardHeader: {
        paddingHorizontal: 3,
        width: '100%',
        maxWidth: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        alignItems: 'center',
        //backgroundColor: 'red',
    },
    headerLeft: {
        flexDirection: 'row',
    },
    userImage: {
        width: 27,
        height: 27,
        borderRadius: 20,
        right: 5,
        marginLeft: 5,
    },
    userName: {
        fontSize: 9,
        maxWidth: '100%',
        paddingLeft: 5,
    },

    feedImage: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor: 'black',
        opacity: 0.1,
        marginHorizontal: 10,
        marginTop: 3,
    },
});

export default ExplorePostComponent;
