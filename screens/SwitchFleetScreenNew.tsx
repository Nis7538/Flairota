import React, { useEffect, useState } from 'react';
import { ActivityIndicator, BackHandler, Text } from 'react-native';

import { StackActions, useNavigation } from '@react-navigation/native';

import FleetView from '../Components/FleetView';

import { useRoute } from '@react-navigation/native';
import baseApi from '../api/baseApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SwitchFleetScreenNew = (props: any) => {
    console.log(props.route.params.index);
    const route = useRoute();

    const navigation = useNavigation();
    //const { userId } = route.params;

    let [selfStory, setSelfStory] = useState([]);
    //const [user, setUser] = useState(null)
    const [fleetIndex, setFleetIndex] = useState(-1);
    const [fleet, setFleet] = useState(null);
    let [fleetlength, setFleetlength] = useState(0);
    let [userId, setUserId] = useState();
    let [storiesLength, setStoriesLength] = useState();

    useEffect(() => {
        const fetchData = async () => {
            var value = await AsyncStorage.getItem('mysuperkey');
            await baseApi
                .post(`/posts/getsotries/`, {
                    token: value?.split('"')[1],
                })
                .then(function (response) {
                    setFleetlength(
                        (fleetlength =
                            response.data[props.route.params.index].stories
                                .length)
                    );
                    setSelfStory(
                        (selfStory =
                            response.data[props.route.params.index].stories)
                    );
                    setFleetIndex(0);
                    setStoriesLength((storiesLength = response.data.length));
                    //setFleet(response.data[fleetIndex]
                })
                .catch(function (error) {
                    console.log('Error', error);
                });
        };
        fetchData();
        getUserId();
    }, []);

    async function getUserId() {
        setUserId((userId = await AsyncStorage.getItem('myuserid')));
    }

    useEffect(() => {
        //console.log(fleetlength);
        if (fleetIndex >= 0 && fleetIndex < fleetlength) {
            setFleet(selfStory[fleetIndex]);
            //console.log(fleetIndex);
        } else if (
            fleetIndex >= fleetlength &&
            props.route.params.index != storiesLength - 1
        ) {
            navigation.dispatch(StackActions.pop());
            navigation.navigate('SwitchFleetScreen', {
                index: props.route.params.index + 1,
            });
        } else if (
            fleetIndex >= fleetlength &&
            props.route.params.index == storiesLength - 1
        ) {
            navigation.navigate('Main');
        }
    }, [fleetIndex]);

    useEffect(() => {
        const backAction = () => {
            navigation.navigate('Main');
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
        return () => backHandler.remove();
    });

    //setFleet(selfStory[0]);

    const goToNextFleet = () => {
        setFleetIndex(fleetIndex + 1);
    };

    const goToPrevFleet = () => {
        setFleetIndex(fleetIndex - 1);
        if (fleetIndex <= 0 && props.route.params.index != 0) {
            navigation.dispatch(StackActions.pop());
            navigation.navigate('SwitchFleetScreen', {
                index: props.route.params.index - 1,
            });
        } else if (fleetIndex <= 0 && props.route.params.index == 0) {
            navigation.navigate('FleetScreen', {
                id: userId,
            });
        }
    };

    if (fleet === null) {
        return <ActivityIndicator />;
    }

    return (
        <FleetView
            fIn={fleetIndex}
            flen={fleetlength}
            fleet={fleet}
            goToNextFleet={goToNextFleet}
            goToPrevFleet={goToPrevFleet}
        />
    );
};

export default SwitchFleetScreenNew;
