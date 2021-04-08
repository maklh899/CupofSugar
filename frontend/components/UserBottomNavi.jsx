import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Home';
import MessagesScreen from './MessagesScreen';
import styles from './styles';

const { Navigator, Screen } = createBottomTabNavigator();

function UserBottomNavi() {
  return (
    <Navigator initialRouteName="Home">
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Messages" component={MessagesScreen} />
    </Navigator>
  );
}

export default UserBottomNavi;
