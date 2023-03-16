import React from 'react';
import { Text, StyleSheet, View, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { baseImageUrl } from '../images/imageBaseUrl';
import FeedPost from './FeedPost';

const ListofPhotos = (props: any, navigation: any) => {
    var scr = props.route.params.index;
    return (
        <FlatList
            maxToRenderPerBatch={20}
            showsVerticalScrollIndicator={false}
            data={props.route.params.postsdata}
            keyExtractor={(item) => item.id.toString()}
            initialScrollIndex={scr}
            scrollEnabled
            renderItem={({ item }) => {
                return (
                    <FeedPost
                        navigation={props.navigation}
                        caption={item.caption}
                        image={baseImageUrl.concat(item.image)}
                        username={item.user.user.username}
                        date={item.date}
                        profileimage={baseImageUrl.concat(item.user.userimage)}
                        firstname={item.user.user.first_name}
                        lastname={item.user.user.last_name}
                        id={item.id}
                    />
                );
            }}
        />
    );
};

const styles = StyleSheet.create({});

export default ListofPhotos;
