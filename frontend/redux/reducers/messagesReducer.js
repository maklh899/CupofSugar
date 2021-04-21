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
    };
  case messConstants.NEW_CHATROOM_REQUEST:
  case messConstants.DEL_CHATROOM_REQUEST:
  case messConstants.NEW_MESSAGE_REQUEST:
  case messConstants.ALL_CHATROOMS_FAILURE:
  case messConstants.NEW_CHATROOM_FAILURE:
  case messConstants.DEL_CHATROOM_FAILURE:
  case messConstants.NEW_MESSAGE_FAILURE:
  case messConstants.ALL_CHATROOMS_SUCCESS:
    return {
      loading: false,
      chatRooms: action.payload.chatRooms,
    };
  case messConstants.NEW_CHATROOM_SUCCESS:
  case messConstants.DEL_CHATROOM_SUCCESS:
  case messConstants.NEW_MESSAGE_SUCCESS:
  default:
    return { ...state };
  }
};

export default messagesReducer;
