import { messConstants } from '../constants';

const initState = {
  // currentUser: localStorage.getItem('USER-TOKEN')
  //     ? isValidToken(localStorage.getItem('USER-TOKEN'))
  //     : null,
  // token: localStorage.getItem('USER-TOKEN')
  //     ? localStorage.getItem('USER-TOKEN')
  //     : null,
  chatRooms: [],
  loading: false,
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
      loading: true,
      error: '',
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
      error: action.payload,
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
      loading: false,
      error: '',
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
