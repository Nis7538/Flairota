import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HelpCardComponent = (props: any) => {
    const navigation = useNavigation();
    const { colors, dark } = useTheme();
    return (
        <View style={{ width: '40%' }}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                    if (props.index == 3) {
                        Linking.openURL('https://www.cowin.gov.in/home').catch(
                            function (err) {
                                alert(err);
                            }
                        );
                    }
                    if (props.index <= 2) {
                        navigation.navigate(`CovidRelief${props.index}`);
                    }
                }}
                style={[
                    styles.container,
                    { backgroundColor: dark ? colors.card : colors.card },
                ]}
            >
                <Image
                    source={require('../assets/pepsi1.png')}
                    style={{ width: 50, height: 50, alignSelf: 'center' }}
                />
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 15,
                        color: dark ? colors.text : colors.text,
                        paddingHorizontal: 20,
                    }}
                >
                    {props.title}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        elevation: 20,
        height: 150,
        borderRadius: 10,
        justifyContent: 'space-evenly',
    },
});

export default HelpCardComponent;
