import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  StyleSheet, View, KeyboardAvoidingView, Platform,
} from 'react-native';

import {
  Container,
  Button,
  CardItem,
  Item,
  Input,
  Text,
} from 'native-base';
import MessagesList from './MessagesList';
import { sendMessage } from '../redux/actions/messActions';

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  card: {
    marginTop: 30,
    width: '100%',
  },
});

const mapDispatchToProps = (dispatch) => ({
  sendmessage: (newMess, roomId) => dispatch(sendMessage({ message: newMess, roomId })),
});

const ChatrooomScreen = (props) => {
  const { route, sendmessage } = props;
  //console.log('ChatroomScreen route: ', route);
  const { params } = route;

  const [newMessage, setNewMessage] = useState('');

  const handleMessageChange = (event) => {
    setNewMessage(event);
    console.log('inputted message:', event);
  };

  return (

    <Container style={styles.screenContainer}>
      <MessagesList roomId={params.chatroomID} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View>
          <CardItem style={{ justifyContent: 'space-between' }}>
            <Item regular style={{ width: '80%' }}>
              <Input
                placeholder="Message"
                onChangeText={(text) => { handleMessageChange(text); }}
              />
            </Item>
            <Button info onPress={() => sendmessage(newMessage, params.chatroomID)}>
              <Text>Send</Text>
            </Button>
          </CardItem>

        </View>
      </KeyboardAvoidingView>
    </Container>

  );
}

ChatrooomScreen.propTypes = {
  sendmessage: PropTypes.func.isRequired,

  route: PropTypes.shape({
    params: PropTypes.shape({ chatroomID: PropTypes.string.isRequired }),
  }).isRequired,
};
export default connect(null, mapDispatchToProps)(ChatrooomScreen);
