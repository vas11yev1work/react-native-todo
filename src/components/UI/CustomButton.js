import React from 'react'
import {TouchableOpacity, StyleSheet, TouchableNativeFeedback, Platform, View} from 'react-native'
import {AppText} from './AppText'

export const CustomButton = props => {
    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

    return (
        <Wrapper
            activeOpacity={.8}
            onPress={props.onPress}
        >
            <View style={{...styles.button, ...props.style}}>
                {props.children}
            </View>
        </Wrapper>
    )
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#5E91F4',
        height: 40
    },
})
