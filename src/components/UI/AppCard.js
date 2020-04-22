import React from 'react'
import {StyleSheet, View} from 'react-native'
import {THEME} from '../../theme'

export const AppCard = props => {
    return (
        <View style={{...styles.default, ...props.style}}>
            {props.children}
        </View>
    )
};

const styles = StyleSheet.create({
    default: {
        borderWidth: 1,
        borderColor: THEME.GREY_ACTIVE_COLOR,
        borderRadius: 10,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})
