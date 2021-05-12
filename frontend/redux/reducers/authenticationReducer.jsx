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
  signInErr: '',
  signUpErr: '',
  error: '',
  loading: false,
  isAuthenticated: false,
  createdAccount: false,
  username: '',
};

const authenticationReducer = function authRed(state = initState, action) {
  switch (action.type) {
  case userConstants.SIGN_IN_REQUEST:
    return {
      ...state,
      signInErr: '',
    };
  case userConstants.SIGN_UP_REQUEST:
    return {
      ...state,
      loading: true,
      isAuthenticated: false,
      signUpErr: '',
    };
  case userConstants.SIGN_OUT_REQUEST:
    return {
      ...state,
      loading: true,
      isAuthenticated: false,
    };
  case userConstants.SIGN_IN_FAILURE:
    return {
      ...state,
      signInErr: action.payload,
    };
  case userConstants.SIGN_UP_FAILURE:
    return {
      ...state,
      signUpErr: action.payload,
    };
  case userConstants.SIGN_OUT_FAILURE:
    return {
      ...state,
      loading: false,
      error: action.payload,
      currentUser: null,
      isAuthenticated: false,
    };
  case userConstants.SIGN_UP_SUCCESS:
    return {
      ...state,
      loading: false,
      signUpErr: '',
      createdAccount: true,
    };
  case userConstants.SIGN_IN_SUCCESS: {
    // const { username = 'anon' } = action.payload;
    return {
      ...state,
      loading: false,
      token: action.payload.token,
      currentUser: action.payload.user,
      isAuthenticated: true,
      signInErr: '',
      username: action.payload.user.userName,
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
