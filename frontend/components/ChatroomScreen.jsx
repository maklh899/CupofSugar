import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';

import MessagesList from './MessagesList';
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

function ChatrooomScreen(navContext) {
  const { route } = navContext;
  const { params } = route;
  return (
    <Container style={{ flex: 1 }}>
      <Content>
        <MessagesList roomId={params.chatroomID} />
      </Content>
    </Container>
  );
}
export default ChatrooomScreen;
