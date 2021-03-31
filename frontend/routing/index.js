import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SignInScreen from '../components/SignIn';
import SignUpScreen from '../components/SignUp';
import HomeScreen from '../components/Home';
import MessagesScreen from '../components/MessagesScreen';
import AppLoadingScreen from '../components/appLoadingScreen';

const AuthStack = createStackNavigator(
  {
    Login: SignInScreen,
    Register: SignUpScreen,
  },
  {
    initialRouteParams: 'Login',
  },
);

const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
    // Bulletin: BulletinScreen,
    // User: UserProfScreen,
    Messages: MessagesScreen,
  },
  {
    initialRouteParams: 'Home',
  },
);

const AppNavigator = createAppContainer(
  createSwitchNavigator(
    {
      AppLoading: AppLoadingScreen,
      Auth: AuthStack,
      App: AppStack,
    },
    {
      initialRouteParams: 'AppLoading',
    },
  ),
);

export default createAppContainer(AppNavigator);
