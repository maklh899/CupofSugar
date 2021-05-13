import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import {
  Container,
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
  Center,
  Content,
} from 'native-base';
import { newChatroom } from '../redux/actions/messActions';

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    position: 'relative',
  },
  card: {
    marginTop: 30,
  },
  bottomView: {
    margin: 40,
    display: 'flex',
    height: '30%',
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  cardBody: {
    height: '10%',
  },
  cardFooter: {
    display: 'flex',
    marginTop: 60,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => ({
  createdRoom: state.messages.createdRoom,
  error: state.messages.createdRoomErr,
});

const mapDispatchToProps = (dispatch) => ({
  createRoom: (chatApt, chatUsers) => {
    const aptArr = chatApt.split(new RegExp(' |,')).map((x) => x.trim()).filter((x) => x.length > 0);
    const usersArr = chatUsers.split(new RegExp(' |,')).map((x) => x.trim()).filter((x) => x.length > 0);
    console.log('CreateChatScreen aptArr: ', aptArr);
    console.log('CreateChatScreen usersArr: ', usersArr);
    dispatch(newChatroom({
      aptIds: aptArr, usernames: usersArr,
    }));
  },
});

const CreateChatScreen = ({
  createRoom, navigation, createdRoom, error,
}) => {
  const [chatApt, setChatApt] = useState('');
  const [chatUsers, setChatUsers] = useState('');

  console.log('error', error);

  // useEffect(() => {
  //   if (createdRoom) {
  //     setTimeout(() => {
  //       navigation.goBack();
  //     }, 3000);
  //   }
  // }, [createdRoom]);

  const handleChatAptChange = (event) => {
    setChatApt(event);
    // console.log('apt input:', event);
  };
  const handleChatUsersChange = (event) => {
    setChatUsers(event);
  };

  CreateChatScreen.propTypes = {
    createRoom: PropTypes.func.isRequired,
    createdRoom: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      goBack: PropTypes.func.isRequired,
    }).isRequired,
  };

  return (
    <Container style={{ flex: 1 }}>
      <Content>
        <Card>
          <CardItem header bordered>
            <Text>Create a Chatroom by Apartments</Text>
          </CardItem>
          <CardItem style={styles.cardBody}>
            <Body>
              <Form>
                <Item stackedLabel>
                  <Label>ex. 1, 2, 3</Label>
                  <Input
                    value={chatApt}
                    onChangeText={(text) => { handleChatAptChange(text); }}
                  />
                </Item>
              </Form>
            </Body>
          </CardItem>
          <CardItem style={styles.cardFooter}>
            { error !== ''
          && (
            <Text>
              {error}
            </Text>
          )}
            <Button
              style={styles.button}
              onPress={() => {
                createRoom(chatApt, chatUsers);
                navigation.goBack();
              }}
            >
              <Text> Create Apt Chatroom </Text>
            </Button>
          </CardItem>
        </Card>
        <CardItem>

          <Text> OR </Text>

        </CardItem>
        <Card>
          <CardItem header bordered>
            <Text>Create a Chatroom by Individual Users</Text>
          </CardItem>
          <CardItem style={styles.cardBody}>
            <Body>
              <Form>
                <Item stackedLabel>
                  <Label>ex. username1, username2</Label>
                  <Input
                    value={chatUsers}
                    onChangeText={(text) => { handleChatUsersChange(text); }}
                  />
                </Item>
              </Form>
            </Body>
          </CardItem>
          <CardItem style={styles.cardFooter}>
            { error !== ''
          && (
            <Text>
              {error}
            </Text>
          )}
            <Button
              style={styles.button}
              onPress={() => {
                createRoom(chatApt, chatUsers);
                navigation.goBack();
              }}
            >
              <Text> Create User Chatroom </Text>
            </Button>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateChatScreen);
