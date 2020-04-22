import React from 'react'
import {View, StyleSheet} from 'react-native'
import {AppTextBold} from './UI/AppTextBold'

export const Navbar = props => {
    return (
        <View style={styles.navbar}>
            <AppTextBold style={styles.text}>{props.title}</AppTextBold>
        </View>
    )
}

const styles = StyleSheet.create({
    navbar: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5E91F4'
    },
    text: {
        color: '#FFFFFF',
        fontSize: 20
    }
})
