import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import ProfilePicture from './ProfilePicture';

import moment from 'moment';
import { baseImageUrl } from '../images/imageBaseUrl';
import Svg, { Path } from 'react-native-svg';

const FleetView = (props: any) => {
    const { fleet, goToNextFleet, goToPrevFleet, flen, fIn, a } = props;

    // const [aa, setaa] = useState(0);
    // var aaa: NodeJS.Timeout;
    // useEffect(() => {
    //     aaa = setTimeout(function () {
    //         //alert('Hello');
    //         goToNextFleet();
    //         setaa(4);
    //     }, 3000);
    // });

    return fleet != null ? (
        <View style={styles.container}>
            {fleet.image && (
                <Image
                    source={{ uri: baseImageUrl.concat(fleet.image) }}
                    style={styles.image}
                />
            )}
            {/* <Text style={styles.text}>{fleet.date}</Text> */}

            <View style={styles.userHeaderContainer}>
                {fleet.user.userimage ? (
                    <ProfilePicture
                        image={baseImageUrl.concat(fleet.user.userimage)}
                        size={70}
                    />
                ) : (
                    <TouchableOpacity
                        style={{
                            borderRadius: 60,
                            height: 60,
                            width: 60,
                            backgroundColor: 'white',
                            borderWidth: 4,
                            borderColor: '#f2f2f2',
                        }}
                    >
                        <Svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            {...props}
                        >
                            <Path
                                d='M12 0a12 12 0 1012 12A12 12 0 0012 0zm0 5a3.5 3.5 0 11-3.5 3.5A3.5 3.5 0 0112 5zm7 12.56A1.43 1.43 0 0117.57 19H6.43A1.43 1.43 0 015 17.56v-.46a3 3 0 011.63-2.67A12 12 0 0112 13a12 12 0 015.37 1.43A3 3 0 0119 17.1z'
                                fill='#57595e'
                                data-name='User Smal Circle'
                            />
                        </Svg>
                    </TouchableOpacity>
                )}
                <View style={styles.userNames}>
                    <Text style={styles.name}>{fleet.user.user.username}</Text>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.username}>
                            @{fleet.user.user.username}
                        </Text>
                        {/* <Text style={styles.time}>
                            {moment(fleet.createdAt).fromNow()}
                        </Text> */}
                    </View>
                </View>
            </View>

            <View style={styles.blur}></View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => {
                        goToPrevFleet();
                        //console.log('yyy');
                        //clearTimeout(aaa);

                        //aaa = setTimeout(function () {
                        //alert('Hello');
                        //setaa(4);
                        //}, 3000);
                    }}
                />
                <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => {
                        goToNextFleet();
                        // clearTimeout(aaa);
                        // setaa(4);
                        // aaa = setTimeout(function () {
                        //     //alert('Hello');
                        //     setaa(4);
                        // }, 3000);
                    }}
                />
            </View>
        </View>
    ) : (
        <View></View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: '100%',
        backgroundColor: '#000',
    },
    text: {
        color: '#eaeaea',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 20,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    userHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        padding: 10,
        bottom: 30,
    },
    blur: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        height: 110,
        backgroundColor: 'black',
        opacity: 0.3,
    },
    userNames: {
        marginLeft: 10,
    },
    name: {
        color: '#efefef',
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    username: {
        color: '#efefef',
        fontSize: 18,
    },
    time: {
        color: '#efefef',
        fontSize: 18,
        marginLeft: 10,
    },
    buttonContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        flexDirection: 'row',
    },
    userImage: {
        width: 70,
        height: 70,
        borderRadius: 70,
        right: 5,
        marginLeft: 5,
    },
});

export default FleetView;
