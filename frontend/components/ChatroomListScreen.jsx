import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Body,
  Right,
  Card,
  CardItem,
  Text,
} from 'native-base';

import ChartroomsList from './ChatroomList';

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    position: 'relative',
  },
  card: {
    marginTop: 30,
    width: '90%',
  },
  topView: {
    margin: 20,
    display: 'flex',
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 5,
    width: '100%',
    justifyContent: 'center',
    // alignItems: 'center',
  },
});

const mapStateToProps = (state) => ({
  error: state.messages.createdRoomErr,
});

const ChatroomsScreen = ({
  navigation, error,
}) => {
  ChatroomsScreen.propTypes = {
    error: PropTypes.string.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  return (
    <Container style={{ flex: 1 }}>
      <View style={styles.topView}>
        { error !== ''
          && (
            <Text>
              Could not make chatroom:
              {' '}
              {error}
            </Text>
          )}
        <Button style={styles.button} onPress={() => navigation.navigate('Create Chatroom')}>
          <Text>Create New Chat</Text>
        </Button>
      </View>
      <Content>
        <ChartroomsList onPressItem={(chatroom) => {
          navigation.navigate('Chatroom', { chatroomID: chatroom.roomID, chatroomName: chatroom.roomName });
        }}
        />
      </Content>
    </Container>
  );
};
export default connect(mapStateToProps, null)(ChatroomsScreen);
