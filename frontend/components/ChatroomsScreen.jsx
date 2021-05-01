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

function ChatroomsScreen(obj) {
  const { navigation } = obj;
  return (
    <Container style={{ flex: 1 }}>
      <Content>
        <ChartroomsList onPressItem={(chatroom) => {
          navigation.navigate('Chatroom', { chatroomID: chatroom._id, chatroomName: chatroom.chatroomName });
        }}
        />
      </Content>
    </Container>
  );
}
export default ChatroomsScreen;
