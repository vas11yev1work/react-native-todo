import React from 'react';
import {StyleSheet, View, FlatList, Image, Dimensions} from 'react-native'
import {AddTodo} from '../components/AddTodo'
import {Todo} from '../components/Todo'
import {AppText} from '../components/UI/AppText'
import {THEME} from '../theme'

export const MainScreen = ({addTodo, todos, removeTodo, openTodo}) => {
    const [deviceWidth, setDeviceWidth] = React.useState(Dimensions.get('window').width - 2*THEME.PADDING_HORIZONTAL)

    React.useEffect(() => {
        const update = () => {
            const width = Dimensions.get('window').width - 2*THEME.PADDING_HORIZONTAL
            setDeviceWidth(width)
        }
        Dimensions.addEventListener('change', update)
        return () => {
            Dimensions.removeEventListener('change', update)
        }
    })

    let content = (
        <View style={{width: deviceWidth}}>
            <FlatList
                data={todos}
                renderItem={({item}) => <Todo todo={item} onRemove={removeTodo} style={{flex: 1}} onOpen={openTodo} />}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    )

    if (todos.length === 0) {
        content = (
            <View style={styles.noTodos}>
                <Image source={require('../../assets/sad.png')} style={styles.image}/>
                <AppText style={styles.noTodosText}>Пока нет задач</AppText>
            </View>
        )
    }

    return (
        <View>
            <AddTodo onSubmit={addTodo} />
            {content}
        </View>
    )
};

const styles = StyleSheet.create({
    noTodos: {
        alignItems: 'center',
        marginTop: 10
    },
    noTodosText: {
        fontSize: 16
    },
    image: {
        height: 50,
        width: 50,
        marginBottom: 10
    }
})
