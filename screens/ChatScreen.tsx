import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import TypeMessageComponent from '../Components/TypeMessageComponent';
import { useTheme } from '@react-navigation/native';

const ChatScreen = ({ route, navigation }: any) => {
    const { colors, dark } = useTheme();
    const headerName = route.params.headerName;

    return (
        <View
            style={[
                styles.screen,
                {
                    backgroundColor: dark ? colors.primary : colors.background,
                },
            ]}
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
                    <AntDesign name='arrowleft' size={24} color='black' />
                </TouchableOpacity>
                <Text style={styles.headerName}>{headerName}</Text>
            </View>
            <TypeMessageComponent />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        width: '100%',
        height: '100%',
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
        width: '78%',
    },
    back: {
        justifyContent: 'flex-start',
        width: '10%',
        alignSelf: 'center',
        marginStart: 10,
    },
});

export default ChatScreen;
