/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import {
  Container,
  List,
  Left,
  Right,
  Content,
  ListItem,
  Body,
  Text,
  Card,
  CardItem,
} from 'native-base';
import { getMessages } from '../redux/actions';

const { authFetch } = require('../server');

const mapStateToProps = (state) => ({
  currUsername: state.authentication.currentUser.userName,

});

function getReformatDate(date) {
  const oldDate = new Date(date);
  const midnight = new Date();
  midnight.setHours(0, 0, 0, 0);

  // during that day - print time
  // if its older than that day print date mm/dd/yy
  if (oldDate >= midnight) {
    return oldDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  }
  return oldDate.toLocaleDateString('en-US');
}

class MessagesList extends Component {
  constructor() {
    super();
    this.updateMessages = this.updateMessages.bind(this);
    this.state = {
      loaded: false,
      error: null,
      messagesList: [],
    };
  }

  componentDidMount() {
    console.log('message screen - fetching /chat/getMessages');

    setInterval(this.updateMessages, 1000);
    // this.updateMessages();
  }

  updateMessages() {
    const listThis = this;
    const { roomId } = this.props;
    // console.log('updateMessages() roomId:', roomId);
    authFetch(`/chat/${roomId}/getAllRoomMess`)
      .then((data) => {
        // console.log('fetching /chat/getMessages data: ', data);
        listThis.setState({
          loaded: true,
          messagesList: data.messages,
          error: null,
        });
      }).catch((error) => {
        console.log(`Failed to load room messages. Reason: ${error}`);
        listThis.setState({ error });
      });
  }

  render() {
    const { currUsername } = this.props;
    const { messagesList } = this.state;
    // console.log('Chatroom List chatRooms: ', chatRooms);
    const messageList = messagesList.map((messages) => (
      <Card key={messages._id}>
        <CardItem header bordered>
          <Text>{messages.sender}</Text>
          <Right>
            <Text>{getReformatDate(messages.created_at)}</Text>
          </Right>
        </CardItem>
        <CardItem>
          <Text> {messages.message_body}</Text>
        </CardItem>
      </Card>

    ));

    return (
      <Container style={{ padding: '1%' }}>
        <Content>
          {messageList}

        </Content>
      </Container>
    );
  }
}

MessagesList.propTypes = {
  roomId: PropTypes.string.isRequired,
  currUsername: PropTypes.string.isRequired,
  // updateMessages: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(MessagesList);
