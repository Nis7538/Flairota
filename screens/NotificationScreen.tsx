import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NotificationCardComponent from '../Components/NotificationCardComponent';
import FollowingNotificationComponent from '../Components/FollowingNotificationComponent';

const NotificationScreen = () => {
    const navigation = useNavigation();
    const { colors, dark } = useTheme();

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
                        navigation.goBack();
                    }}
                >
                    <Ionicons name='chevron-back' size={24} color='black' />
                </TouchableOpacity>
                <Text style={styles.headerName}>Notifications</Text>
            </View>
            <FollowingNotificationComponent />
            <NotificationCardComponent />
            <NotificationCardComponent />
            <NotificationCardComponent />
            <NotificationCardComponent />
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
});
export default NotificationScreen;
