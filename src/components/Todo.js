import React from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import {THEME} from '../theme'
import {AppText} from './UI/AppText'

export const Todo = ({todo, onRemove, onOpen}) => {
    return (
        <TouchableOpacity
            activeOpacity={.4}
            onLongPress={() => {
                onRemove(todo.id)
            }}
            onPress={() => onOpen(todo.id)}
        >
            <View style={styles.todo}>
                <AppText style={styles.todoText}>{todo.title}</AppText>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    todo: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: THEME.GREY_ACTIVE_COLOR,
        borderRadius: 10,
        marginBottom: 10
    },
    todoText: {
        fontSize: 16,
        textAlign: 'justify'
    }
})
