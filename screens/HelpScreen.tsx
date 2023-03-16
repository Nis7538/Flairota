import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    FlatList,
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';

import HelpCardComponent from '../Components/HelpCardComponent';

const HelpScreen = (props: any) => {
    const navigation = useNavigation();
    const { colors, dark } = useTheme();

    const cardData = [
        { title: 'Need Help ?' },
        { title: 'Want To Help ?' },
        { title: 'Donation' },
        { title: 'Vaccination Centers' },
        { title: 'Feedback' },
        { title: 'Your Requests' },
    ];

    return (
        <View
            style={{
                height: '100%',
                backgroundColor: dark ? colors.primary : colors.primary,
                display: 'flex',
                flex: 1,
            }}
        >
            <View
                style={[
                    styles.header,
                    { backgroundColor: dark ? colors.primary : colors.primary },
                ]}
            >
                <TouchableOpacity
                    style={styles.back}
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Text
                        style={{
                            color: dark ? colors.text : colors.text,
                            fontWeight: 'bold',
                            fontSize: 16,
                        }}
                    >
                        Cancel
                    </Text>
                </TouchableOpacity>
                <Text
                    style={[
                        styles.headerName,
                        { color: dark ? colors.text : colors.text },
                    ]}
                >
                    Covid Relief
                </Text>
                {/* <TouchableOpacity
                    style={styles.save}
                    onPress={() => {
                        saveUserProfile();
                    }}
                >
                    <Text
                        style={{
                            color: 'blue',
                            fontWeight: 'bold',
                            fontSize: 18,
                        }}
                    >
                        Save
                    </Text>
                </TouchableOpacity> */}
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.cardsContainer}
                contentContainerStyle={{
                    alignContent: 'space-around',
                }}
            >
                <FlatList
                    data={cardData}
                    columnWrapperStyle={{
                        justifyContent: 'space-around',
                        marginTop: 15,
                        //backgroundColor: 'red',
                        display: 'flex',
                        flex: 1,
                        paddingBottom: 40,
                    }}
                    contentContainerStyle={{}}
                    numColumns={2}
                    keyExtractor={(item) => item.title}
                    renderItem={({ item, index }) => {
                        return (
                            <HelpCardComponent
                                index={index}
                                title={item.title}
                            />
                        );
                    }}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
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
    cardsContainer: {
        height: '100%',
        //backgroundColor: 'green',
    },
});

export default HelpScreen;
