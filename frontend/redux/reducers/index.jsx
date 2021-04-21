import { combineReducers } from 'redux';

import authentication from './authenticationReducer';
import messages from './messagesReducer';
import users from './users_reducer';
import alert from './alert_reducer';

const rootReducer = combineReducers({
  authentication,
  messages,
  // users,
  // alert,
});

export default rootReducer;
