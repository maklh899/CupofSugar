import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { messConstants } from '../constants';

const { SERVER_ADDR, authFetch } = require('../../server');

const getChatroomsRequest = () => ({
  type: messConstants.ALL_CHATROOMS_REQUEST,
});
const getChatroomsSuccess = (chatRoomswTime) => ({
  type: messConstants.ALL_CHATROOMS_SUCCESS,
  payload: {
    chatRooms: chatRoomswTime,
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
        console.log('getChatrooms action success: ', response.chatRoomswTime);
        dispatch(getChatroomsSuccess(response.chatRoomswTime));
      } else {
        console.log('getChatrooms action failure: ', response);
        dispatch(getChatroomsFailure(response));
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
  const body = JSON.stringify({ aptIds: payload.aptIds, usernames: payload.usernames });
  authFetch('/chat/createChatRoom', 'POST', body)
    .then((response) => {
      console.log('newchatroom response: ', response);
      if (response.success) {
        console.log('newchatroom action success');
        dispatch(newChatroomSuccess());
      } else {
        console.log('newchatroom action failure: ', response.mess);
        dispatch(newChatroomFailure(response.mess));
      }
    });
};

const sendMessageRequest = () => ({
  type: messConstants.NEW_MESSAGE_REQUEST,
});
const sendMessageSuccess = () => ({
  type: messConstants.NEW_MESSAGE_SUCCESS,
});
const sendMessageFailure = (error) => ({
  type: messConstants.NEW_MESSAGE_FAILURE,
  payload: error,
});


//params: roomId, message
export const sendMessage = (payload) => function sendmessage(dispatch) {
  console.log(`URL: ${SERVER_ADDR}/chat/${payload.roomId}/postMessage`);
  dispatch(sendMessageRequest);
  // getChatRooms(userToken)
  const body = JSON.stringify({ message: payload.message });
  authFetch(`/chat/${payload.roomId}/postMessage`, 'POST', body)
    .then((response) => {
      console.log('sendMessage response: ', response);
      if (response.success) {
        console.log('sendMessage action success');
        dispatch(sendMessageSuccess());
      } else {
        console.log('sendMessage action failure: ', response.mess);
        dispatch(sendMessageFailure(response.mess));
      }
    });
};

const getMessagesRequest = () => ({
  type: messConstants.ALL_MESSAGES_REQUEST,
});
const getMessagesSuccess = (roomID, messages) => ({
  type: messConstants.ALL_MESSAGES_SUCCESS,
  payload: { roomID, messages },
});
const getMessagesFailure = (error) => ({
  type: messConstants.ALL_MESSAGES_FAILURE,
  payload: error,
});

export const getMessages = (payload) => function sendmessage(dispatch) {
  console.log(`URL: ${SERVER_ADDR}/chat/${payload.roomId}/getAllRoomMess`);
  dispatch(getMessagesRequest);
 
  const body = JSON.stringify({ message: payload.message });
  authFetch(`/chat/${payload.roomId}/getAllRoomMess`, body)
    .then((response) => {
      console.log('getMessages response: ', response);
      if (response.success) {
        console.log('getMessages action success');
        dispatch(getMessagesSuccess(response.roomID, response.messages));
      } else {
        console.log('getMessages action failure: ', response.mess);
        dispatch(getMessagesFailure(response.mess));
      }
    });
};

