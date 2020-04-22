import React, {useState, useEffect} from 'react'
import {View, StyleSheet, TextInput, Alert, Keyboard, Dimensions} from 'react-native'
import {CustomButton} from './UI/CustomButton'
import {THEME} from '../theme'
import {FontAwesome} from '@expo/vector-icons'

export const AddTodo = props => {
    const [taskWidth, setTaskWidth] = useState(Dimensions.get('window').width - 2*THEME.PADDING_HORIZONTAL - 51)
    const [focus, setFocus] = useState(false)
    const [value, setValue] = useState('')

    useEffect(() => {
        const update = () => {
            const width = Dimensions.get('window').width - 2*THEME.PADDING_HORIZONTAL - 51
            setTaskWidth(width)
        }
        Dimensions.addEventListener('change', update)
        return () => {
            Dimensions.removeEventListener('change', update)
        }
    })

    const pressHandler = (title) => {
        if (value.trim()) {
            props.onSubmit(value)
            setValue('')
            Keyboard.dismiss()
        } else {
            Alert.alert('Предупреждение', 'Название задачи не может быть пустым')
        }
    }

    return (
        <View style={styles.block}>
            <TextInput
                style={{
                    ...styles.input,
                    backgroundColor: focus ? THEME.GREY_ACTIVE_COLOR : THEME.GREY_COLOR,
                    width: taskWidth
                }}
                placeholder="Введите задачу"
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChangeText={text => setValue(text)}
                value={value}
                returnKeyType="done"
                autoCorrect={false}
                maxLength={64}
            />
            <CustomButton
                style={{width: 40}}
                onPress={pressHandler}
            >
                <FontAwesome name="plus-circle" style={styles.buttonText}/>
            </CustomButton>
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16
    },
    input: {
        borderRadius: 10,
        paddingRight: 16,
        paddingLeft: 16,
        height: 40,
        fontSize: 16,
        fontFamily: 'Montserrat-Medium'
    },
    buttonText: {
        fontSize: 24,
        color: THEME.WHITE_COLOR,
    }
})
