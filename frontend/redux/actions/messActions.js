import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { messConstants } from '../constants';

const { SERVER_ADDR, authFetch } = require('../../server');

const getChatroomsRequest = () => ({
  type: messConstants.ALL_CHATROOMS_REQUEST,
});
const getChatroomsSuccess = (chatRooms) => ({
  type: messConstants.ALL_CHATROOMS_SUCCESS,
  payload: {
    chatRooms,
  },
});
const getChatroomsFailure = (error) => ({
  type: messConstants.ALL_CHATROOMS_FAILURE,
  payload: error,
});

export const getChatrooms = () => function getchatrooms(dispatch) {
  //console.log('getChatrooms authFetch: ', authFetch('/chat/getUserRooms'));
  console.log(`URL: ${SERVER_ADDR}/chat/getUserRooms`);
  dispatch(getChatroomsRequest);
  // getChatRooms(userToken)
  authFetch('/chat/getUserRooms')
    .then((response) => {
      console.log('getUserRooms response: ', response);
      if (response.success) {
        console.log('getChatrooms action success: ', response.chatRooms);
        dispatch(getChatroomsSuccess(response.chatRooms));
        // response.json().then((responseJSON) => {
        //   console.log('getChatrooms action success: ', responseJSON.chatRooms);
        //   dispatch(getChatroomsSuccess(responseJSON.chatRooms));
        // });
      } else {
        console.log('getChatrooms action failure: ', response);
        dispatch(getChatroomsFailure(response));
        // response.json().then((responseJSON) => {
        //   console.log('getChatrooms action failure: ', responseJSON);
        //   dispatch(getChatroomsFailure(responseJSON));
        // });
      }
    });
};

const newChatroomRequest = () => ({
  type: messConstants.NEW_CHATROOM_REQUEST,
});
const newChatroomSuccess = (chatRooms) => ({
  type: messConstants.NEW_CHATROOM_SUCCESS,
  payload: {
    chatRooms,
  },
});
const newChatroomFailure = (error) => ({
  type: messConstants.NEW_CHATROOM_FAILURE,
  payload: error,
});

export const newChatroom = (payload) => function newchatroom(dispatch) {
  console.log(`URL: ${SERVER_ADDR}/chat/createChatRoom`);
  dispatch(newChatroomRequest);
  // getChatRooms(userToken)
  const body = JSON.stringify({ aptIds: payload.aptIds, usernames: payload.usernames});
  authFetch('/chat/createChatRoom', 'POST', body)
    .then((response) => {
      console.log('newchatroom response: ', response);
    });
};
