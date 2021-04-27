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
    //const RoomThis = this; // pointer to the component
    console.log('message screen - fetching /chat/getUserRooms');
    //const {chatRooms } = this.props;
    // authFetch('/chat/getUserRooms')
    //   .then((data) => {
    //     listThis.setState({
    //       loaded: true,
    //       chatroomsList: data,
    //       error: null,
    //   });

    this.props.getChatrooms();
    //this.props.chatRooms = chatRoomsList;
    //getChatrooms();
  }

  render() {
    const { chatRooms } = this.state;
    const chatRoomsList = chatRooms.map((roomsID) => (<FloatingTip key={roomsID} roomsID={roomsID} />));
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
  getChatrooms: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatroomList);
// chatRooms: PropTypes.arr.isRequired,
//   isLoading: PropTypes.bool.isRequired,