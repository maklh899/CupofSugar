import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Home';
import MessagesScreen from './MessagesScreen';
import styles from './styles';

const { Navigator, Screen } = createBottomTabNavigator();

function userBottomNavi() {
  return (
    <Navigator>
      <Screen name="Home" component={HomeScreen} />
      <Screen name="My Messages" component={MessagesScreen} />
    </Navigator>
  );
}

export default userBottomNavi;
