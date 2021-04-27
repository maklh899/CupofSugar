import React from 'react';

import {
  Container,
  List,
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
import ChartroomsList from './ChatroomList';

function RecommendScreen(obj) {
  const { navigation } = obj;
  return (
    <Container style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Header />
      <Content>
        <ChartroomsList onPressItem={(chatroom) => {
          navigation.navigate('Chatroom', { chatroomID: chatroom._id, chatroomName: chatroom.chatroomName });
        }}
        />
      </Content>
    </Container>
  );
}
export default RecommendScreen;
