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

export const getChatrooms = (payload) => function getchatrooms(dispatch) {
  console.log(`URL: ${SERVER_ADDR}/chat/getUserRooms`);
  dispatch(getChatroomsRequest);
  const { token } = AsyncStorage;
  // getChatRooms(userToken)
  authFetch(`/chat/getUserRooms`)
    .then((response) => {
      console.log('getUserRooms response: ', response);
      if (response.status < 300) {
        response.json().then((responseJSON) => {
          console.log('getChatrooms action success: ', responseJSON);
          dispatch(getChatroomsSuccess(responseJSON.chatRooms));
        });
      }
      else {
        response.json().then((responseJSON) => {
          console.log('getChatrooms action failure: ', responseJSON);
          dispatch(getChatroomsFailure(responseJSON));
        });
      }
    });
};
