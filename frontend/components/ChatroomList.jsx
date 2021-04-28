import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getChatrooms } from '../redux/actions';

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

// const mapStateToProps = (state) => ({
//   userToken: state.authentication.token,
//   isUserLoggedIn: state.authentication.isAuthenticated,
// });

const { authFetch } = require('../server');

const mapDispatchToProps = (dispatch) => ({
  getChatrooms: () => dispatch(getChatrooms()),
});

const mapStateToProps = (state) => ({
  chatRooms: state.messages.chatRooms,
});

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
    const chatRoomsList = chatRooms.map((chatroom) => (<Card key={chatroom['_id']} roomsID={chatroom['_id']} />));
    return (
      <Container style={styles.container}>
        <Text>You made it🥳</Text>
        <List style={{ flex: 1 }}>
          {chatRoomsList}
        </List>
      </Container>
    );
  }
}

ChatroomList.propTypes = {
  chatRooms: PropTypes.arrayOf(PropTypes.object).isRequired,
  getChatrooms: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatroomList);
