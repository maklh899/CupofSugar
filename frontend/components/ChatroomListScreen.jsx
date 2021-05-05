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
  Card,
  CardItem,
  Text,
} from 'native-base';

import ChartroomsList from './ChatroomList';

function ChatroomsScreen(obj) {
  const { navigation } = obj;
  return (
    <Container style={{ flex: 1 }}>
      <Content>
        <ChartroomsList onPressItem={(chatroom) => {
          navigation.navigate('Chatroom', { chatroomID: chatroom.roomID, chatroomName: chatroom.roomName });
        }}
        />
      </Content>
    </Container>
  );
}
export default ChatroomsScreen;
