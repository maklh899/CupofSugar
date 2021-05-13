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
import { getChatrooms } from '../redux/actions';

const styles = StyleSheet.create({
  bottomNavigation: {
    marginVertical: 8,
  },
});

const mapDispatchToProps = (dispatch) => ({
  getchatrooms: () => dispatch(getChatrooms()),
});

const mapStateToProps = (state) => ({
  chatRooms: state.messages.chatRooms,
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

class ChatroomList extends Component {
  componentDidMount() {
    console.log('message screen - fetching /chat/getUserRooms');

    // 1000ms = 1sec refresh
    const { getchatrooms } = this.props;
    setInterval(getchatrooms, 1000);
    // this.props.getchatrooms();
  }

  render() {
    const { chatRooms, onPressItem } = this.props;
    // console.log('Chatroom List chatRooms: ', chatRooms);
    const chatRoomsList = chatRooms.sort((a, b) => new Date(a.updated_at) < new Date(b.updated_at))
      .map((chatroom) => (
        <ListItem
          key={chatroom.roomID}
          roomsID={chatroom.roomID}
          onPress={() => { onPressItem(chatroom); console.log('pressed chatroom: ', chatroom.roomID); }}
        >
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
  onPressItem: PropTypes.func.isRequired,
  chatRooms: PropTypes.arrayOf(PropTypes.object).isRequired,
  getchatrooms: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatroomList);
