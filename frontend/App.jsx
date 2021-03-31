import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, StatusBar } from 'react-native';
import { Container } from 'native-base';
import configureStore from './redux/helpers/store';
import { initializeApplication } from './redux/actions/appActions';

// import Navigation from './components/Navigation';
import Navigation from './routing';
import userBottomNavi from './components/userBottomNavi';
// import { PrivateRoute } from './components/privateRouteComp';

// const store = createStore(reducers, compose(applyMiddleware(thunk)));
const store = configureStore();
store.dispatch(initializeApplication());

function App() {
  return (
    <Provider store={store}>
      <Container>
        <Navigation />
        <StatusBar style="auto"/>
        {/* <Router>
                <NavBar />
                <Route path="/signup" exact>
                    <SignUp />
                </Route>
                <Route path="/" exact>
                    <SignIn />
                </Route>
                <PrivateRoute path="/home" component={Home} />
            </Router> */}
      </Container>
    </Provider>
  );
}

export default App;
// function App() {
//     return (
//         // <Provider store={store}>
//         <View style={styles.container}>
//             <Text>CupofSugar!</Text>
//             <Text>hiii!</Text>
//             <StatusBar style="auto"/>
//         </View>
//         // </Provider>
//     );
// }

// export default App;