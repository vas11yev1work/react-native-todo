import React, {useState} from 'react'
import {View, StyleSheet, TextInput, Modal, Alert, Dimensions} from 'react-native'
import {CustomButton} from './UI/CustomButton'
import {THEME} from '../theme'
import {AppText} from './UI/AppText'

export const EditModal = ({visible, onCancel, value, onSave}) => {
    const [focus, setFocus] = useState(false)
    const [title, setTitle] = useState(value)

    const saveHandler = () => {
        if (!title.trim()) {
            Alert.alert('Предупреждение', 'Название задачи не может быть пустым')
        } else {
            onSave(title)
        }
    }

    return (
        <Modal visible={visible} transparent={true} animationType="fade">
            <View style={styles.wrap}>
                <View style={styles.modal}>
                    <TextInput
                        style={{...styles.input, backgroundColor: focus ? THEME.GREY_ACTIVE_COLOR : THEME.GREY_COLOR}}
                        placeholder="Редактировать"
                        onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)}
                        onChangeText={text => setTitle(text)}
                        value={title}
                        returnKeyType="done"
                        autoCorrect={false}
                        maxLength={64}
                    />
                    <View style={styles.buttons}>
                        <CustomButton
                            style={{...styles.button, backgroundColor: THEME.DANGER_COLOR}}
                            onPress={() => {
                                setTitle(value)
                                onCancel()
                            }}
                        >
                            <AppText style={styles.buttonText}>Отменить</AppText>
                        </CustomButton>
                        <CustomButton
                            style={styles.button}
                            onPress={saveHandler}
                        >
                            <AppText style={styles.buttonText}>Сохранить</AppText>
                        </CustomButton>
                    </View>
                </View>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.4)'
    },
    modal: {
        backgroundColor: THEME.WHITE_COLOR,
        padding: 16,
        borderRadius: 10,
        width: '80%'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        width: Dimensions.get('window').width / 2.9
    },
    input: {
        borderRadius: 10,
        paddingRight: 16,
        paddingLeft: 16,
        height: 40,
        fontSize: 16,
        fontFamily: 'Montserrat-Medium',
        marginBottom: 10
    },
    buttonText: {
        fontSize: 16,
        color: THEME.WHITE_COLOR
    }
})
