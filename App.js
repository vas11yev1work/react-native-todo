import React, {useState} from 'react'
import {StyleSheet, View, SafeAreaView, Platform, StatusBar, Alert} from 'react-native'
import {Navbar} from './src/components/Navbar'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import {MainScreen} from './src/screens/MainScreen'
import {TodoScreen} from './src/screens/TodoScreen'
import {THEME} from './src/theme'

const fetchFonts = () => {
    return Font.loadAsync({
        'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
        'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf')
    })
}

export default function App() {
    const [todoId, setTodoId] = useState(null)
    const [todos, setTodos] = useState([])
    const [dataLoaded, setDataLoaded] = useState(false)

    const addTodo = (title) => {
        setTodos(prevState => [{
            id: Date.now().toString(),
            title
        }, ...prevState])
    }

    const removeTodo = id => {
        Alert.alert(
            'Удаление элемента',
            'Вы уверены, что хотите удалить данную задачу?',
            [
                {
                    text: 'Отмена',
                    style: 'cancel'
                },
                {
                    text: 'Удалить',
                    style: 'destructive',
                    onPress: () => {
                        setTodoId(null)
                        setTodos(prevState => prevState.filter(todo => todo.id !== id))
                    }
                },
            ],
            {cancelable: true},
        );
    }

    const updateTodo = (id, title) => {
        setTodos(old => {
            return old.map(todo => {
                if (todo.id === id) {
                    todo.title = title
                }
                return todo
            })
        })
    }

    if (!dataLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onError={e => console.log('Error', e)}
                onFinish={() => setDataLoaded(true)}
            />
        )
    }

    let content = (
        <MainScreen
            todos={todos}
            addTodo={addTodo}
            removeTodo={removeTodo}
            openTodo={(id) => {
                setTodoId(id)
            }}
        />
    )

    if (todoId) {
        const selectedTodo = todos.find(todo => todo.id === todoId)
        content = (
            <TodoScreen
                onRemove={removeTodo}
                goBack={() => setTodoId(null)}
                todo={selectedTodo}
                onSave={updateTodo}
            />
        )
    }

    return (
        <React.Fragment>
            {
                Platform.OS === 'ios'
                ? <StatusBar  barStyle="light-content" translucent={false} />
                : null
            }
            <SafeAreaView style={styles.statusBar} />
            <SafeAreaView>
                <Navbar title="Todo App"/>
                <View style={styles.container}>{content}</View>
            </SafeAreaView>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    statusBar: {
        backgroundColor: Platform.OS === 'android' ? THEME.ANDROID_STATUS_BAR_COLOR : THEME.BLUE_COLOR,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    container: {
        paddingTop: 16,
        paddingBottom: 346,
        paddingHorizontal: THEME.PADDING_HORIZONTAL
    }
})
