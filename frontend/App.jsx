import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';

// import { reducers } from './reducers';

// const store = createStore(reducers, compose(applyMiddleware(thunk)));

export default function App() {
    return (
        //<Provider store={store}>
        <View style={styles.container}>
            <Text>CupofSugar!</Text>
            <Text>hiii!</Text>
            <StatusBar style="auto"/>
        </View>
        //</Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

//export default App;
