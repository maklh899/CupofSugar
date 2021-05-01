/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomNavi from './UserBottomNavi';
import HomeScreen from './HomeScreen';
import ChatroomsScreen from './ChatroomsScreen';


// const Stack = createStackNavigator();

//const { Navigator, Screen } = createBottomTabNavigator();
const Tab = createBottomTabNavigator();

function BottomNaviRoutes(props) {
  const screens = [
    {
      name: 'Home',
      isIntialRoute: true,
      component: HomeScreen,
    },
    {
      name: 'Messages',
      component: ChatroomsScreen,
    },
  ];

  return (
    <Tab.Navigator
      initialRouteName={screens.find((screen) => screen.isIntialRoute).name}
      screenOptions={{ headerShown: true }}
    >
      {
        screens.map((screen) => (<Tab.Screen {...screen} key={screen.name} />))
      }
    </Tab.Navigator>
  );
}

BottomNaviRoutes.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default (BottomNaviRoutes);
