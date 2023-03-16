import React from 'react';
import { TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const TypeMessageComponent = (props: any) => {
    return (
        <View style={{ ...styles.container, ...props.style }}>
            <TouchableOpacity>
                <AntDesign name='smile-circle' size={24} color='black' />
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder='Type a message😎😎😎😎'
                placeholderTextColor='black'
            />
            <TouchableOpacity>
                <MaterialIcons name='send' size={24} color='black' />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '95%',
        backgroundColor: '#aabbcd',
        flexDirection: 'row',
        padding: 5,
        alignSelf: 'center',
        borderRadius: 18,
        justifyContent: 'space-between',
        marginTop: 30,
        paddingVertical: 10,
        paddingHorizontal: 10,
        position: 'absolute',
        bottom: 10,
    },
    input: {
        width: '80%',
    },
});

export default TypeMessageComponent;
