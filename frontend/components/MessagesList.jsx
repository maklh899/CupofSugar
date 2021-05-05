/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import {
  Container,
  List,
  Left,
  Right,
  Content,
  ListItem,
  Text,
} from 'native-base';
import { getMessages } from '../redux/actions';
const { authFetch } = require('../server');

// const mapDispatchToProps = (dispatch) => ({
//   getMessages: () => dispatch(getMessages()),
// });

const mapStateToProps = (state) => ({
  currUsername: state.authentication.currentUser.userName,

});


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

    this.updateMessages();
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
      <ListItem key={messages['_id']}>
        <Text> {messages.message_body}</Text>
      </ListItem>

    ));

    return (
      <Container style={{ padding: '1%' }}>
        <Content>
          <List>
            {messageList}
          </List>
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
