import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native'
import {CustomButton} from '../components/UI/CustomButton'
import {THEME} from '../theme'
import {AppCard} from '../components/UI/AppCard'
import {EditModal} from '../components/EditModal'
import {AppTextBold} from '../components/UI/AppTextBold'
import {AppText} from '../components/UI/AppText'
import {AntDesign} from '@expo/vector-icons'

export const TodoScreen = ({goBack, todo, onRemove, onSave}) => {
    const [modal, setModal] = React.useState(false)

    const saveHandler = title => {
        onSave(todo.id, title)
        setModal(false)
    }

    return (
        <View>
            <EditModal
                value={todo.title}
                visible={modal}
                onCancel={() => setModal(false)}
                onSave={saveHandler}
            />
            <AppCard style={styles.card}>
                <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
                <CustomButton onPress={() => setModal(true)} style={{paddingHorizontal: 10}}>
                    <AntDesign style={styles.buttonIcon} name="edit"/>
                </CustomButton>
            </AppCard>
            <View style={styles.buttons}>
                <CustomButton
                    style={styles.button}
                    onPress={() => goBack()}
                >
                    <AppText style={styles.buttonText}>Назад</AppText>
                </CustomButton>
                <CustomButton
                    style={{...styles.button, backgroundColor: THEME.DANGER_COLOR}}
                    onPress={() => onRemove(todo.id)}
                >
                    <AppText style={styles.buttonText}>Удалить</AppText>
                </CustomButton>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 16,
        width: '76%',
        textAlign: 'justify'
    },
    card: {
        marginBottom: 16
    },
    buttonIcon: {
        fontSize: 24,
        color: THEME.WHITE_COLOR
    },
    buttonText: {
        fontSize: 16,
        color: THEME.WHITE_COLOR
    },
    button: {
        width: Dimensions.get('window').width / 2.15
    }
})
