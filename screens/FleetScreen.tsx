// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, BackHandler, Text } from 'react-native';

// import { useNavigation } from '@react-navigation/native';

// import FleetView from '../Components/FleetView';

// import { useRoute } from '@react-navigation/native';
// import baseApi from '../api/baseApi';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const FleetScreen = (props: any) => {
//     let [load, setLoad] = useState(true);
//     const route = useRoute();

//     const navigation = useNavigation();
//     //const { userId } = route.params;

//     const [selfStory, setSelfStory] = useState([]);
//     //const [user, setUser] = useState(null)
//     const [fleetIndex, setFleetIndex] = useState(-1);
//     const [fleet, setFleet] = useState(null);
//     let [fleetlength, setFleetlength] = useState(0);

//     useEffect(() => {
//         const fetchData = async () => {
//             var value = await AsyncStorage.getItem('myuserid');
//             var id = props.id || props.route.params.id;
//             await baseApi
//                 .get(`/posts/getsotries/${id}`)
//                 .then(function (response) {
//                     setFleetlength((fleetlength = response.data.length));
//                     setSelfStory(response.data);
//                     setFleetIndex(0);
//                     setLoad((load = false));
//                     //setFleet(response.data[fleetIndex]
//                 })
//                 .catch(function (error) {
//                     console.log('Error', error);
//                 });
//         };
//         fetchData();
//     }, []);

//     useEffect(() => {
//         //console.log(fleetlength);
//         if (fleetIndex >= 0 && fleetIndex < fleetlength) {
//             setFleet(selfStory[fleetIndex]);
//             //console.log(fleetIndex);
//         } else if (fleetIndex >= fleetlength) {
//             navigation.navigate('SwitchFleetScreen', {
//                 index: 0,
//             });
//         }
//     }, [fleetIndex]);

//     useEffect(() => {
//         const backAction = () => {
//             navigation.navigate('Main');
//             return true;
//         };

//         const backHandler = BackHandler.addEventListener(
//             'hardwareBackPress',
//             backAction
//         );
//         return () => backHandler.remove();
//     });

//     //setFleet(selfStory[0]);

//     const goToNextFleet = () => {
//         setFleetIndex(fleetIndex + 1);
//     };

//     const goToPrevFleet = () => {
//         setFleetIndex(fleetIndex - 1);
//         console.log(navigation);
//         if (fleetIndex <= 0) {
//             navigation.navigate('Main');
//         }
//     };

//     if (fleet === null) {
//         return <ActivityIndicator />;
//     }

//     return (
//         <FleetView
//             fIn={fleetIndex}
//             flen={fleetlength}
//             fleet={fleet}
//             goToNextFleet={goToNextFleet}
//             goToPrevFleet={goToPrevFleet}
//         />
//     );
// };

// export default FleetScreen;

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, BackHandler, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import FleetView from '../Components/FleetView';

