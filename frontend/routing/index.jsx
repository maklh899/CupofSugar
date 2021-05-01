import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignInScreen from '../components/SignInScreen';
import SignUpScreen from '../components/SignUpScreen';
import HomeScreen from '../components/HomeScreen';
import MessagesScreen from '../components/ChatroomsScreen';
import SplashScreen from '../components/SplashScreen';
import UserApp from '../components/UserApp';

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
    Home1: UserApp,
    Home: HomeScreen,
    // // Bulletin: BulletinScreen,
    // // User: UserProfScreen,
    Messages: MessagesScreen,
  },
  {
    initialRouteParams: 'Home',
  },
);

const AppNavigator = createAppContainer(
  createSwitchNavigator(
    {
      AppLoading: SplashScreen,
      Auth: AuthStack,
      App: AppStack,
    },
    {
      initialRouteParams: 'AppLoading',

    },
  ),
);

export default createAppContainer(AppNavigator);
