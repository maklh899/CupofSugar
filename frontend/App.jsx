import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, StatusBar } from 'react-native';
import { Container, StyleProvider } from 'native-base';
import configureStore from './redux/helpers/store';
import { initializeApplication } from './redux/actions/appActions';

import Navigation from './components/Navigation';
import getTheme from './native-base-theme/components';
import commonColor from './native-base-theme/variables/commonColor';
import material from './native-base-theme/variables/material';
import myThemeno from './native-base-theme/variables/colorsheet_var';
import myTheme from './native-base-theme/variables/myTheme';

// import { PrivateRoute } from './components/privateRouteComp';

// const store = createStore(reducers, compose(applyMiddleware(thunk)));
const store = configureStore();
store.dispatch(initializeApplication());

function App() {
  return (
    <Provider store={store}>
      <StyleProvider style={getTheme(myTheme)}>
        <Container>
          <Navigation />
          <StatusBar style="auto"/>
        </Container>
      </StyleProvider>
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
