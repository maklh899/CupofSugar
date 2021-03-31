import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator, createAppContainer } from '@react-navigation/bottom-tabs';

// import { Router, Route } from 'react-router-dom';

import SignInScreen from './SignIn';
import SignUpScreen from './SignUp';
import HomeScreen from './Home';

const BottomNavi = createBottomTabNavigator({
    Home: {
        screen: HomeScreen,
    },
    SignIn: {
        screen: SignInScreen,
    },
}, {
    initialRouteName: 'Home',
});

const AppContainer = createAppContainer(BottomNavi);

function Navigation() {
    return (
        <AppContainer>
            <BottomNavi.Navigator>
                <BottomNavi.Screen name="Home" component={HomeScreen} />
                <BottomNavi.Screen name="SignIn" component={SignInScreen} />
            </BottomNavi.Navigator>
        </AppContainer>
    )}

export default Navigation;
