import { messConstants } from '../constants';

const initState = {
  chatRooms: [],
  loading: false,
  createdRoom: false,
  createdRoomErr: '',
};

const messagesReducer = function messRed(state = initState, action) {
  switch (action.type) {
  case messConstants.ALL_CHATROOMS_REQUEST:
    return {
      ...state,
      loading: true,
      error: '',
    };
  case messConstants.NEW_CHATROOM_REQUEST:
    return {
      ...state,
      createdRoom: false,
      loading: true,
      createdRoomErr: '',
    };
  case messConstants.DEL_CHATROOM_REQUEST:
    return {
      ...state,
      loading: true,
      error: '',
    };
  case messConstants.NEW_MESSAGE_REQUEST:
    return {
      ...state,
      loading: true,
      error: '',
    };
  case messConstants.ALL_MESSAGES_REQUEST:
    return {
      ...state,
      loading: true,
      error: '',
    };

  case messConstants.ALL_CHATROOMS_FAILURE:
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  case messConstants.NEW_CHATROOM_FAILURE:
    return {
      ...state,
      loading: false,
      createdRoomErr: action.payload,
    };
  case messConstants.DEL_CHATROOM_FAILURE:
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  case messConstants.NEW_MESSAGE_FAILURE:
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  case messConstants.ALL_MESSAGES_FAILURE:
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  case messConstants.ALL_CHATROOMS_SUCCESS:
    return {
      ...state,
      loading: false,
      chatRooms: action.payload.chatRooms,
    };

  case messConstants.NEW_CHATROOM_SUCCESS:
    return {
      ...state,
      createdRoom: true,
      loading: false,
      createdRoomErr: '',
    };
  case messConstants.DEL_CHATROOM_SUCCESS:
    return {
      ...state,
      loading: false,
      error: '',
    };
  case messConstants.NEW_MESSAGE_SUCCESS:
    return {
      ...state,
      loading: false,
      error: '',
    };
  case messConstants.ALL_MESSAGES_SUCCESS:
  {
    return {
      ...state,
      loading: false,
      error: '',
    };
  }
  default:
    return { ...state };
  }
};

export default messagesReducer;
