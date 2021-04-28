// import jwt from 'jsonwebtoken';
import { userConstants } from '../constants';

// export const isValidToken = (token) => {
//     const decoded = jwt.decode(token);
//     return new Date(decoded.exp * 1000) > new Date() ? decoded : null;
// };
const initState = {
  // currentUser: localStorage.getItem('USER-TOKEN')
  //     ? isValidToken(localStorage.getItem('USER-TOKEN'))
  //     : null,
  // token: localStorage.getItem('USER-TOKEN')
  //     ? localStorage.getItem('USER-TOKEN')
  //     : null,
  currentUser: null,
  token: null,
  error: '',
  loading: false,
  isAuthenticated: false,
};

const authenticationReducer = function authRed(state = initState, action) {
  switch (action.type) {
  case userConstants.SIGN_IN_REQUEST:
    return {
      ...state,
      error: '',
    };
  case userConstants.SIGN_UP_REQUEST:
  case userConstants.SIGN_OUT_REQUEST:
    return {
      ...state,
      loading: true,
      isAuthenticated: false,
    };
  case userConstants.SIGN_IN_FAILURE:
    return {
      ...state,
      error: action.payload,
    };
  case userConstants.SIGN_UP_FAILURE:
  case userConstants.SIGN_OUT_FAILURE:
    return {
      ...state,
      loading: false,
      error: action.payload,
      currentUser: null,
      isAuthenticated: false,
    };
  case userConstants.SIGN_UP_SUCCESS:
  case userConstants.SIGN_IN_SUCCESS: {
    // const { username = 'anon' } = action.payload;
    return {
      ...state,
      loading: false,
      token: action.payload.token,
      currentUser: action.payload.user,
      isAuthenticated: true,
      error: '',
      // username,
    };
  }
  case userConstants.SIGN_OUT_SUCCESS:
    //localStorage.removeItem('USER-TOKEN');
    return {
      ...state,
      isAuthenticated: false,
      loading: false,
      currentUser: null,
      error: '',
      token: '',
    };
  default:
    return { ...state };
  }
};

export default authenticationReducer;
