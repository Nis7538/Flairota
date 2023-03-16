import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Text, ScrollView, FlatList } from 'react-native';
import ExplorePostComponent from '../Components/ExplorePostComponent';

const ExplorePostScreen = () => {
    const { colors, dark } = useTheme();
    const explorePosts = [{}, {}, {}, {}, {}];

    return (
        <ScrollView
            style={{
                backgroundColor: dark ? colors.primary : colors.background,
            }}
        >
            <View style={{}}>
                <FlatList
                    columnWrapperStyle={{
                        flex: 1,
                        justifyContent: 'space-around',
                    }}
                    horizontal={false}
                    numColumns={3}
                    data={explorePosts}
                    renderItem={({ item }) => {
                        return <ExplorePostComponent />;
                    }}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({});

export default ExplorePostScreen;
