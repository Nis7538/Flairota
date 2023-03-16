import React, { ChangeEvent, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Posts from '../Components/Posts';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Components/Header';
import ExplorePostScreen from './ExplorePostScreen';
import TrendingPostScreen from './TrendingPostScreen';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

import PeopleComponent from '../Components/PeopleComponent';
import { useDataLayerValue } from '../context-api/DataLayer';

import SearchPosts from '../Components/SearchPosts';
import SearchPeople from '../Components/SearchPeople';
import { useTheme } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

const SearchScreen = ({ navigation }: any, props: any) => {
    const { colors, dark } = useTheme();
    // const [searchedtext, setsearchedtext] = useState('Yash');
    const [{ searchedtext }, dispatch] = useDataLayerValue();

    const setsearchedtextfun = (q: any) => {
        dispatch({
            type: 'SET_searchedtext',
            searchedtext: q,
        });
    };
    // const handleChange = (event: ChangeEvent<{ value: string }>) => {
    //     dispatch({ value: event?.currentTarget?.value });
    // };
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: dark ? colors.primary : colors.background,
            }}
        >
            <StatusBar
                barStyle={dark ? 'light-content' : 'dark-content'}
                backgroundColor={dark ? '#000' : '#fff'}
            />
            <View
                style={[
                    styles.header,
                    {
                        backgroundColor: dark
                            ? colors.primary
                            : colors.background,
                    },
                ]}
            >
                <TouchableOpacity
                    style={styles.back}
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <AntDesign
                        name='arrowleft'
                        size={24}
                        color={dark ? colors.text : colors.text}
                    />
                </TouchableOpacity>
                <Text
                    style={[
                        styles.headerName,
                        { color: dark ? colors.text : colors.text },
                    ]}
                >
                    Header
                </Text>
            </View>
            <View
                style={[
                    styles.searchbar,
                    { backgroundColor: dark ? '#bdbdbd' : '#bdbdbd' },
                ]}
            >
                <FontAwesome
                    name='search'
                    size={24}
                    color='black'
                    style={{ textAlignVertical: 'center' }}
                />
                <TextInput
                    onChangeText={setsearchedtextfun}
                    placeholder={'Search anything...'}
                    style={{ width: '84%', marginStart: 10 }}
                    blurOnSubmit
                />
                {/* <Feather name='edit-3' size={30} color='black' /> */}
            </View>
            <Tab.Navigator
                tabBarOptions={{
                    indicatorStyle: {
                        height: 0,
                    },
                    activeTintColor: '#000',
                    inactiveTintColor: '#787878',

                    pressColor: '#ececec',
                    style: {
                        backgroundColor: '#CBCBFF',
                        borderRadius: 25,
                        marginHorizontal: 10,
                        marginVertical: 5,
                    },
                    labelStyle: { fontSize: 13 },
                }}
            >
                <Tab.Screen name='People' component={SearchPeople} />
                <Tab.Screen name='Photos' component={SearchPosts} />
                <Tab.Screen name='Videos' component={Posts} />
                <Tab.Screen name='Tags' component={Posts} />
            </Tab.Navigator>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    upperhalf: {
        margin: 20,
    },
    headerbar: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
    },
    searchbar: {
        width: '80%',
        height: 50,
        marginTop: 10,
        marginBottom: 8,
        // borderWidth: 1.5,
        // borderColor: 'black',
        borderRadius: 10,
        alignSelf: 'center',
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    header: {
        marginTop: 0,
        width: '100%',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
    },
    headerName: {
        marginTop: 8,
        textAlign: 'center',
        fontSize: 20,
        color: 'black',
        width: '50%',
        marginStart: 50,
    },
    back: {
        justifyContent: 'flex-start',
        width: '10%',
        alignSelf: 'center',
        marginStart: 10,
    },
});

export default SearchScreen;