import { useRoute } from '@react-navigation/native';
import baseApi from '../api/baseApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FleetScreen = (props: any) => {
    // let [load, setLoad] = useState(true);
    // const route = useRoute();

    // const navigation = useNavigation();
    // //const { userId } = route.params;

    // const [selfStory, setSelfStory] = useState([]);
    // //const [user, setUser] = useState(null)
    // const [fleetIndex, setFleetIndex] = useState(-1);
    // const [fleet, setFleet] = useState(null);
    // let [fleetlength, setFleetlength] = useState(0);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         var value = await AsyncStorage.getItem('myuserid');
    //         var id = props.id || props.route.params.id;
    //         await baseApi
    //             .post(`/posts/getsotries/`, {
    //                 token: value?.split('"')[1]
    //             })
    //             .then(function (response) {

    //             })
    //             .catch(function (error) {
    //                 console.log('Error', error);
    //             });
    //     };
    //     fetchData();
    // }, []);

    // useEffect(() => {
    //     //console.log(fleetlength);
    //     if (fleetIndex >= 0 && fleetIndex < fleetlength) {
    //         setFleet(selfStory[fleetIndex]);
    //         //console.log(fleetIndex);
    //     } else if (fleetIndex >= fleetlength) {
    //         navigation.navigate('SwitchFleetScreen', {
    //             index: 0,
    //         });
    //     }
    // }, [fleetIndex]);

    // useEffect(() => {
    //     const backAction = () => {
    //         navigation.navigate('Main');
    //         return true;
    //     };

    //     const backHandler = BackHandler.addEventListener(
    //         'hardwareBackPress',
    //         backAction
    //     );
    //     return () => backHandler.remove();
    // });

    // //setFleet(selfStory[0]);

    // const goToNextFleet = () => {
    //     setFleetIndex(fleetIndex + 1);
    // };

    // const goToPrevFleet = () => {
    //     setFleetIndex(fleetIndex - 1);
    //     console.log(navigation);
    //     if (fleetIndex <= 0) {
    //         navigation.navigate('Main');
    //     }
    // };

    // if (fleet === null) {
    //     return <ActivityIndicator />;
    // }

    const route = useRoute();
    const { userId } = route.params;

    let [users, setUsers] = useState([]);
    let [user, setUser] = useState(null);
    let [fleetIndex, setFleetIndex] = useState(-1);
    let [fleet, setFleet] = useState(null);
    let [userIndex, setuserIndex] = useState(0);

    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            var value = await AsyncStorage.getItem('mysuperkey');
            await baseApi
                .post('/posts/getsotries/', {
                    token: value?.split('"')[1],
                })
                .then(function (response) {
                    setUsers((users = response.data));
                    //console.log(props.route.params.index);
                    setuserIndex((userIndex = props.route.params.index));
                    //console.log(userIndex);
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (!users || users.length == 0) {
            return;
        }
        setUser((user = users.find((u) => u.user.id == userId) || null));
        //setuserIndex(props.index);
        setFleetIndex((fleetIndex = 0));
    }, [users]);

    useEffect(() => {
        if (!user) {
            return;
        }

        // for (var i = 0; i < users.length; i++) {
        //     //console.log('...........................................');
        //     //console.log(users[i]);
        //     //console.log('...........................................');
        //     if (users[i].user.id == user.id) {
        //         setuserIndex((userIndex = i));
        //         //alert(userIndex);
        //         break;
        //     } else {
        //         //alert('ok');
        //     }
        // }

        if (fleetIndex >= user.stories.length) {
            if (users.length > userIndex + 1) {
                //alert('yes');
                setUser((user = users[userIndex + 1]));

                setuserIndex((userIndex = userIndex + 1));

                //alert(userIndex);
                setFleetIndex((fleetIndex = 0));
                //alert(userIndex);
            } else {
                //alert('yes');
                navigation.navigate('Main');
                //setFleetIndex((fleetIndex = user.stories.length));
            }
        } else if (fleetIndex < 0) {
            if (userIndex > 0) {
                setUser((user = users[userIndex - 1]));
                setFleetIndex(
                    (fleetIndex = users[userIndex - 1].stories.length - 1)
                );
                //alert('lol');
                setuserIndex((userIndex = userIndex - 1));
            } else {
                alert('fixed');
                //setuserIndex((userIndex = userIndex - 1));
                setFleetIndex((fleetIndex = 0));
            }
        } else {
            //alert('aa');
            setFleet((fleet = user.stories[fleetIndex]));
        }
    }, [fleetIndex]);

    const goToNextFleet = () => {
        setFleetIndex((fleetIndex = fleetIndex + 1));
    };

    const goToPrevFleet = () => {
        setFleetIndex((fleetIndex = fleetIndex - 1));
    };

    if (fleetIndex == null) {
        return <ActivityIndicator />;
    }

    return (
        <FleetView
            user={user}
            fleet={fleet}
            goToNextFleet={goToNextFleet}
            goToPrevFleet={goToPrevFleet}
        />
    );
};

export default FleetScreen;
