import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const CircleImage = (props: any) => {
    return (
        <Image
            {...props}
            style={{ ...styles.circle, ...props.style }}
            source={{ uri: props.image }}
        />
    );
};

const styles = StyleSheet.create({
    circle: {
        height: 10,
        width: 10,
        borderWidth: 1,
        borderRadius: 10 / 2,
    },
});

export default CircleImage;
