import { combineReducers } from 'redux';

import authentication from './authenticationReducer';
import messages from './messagesReducer';
import apt from './aptReducer';

const rootReducer = combineReducers({
  authentication,
  messages,
  apt,
});

export default rootReducer;
