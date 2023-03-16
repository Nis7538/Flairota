import { useTheme } from '@react-navigation/native';
import { AxiosResponse } from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import baseApi from '../api/baseApi';
import { useDataLayerValue } from '../context-api/DataLayer';
import { baseImageUrl } from '../images/imageBaseUrl';
import PeopleComponent from './PeopleComponent';
import LottieView from 'lottie-react-native';

const SearchPeople = (props: any) => {
    let [peoplesresponse, setpeopleresponse] = useState();
    const { colors, dark } = useTheme();
    const [{ searchedtext }] = useDataLayerValue();
    const [ref, setref] = useState(0);

    useEffect(() => {
        getPeople();
    }, [searchedtext]);

    async function getPeople() {
        //console.log(searchedtext);
        if (searchedtext !== '') {
            const res = await baseApi.post('accounts/getusers/', {
                username: searchedtext,
            });
            setpeopleresponse((peoplesresponse = res.data));
            setref(1);
        } else {
            //console.log('Just started getting people');
            setpeopleresponse(searchedtext);
            setref(0);
        }
    }

    if (ref == 0) {
        return (
            <View
                style={{
                    display: 'flex',
                    height: 250,
                    flex: 1,
                    marginTop: -50,
                    width: 250,
                    alignSelf: 'center',
                    justifyContent: 'center',
                }}
            >
                <LottieView
                    autoPlay
                    loop
                    source={require('../assets/search.json')}
                />
            </View>
        );
    } else {
        return (
            <ScrollView
                style={{
                    backgroundColor: dark ? colors.primary : colors.background,
                    paddingTop: 5,
                }}
                showsVerticalScrollIndicator={false}
            >
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={peoplesresponse}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={3}
                    style={{
                        backgroundColor: dark
                            ? colors.primary
                            : colors.background,
                        width: '100%',
                        paddingHorizontal: 8,
                    }}
                    contentContainerStyle={{
                        justifyContent: 'space-between',
                    }}
                    renderItem={({ item }) => {
                        return (
                            <PeopleComponent
                                image={baseImageUrl.concat(item.userimage)}
                                username={item.user.username}
                                firstname={item.user.first_name}
                                lastname={item.user.last_name}
                            />
                        );
                    }}
                />
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({});

export default SearchPeople;
