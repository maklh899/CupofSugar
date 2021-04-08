import React from 'react';
import { NavigationContainer } from '@react-navigation/native';


const navigationRef = React.createRef();
const Stack = createStackNavigator();

import SignInScreen from './SignIn';
// import SignUpScreen from './SignUp';
import HomeScreen from './Home';

const screens = [
  {
    name: 'Home',
    isIntialRoute: true,
    component: HomeScreen,
  },
  {
    name: 'Messages',
    component: MessageScreen,
  },
];


const routeIndexRef = React.useRef();

function Navigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={screens.find((screen) => screen.isIntialRoute).name}
      >
        {
          screens.map((screen) => (<Stack.Screen {...screen} key={screen.name} />))
        }
      </Stack.Navigator>
    </NavigationContainer>
  
  );
}

export default Navigation;
