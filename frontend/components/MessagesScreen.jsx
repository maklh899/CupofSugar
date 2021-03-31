import React from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Body,
  Right,
  Footer,
  FooterTab,
  Card,
  CardItem,
  Text,
} from 'native-base';
import styles from './styles';

function MessagesScreen(obj) {
  const { navigation, route, isUserLoggedIn } = obj;
  return (
    <Container style={styles.container}>
      <Text>You made it🥳</Text>
    </Container>
  );
}
export default MessagesScreen;