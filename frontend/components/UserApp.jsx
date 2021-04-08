import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Button, View } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Body,
  Right,
  Footer,
  FooterTab,
  Card,
  CardItem,
  Text,
} from 'native-base';
import styles from './styles';
import UserBottomNavi from './UserBottomNavi';

function UserApp(obj) {
  const { navigation } = obj;
  return (
    <NavigationContainer>
      <UserBottomNavi />
    </NavigationContainer>

  );
}
export default UserApp;
