import {
    StackActions,
    useNavigation,
    useTheme,
} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    FlatList,
    Pressable,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import FollowerListComponent from '../Components/FollowerListComponent';
import { EventRegister } from 'react-native-event-listeners';
const LikedPostScreen = (props: any) => {
    const { colors, dark } = useTheme();
    const navigation = useNavigation();

    useEffect(() => {
        EventRegister.addEventListener('clickedProfileUserId', (data) => {
            setUserId(data);
            console.log(data);
        });
        return () => {
            true;
        };
    }, []);

    const [userId, setUserId] = useState();

    return (
        <View
            style={{
                backgroundColor: dark ? colors.primary : colors.background,
            }}
        >
            <StatusBar
                barStyle={dark ? 'light-content' : 'dark-content'}
                backgroundColor={dark ? '#000' : '#fff'}
            />
            <View
                style={{
                    height: 50,
                    display: 'flex',
                    width: '100%',

                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                }}
            >
                <Pressable
                    onPress={() => {
                        console.log('Hello');
                        console.log(navigation);
                        navigation.goBack();
                    }}
                    style={{
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        //justifyContent: 'flex-start',
                        //backgroundColor: 'red',
                    }}
                >
                    <TouchableOpacity>
                        <AntDesign
                            onPress={() => {
                                console.log('Hello');
                                //console.log(navigation);
                                navigation.goBack();
                            }}
                            name='arrowleft'
                            size={24}
                            color={dark ? colors.text : colors.text}
                        />
                    </TouchableOpacity>
                </Pressable>
                <View
                    style={{
                        display: 'flex',
                        alignContent: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                        paddingEnd: 45,
                    }}
                >
                    <Text
                        style={{
                            color: dark ? colors.text : colors.text,
                            fontSize: 22,
                        }}
                    >
                        All likes
                    </Text>
                </View>
            </View>
            <FlatList
                data={props.route.params.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    return <FollowerListComponent id={item.user.id} />;
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default LikedPostScreen;
