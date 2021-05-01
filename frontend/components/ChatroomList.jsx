/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import { getChatrooms } from '../redux/actions';

const styles = StyleSheet.create({
  bottomNavigation: {
    marginVertical: 8,
  },
});

const { authFetch } = require('../server');

const mapDispatchToProps = (dispatch) => ({
  getChatrooms: () => dispatch(getChatrooms()),
});

const mapStateToProps = (state) => ({
  chatRooms: state.messages.chatRooms,
});

function getReformatDate(date) {
  const oldDate = new Date(date);
  const midnight = new Date();
  midnight.setHours(0, 0, 0, 0);

  // during that day - print time
  if (oldDate >= midnight) {
    return oldDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  }
  return oldDate.toLocaleDateString('en-US');
}

class ChatroomList extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     loaded: false,
  //     chatRooms: [],
  //   };
  // }

  componentDidMount() {
    console.log('message screen - fetching /chat/getUserRooms');

    this.props.getChatrooms();
  }

  render() {
    const { chatRooms } = this.props;
    console.log('Chatroom List chatRooms: ', chatRooms);
    const chatRoomsList = chatRooms.sort((a, b) => new Date(a.updated_at) < new Date(b.updated_at))
      .map((chatroom) => (
        <ListItem key={chatroom.roomID} roomsID={chatroom.roomID}>
          <Left>
            <Text> {chatroom.roomName} </Text>
          </Left>
          <Right>
            <Text> {getReformatDate(chatroom.updated_at)} </Text>
          </Right>

        </ListItem>
      ));

    return (
      <Container style={{ padding: '1%' }}>
        <Content>
          <List>
            {chatRoomsList}
          </List>
        </Content>
      </Container>
    );
  }
}

ChatroomList.propTypes = {
  chatRooms: PropTypes.arrayOf(PropTypes.object).isRequired,
  getChatrooms: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatroomList);
