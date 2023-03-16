import React from 'react';
import { View, StyleSheet, StatusBar, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { HexagonView } from 'react-native-shape-image-view';
import Svg, {
    Defs,
    LinearGradient,
    Stop,
    Path,
    RadialGradient,
} from 'react-native-svg';

const StatisticScreen = (props: any) => {
    const { colors, dark } = useTheme();

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={dark ? 'light-content' : 'dark-content'}
                backgroundColor={dark ? '#000' : '#fff'}
            />
            <View
                style={{
                    width: '100%',
                    height: 200,
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
            >
                <View
                    style={{
                        width: 200,
                        justifyContent: 'center',
                        height: 200,
                    }}
                >
                    <Svg
                        xmlns='http://www.w3.org/2000/svg'
                        width={200}
                        height={200}
                        viewBox='0 0 107 123'
                        {...props}
                        style={{ position: 'absolute' }}
                    >
                        <Defs>
                            <LinearGradient
                                id='prefix__a'
                                x1={0.064}
                                y1={-0.174}
                                x2={-0.219}
                                y2={0.68}
                                gradientUnits='objectBoundingBox'
                            >
                                <Stop offset={0} stopColor='#083afe' />
                                <Stop offset={0.392} stopColor='#5395ff' />
                                <Stop offset={0.667} stopColor='#86cafb' />
                                <Stop offset={1} stopColor='#c9f3ff' />
                            </LinearGradient>
                        </Defs>
                        <Path
                            data-name='Polygon 2'
                            d='M88.2 0a7 7 0 016.069 3.512L121 50.012a7 7 0 010 6.976l-26.727 46.5A7 7 0 0188.2 107H34.8a7 7 0 01-6.069-3.512L2 56.988a7 7 0 010-6.976l26.727-46.5A7 7 0 0134.8 0z'
                            transform='rotate(90 53.5 53.5)'
                            fill='url(#prefix__a)'
                        />
                    </Svg>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 40,
                            color: 'white',
                            fontWeight: 'bold',
                            fontFamily: 'notoserif',
                        }}
                    >
                        3212
                    </Text>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 20,
                            color: 'white',
                            fontFamily: 'notoserif',
                        }}
                    >
                        points
                    </Text>
                </View>
            </View>
            <View
                style={{
                    width: '100%',
                    height: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}
            >
                <View
                    style={{
                        width: 160,
                        height: 160,
                        justifyContent: 'center',
                    }}
                >
                    <Svg
                        xmlns='http://www.w3.org/2000/svg'
                        width={160}
                        height={160}
                        viewBox='0 0 107 123'
                        {...props}
                        style={{ position: 'absolute' }}
                    >
                        <Defs>
                            <LinearGradient
                                id='prefix__a'
                                x1={0.064}
                                y1={-0.174}
                                x2={-0.22}
                                y2={0.592}
                                gradientUnits='objectBoundingBox'
                            >
                                <Stop offset={0} stopColor='#530fee' />
                                <Stop offset={0.455} stopColor='#a85ee3' />
                                <Stop offset={0.701} stopColor='#d492a3' />
                                <Stop offset={1} stopColor='#fdc367' />
                            </LinearGradient>
                        </Defs>
                        <Path
                            data-name='Polygon 4'
                            d='M88.2 0a7 7 0 016.069 3.512L121 50.012a7 7 0 010 6.976l-26.727 46.5A7 7 0 0188.2 107H34.8a7 7 0 01-6.069-3.512L2 56.988a7 7 0 010-6.976l26.727-46.5A7 7 0 0134.8 0z'
                            transform='rotate(90 53.5 53.5)'
                            fill='url(#prefix__a)'
                        />
                    </Svg>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 40,
                            color: 'white',
                            fontWeight: 'bold',
                            fontFamily: 'notoserif',
                        }}
                    >
                        3212
                    </Text>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 20,
                            color: 'white',
                            fontFamily: 'notoserif',
                        }}
                    >
                        points
                    </Text>
                </View>
                <View
                    style={{
                        width: 150,
                        height: 150,
                        justifyContent: 'center',
                    }}
                >
                    <Svg
                        xmlns='http://www.w3.org/2000/svg'
                        width={150}
                        height={150}
                        viewBox='0 0 107 123'
                        {...props}
                        style={{ position: 'absolute' }}
                    >
                        <Defs>
                            <LinearGradient
                                id='prefix__a'
                                x1={0.142}
                                y1={-0.228}
                                x2={-0.246}
                                y2={0.573}
                                gradientUnits='objectBoundingBox'
                            >
                                <Stop offset={0} stopColor='#0058c4' />
                                <Stop offset={0.355} stopColor='#1995d3' />
                                <Stop offset={0.677} stopColor='#4cd5da' />
                                <Stop offset={1} stopColor='#6cffac' />
                            </LinearGradient>
                        </Defs>
                        <Path
                            data-name='Polygon 5'
                            d='M88.2 0a7 7 0 016.069 3.512L121 50.012a7 7 0 010 6.976l-26.727 46.5A7 7 0 0188.2 107H34.8a7 7 0 01-6.069-3.512L2 56.988a7 7 0 010-6.976l26.727-46.5A7 7 0 0134.8 0z'
                            transform='rotate(90 53.5 53.5)'
                            fill='url(#prefix__a)'
                        />
                    </Svg>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 40,
                            color: 'white',
                            fontWeight: 'bold',
                            fontFamily: 'notoserif',
                        }}
                    >
                        3212
                    </Text>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 20,
                            color: 'white',
                            fontFamily: 'notoserif',
                        }}
                    >
                        points
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
        paddingTop: 25,
        backgroundColor: 'black',
    },
    hexagon: {
        width: 100,
        height: 55,
        backgroundColor: 'green',
        marginLeft: 10,
        borderRadius: 15,
    },
    hexagonInner: {
        width: 100,
        height: 55,
        backgroundColor: 'red',
    },
    hexagonAfter: {
        position: 'absolute',
        bottom: -25,
        left: 0,
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderLeftWidth: 50,
        borderLeftColor: 'transparent',
        borderRightWidth: 50,
        borderRightColor: 'transparent',
        borderTopWidth: 25,
        borderTopColor: 'red',
    },
    hexagonBefore: {
        position: 'absolute',
        top: -25,
        left: 0,
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderLeftWidth: 50,
        borderLeftColor: 'transparent',
        borderRightWidth: 50,
        borderRightColor: 'transparent',
        borderBottomWidth: 25,
        borderBottomColor: 'red',
    },
});

export default StatisticScreen;
