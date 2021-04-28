import React from 'react';
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
import userBottomNavi from './UserBottomNavi';
import styles from './styles';

function Home(obj) {
  const { navigation } = obj;
  return (
    <View style={styles.container}>
      <Text>You made it🥳</Text>
      <Button title="Go to messages" onPress={() => { navigation.navigate('Messages'); }} />
    </View>
  );
}
export default Home;
